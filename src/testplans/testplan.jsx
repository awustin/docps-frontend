import React from 'react';
import { getTestplanById, updateTestplan, getTagsForTestplan } from '../services/testplansService';
import {
    Typography,
    Divider,
    Button,
    Row,
    Col,
    Descriptions,
    Tag,
    Breadcrumb,
    List,
    Avatar,
    Tooltip,
		Space,
		Select,
		Input
} from 'antd';
import { withRouter } from "react-router";
import { 
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
		LeftCircleOutlined,
		PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ViewExecutions from '../executions/viewExecutions';
import MessageModal from '../common/messageModal';
import TestcaseDelete from './modals/testcaseDelete';

const { Title,Text } = Typography;
const { Option } = Select;

class Testplan extends React.Component {
    constructor(props){
			super(props)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.statusTag = this.statusTag.bind(this)
			this.showTestCases = this.showTestCases.bind(this)
			this.reloadSearch = this.reloadSearch.bind(this)
    }
    state = {
			testplan: {
				id: undefined,
				key: undefined,
				testplanId: undefined,
				testplanName: undefined,
				description: undefined,
				tags: [],
				createdOn: undefined,
				status: undefined,
				projectId: undefined,
				projectName: undefined,
				groupId: undefined,
				groupName: undefined,
				cases: []					
			},
			field: {
				name: undefined,
				description: undefined,
				status: undefined,
				tags: []
			},
			dirty: false,			
			showMessageModal: false,
			message: {
				title:undefined,
				description:undefined,
				type: undefined
			},
			visibleDelete: false,
			deleteTestcaseId: undefined,
			loading: true
    }

    componentWillMount() {
        if(Object.keys(this.props).includes("match"))
        {
						let testplanId = this.props.match.params.testplanId
						getTestplanById(testplanId).then((result)=>{
							if(result.success) {
								const { testplan } = result
								let editables = {
									name: testplan.testplanName,	
									description: testplan.description,
									status: testplan.status,
									tags: testplan.tags
								}
								this.setState({ testplan: testplan, field: editables, loading: false })								
							}
						})
        }
    }

    handleSubmit() {
			const { testplan, field } = this.state
			if(!field.name)
			{
				this.setState({ 
					showMessageModal: true, 
					message: {
						title:'Nombre vacío',
						description:'Debe ingresar un nombre para el plan de pruebas.',
						type:'validate'
					},
					field: {...this.state.field, name: testplan.testplanName}
				})
			}
			else
			{
			let values = {
				id: testplan.testplanId,
				name: field.name,
				description: field.description,
				tags: field.tags
			}
			updateTestplan(values).then((result)=>{
				if(result.success) {
					this.setState({ 
						success: true,
						showMessageModal: true, 
						message: {
							title:'Plan de pruebas modificado',
							description:'Se modificó el plan de pruebas con éxito.',
							type:'success'
							}
					})					
				}
				else {
					if(result.hasOwnProperty('validate')) {
						this.setState({ 
							success: true,
							showMessageModal: true, 
							message: {
								title:'El nombre ya existe',
								description:'Debe ingresar otro nombre para el plan de pruebas.',
								type:'validate'
								}
						})						
					}
					else {
						this.setState({ 
							success: true,
							showMessageModal: true, 
							message: {
								title:'Hubo un error',
								description:'No se pudo modificar el plan de pruebas',
								type:'validate'
								}
						})						
					}
				}
			})
				this.setState({ 
					success: true,
					showMessageModal: true, 
					message: {
						title:'Plan de pruebas modificado',
						description:'El plan de pruebas fue modificado con éxito',
						type:'success'
					}
				})			
			}
    }

    statusTag(status) {
        switch(status)
        {
            case 'Not executed':
                return (
                    <Tooltip title="No tiene ejecuciones" color="#108ee9">
                        <Tag color="#999997">No ejecutado</Tag>
                    </Tooltip>
                )
            case 'In progress':
                return (
                    <Tooltip title="Tiene ejecuciones en progreso" color="#108ee9">
                        <Tag color="#ebcf52">En progreso</Tag>
                    </Tooltip>
                )
            case 'Passed':
                return (
                    <Tooltip title="La última ejecución pasó" color="#108ee9">
                        <Tag color="#09de8c">Pasó</Tag>
                    </Tooltip>
                )
            case 'Failed':
                return (
                    <Tooltip title="Hay ejecuciones que fallaron" color="#108ee9">
                        <Tag color="#f50">Falló</Tag>
                    </Tooltip>
                )
        }
    }
    		
		showTestCases() {
			const { testplan, loading } = this.state
			const { user } = this.props
			
			const deleteHandle = (function(id) {
				this.setState({ visibleDelete: true, deleteTestcaseId: id })
			}).bind(this)
			
			if(loading) return (<></>)
			return (
					<List
						size="small"
						pagination={{
						pageSize: 5
						}}
						dataSource={testplan.cases}
						bordered={false}
						renderItem={item => (
							<List.Item
								key={item.key}
								span={4}
								actions={[
									this.statusTag(item.status,item.key),
									<Link to={{ pathname: "/workspace/id=" + item.id + "&p=" + testplan.testplanId + "&n=" + testplan.testplanName}} style={{color:"#000"}}>
										<Tooltip title="Modificar caso de prueba" color="#108ee9">
											<EditOutlined style={{ fontSize: '150%', color: "#228cdbff"}} />
										</Tooltip>
									</Link>,
									<ViewExecutions 
										id={item.id}
										user={user}
										reloadTestplan={this.reloadSearch}
									/>,
									<Tooltip title="Eliminar caso de prueba" color="#108ee9">
										<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff"}} onClick={()=>{deleteHandle(item.id)}}/>
									</Tooltip>,
								]}
								className={'list-item testcase'}
								style={{background: "#fff"}}
							>
							<List.Item.Meta
									description=<div className={'list-item description'}>
										{'Últ. modificación: ' + item.modifiedOn}
									</div>
								/>
								{item.caseName}
							</List.Item>
						)}
					/>			
			)
		}
		
		reloadSearch() {
			const { testplan } = this.state
			getTestplanById(testplan.testplanId).then((result)=>{
				if(result.success) {
					const { testplan } = result
					let editables = {
						name: testplan.testplanName,	
						description: testplan.description,
						status: testplan.status,
						tags: testplan.tags
					}
					this.setState({ testplan: testplan, field: editables, loading: false })								
				}
			})			
		}

	render() {
		const { user } = this.props
		const { testplan, field, dirty, message, showMessageModal, visibleDelete, deleteTestcaseId, loading } = this.state
		if(loading) return (<></>)
		return(
			<>
				<Breadcrumb>
					<Breadcrumb.Item>Usuario</Breadcrumb.Item>
					<Breadcrumb.Item>{user.id}</Breadcrumb.Item>
					<Breadcrumb.Item>{testplan.groupName}</Breadcrumb.Item>
					<Breadcrumb.Item>{testplan.projectName}</Breadcrumb.Item>
					<Breadcrumb.Item>{testplan.testplanName}</Breadcrumb.Item>
				</Breadcrumb>					
				<div className="navigation" style={{margin: "50px"}}>
					<Row>
						<Col flex="1 0 25%">
							<Tooltip title="Atrás">
								<LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.push('/testplans/manage')}}/>
							</Tooltip>
						</Col>
					</Row>
				</div>
				<div className="testplan-description-container" style={{margin: "50px"}}>
					<Row>
						<Col flex="1 0 55%">
							<Text className="modal-title-label">Nombre</Text>
							<Title 
								className="modal-editable-title"
								level={3}
								editable={{
									tooltip: <Tooltip>Modificar nombre</Tooltip>,
									autoSize: { minRows: 1, maxRows: 2 },
									onChange: ((e)=>{
										this.setState({ dirty: true, field:{...this.state.field, name: e} })
									})
								}}
							>
								{field.name}													
							</Title>
						</Col>
						<Col flex="1 0 45%">
							<Space direction="vertical">
								<Text className="modal-title-label">Estado</Text>
								{this.statusTag(testplan.status)}
							</Space>
						</Col>
					</Row>
					
					<Row>
						<Col flex="1 0 55%">			
							<Space direction="vertical">	
								<Text className="modal-title-label">Descripción</Text>
								<Text 
									className="modal-editable-text"
									editable={{
										tooltip: <Tooltip>Modificar descripción</Tooltip>,
										autoSize: { minRows: 1, maxRows: 2 },
										onChange: ((e)=>{
											this.setState({ field: {...this.state.field, description: e}, dirty: true })
										})
									}}
								>
									{field.description}													
								</Text>
							</Space>
						</Col>
						<Col flex="1 0 45%">
							<Space direction="vertical">			
								<Text className="modal-title-label">Etiquetas</Text>
								<Select
									mode="tags"
									defaultValue={testplan.tags}
									onChange={(e)=>this.setState({ field: {...this.state.field, tags: e}, dirty: true })}
									dropdownMatchSelectWidth={false}
								/>
							</Space>	
						</Col>						
					</Row>
					<Row style={{ flexDirection: "row-reverse", marginBlock: "3%" }}>
						<Button type="primary" disabled={!dirty} onClick={this.handleSubmit}>Guardar cambios</Button>
					</Row>
					<Divider dashed></Divider>
					<Row style={{display: "flex", alignItems: "center", paddingBottom: "1%"}}>
						<Col flex="1 0 75%">
							<Title level={4}>Casos de prueba</Title>
						</Col>                    
						<Col flex="1 0 25%" style={{textAlign: "end"}}>
							<Link to={{ pathname:"/workspace/create?p=" + testplan.testplanId + "&n=" + testplan.testplanName}}>
								<Button type="primary" style={{display: "inline-flex", alignItems: "center"}}>
									<PlusCircleOutlined/>Crear caso de prueba
								</Button>
							</Link>
						</Col>
					</Row>
					{this.showTestCases()}
				</div>
				{ (visibleDelete) ? (
					<TestcaseDelete
						testcaseId={deleteTestcaseId}
						visibleDelete={visibleDelete}
						closeDelete={(()=>{this.setState({ visibleDelete: false })}).bind(this)}
						reloadSearch={this.reloadSearch}				
					/>
				) : (
				<></>
				)}
				<MessageModal								
					type={message.type}
					title={message.title}
					description={message.description}
					visible={showMessageModal}
					onClose={()=>this.setState({ showMessageModal: false })}
				/>
			</>
		);
	}
	}

export default React.memo(withRouter(Testplan));