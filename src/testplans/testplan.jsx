import React from 'react';
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

const { Title,Text } = Typography;
const { Option } = Select;

class Testplan extends React.Component {
    constructor(props){
			super(props)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.statusTag = this.statusTag.bind(this)
			this.searchTags = this.searchTags.bind(this)
			this.showTestCases = this.showTestCases.bind(this)
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
				tags: [],
				options: [],
			},
			dirty: false,			
			showMessageModal: false,
			message: {
				title:undefined,
				description:undefined,
				type: undefined
			},
    }

    componentWillMount() {
        if(Object.keys(this.props).includes("match"))
        {
						let testplanId = this.props.match.params.testplanId
						//Query para buscar plan de pruebas y sus casos
						let statuses = ['Not executed','In progress','Passed','Failed']
						let testplan = {
								id: testplanId,
								key: 'item'+testplanId,
								testplanId: testplanId,
								testplanName: 'PLAN-888: Pruebas',
								description: 'Plan de pruebas para una funcionalidad',
								tags: ['TEST','INTEGRACION'],
								createdOn: '21/03/2021',
								status: 'Passed',
								projectId: 9874,
								projectName: 'PRO-124',
								groupId: 1,
								groupName: 'Pumas',
								cases: []
						}
						for (let index = 0; index < 5; index++) {
								let item = {
										id: testplanId+'.'+index*2,
										key: 'case'+index*2,
										caseId: index,
										caseName: 'CASO-'+index,
										status: statuses[Math.floor(Math.random() * statuses.length)],
										modifiedOn: '1/02/2021'
								}
								testplan.cases.push(item)            
						}
						//
						let editables = {
							name: testplan.testplanName,	
							description: testplan.description,
							status: testplan.status,
							tags: testplan.tags,
							options: testplan.tags
						}
						this.setState({ testplan: testplan, field: editables })
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
				//Query para guardar los cambios
				this.setState({ 
					success: true,
					showMessageModal: true, 
					message: {
						title:'Plan de pruebas modificado',
						description:'El plan de pruebas fue modificado con éxito',
						type:'success'
					}
				})
				//Query para buscar plan de pruebas y sus casos				
			}
    }

    statusTag(status) {
        switch(status)
        {
            case 'Not executed':
                return (
                    <Tooltip title="No tiene ejecuciones en progreso" color="#108ee9">
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
                    <Tooltip title="Todas las ejecuciones pasaron" color="#108ee9">
                        <Tag color="#09de8c">Pasó</Tag>
                    </Tooltip>
                )
            case 'Failed':
                return (
                    <Tooltip title="Todas las ejecuciones fallaron" color="#108ee9">
                        <Tag color="#f50">Falló</Tag>
                    </Tooltip>
                )
        }
    }
    		
		searchTags(value) {
			const { field } = this.state 
			//Query para disparar la búsqueda de etiquetas
			let results = ['un','deux','troi','quatre','cinq']			
			this.setState({ field: {...this.state.field, options: results } })
		}
		
		showTestCases() {
			const { testplan } = this.state
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
									<ViewExecutions id={item.id}/>,
									<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff"}} />
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

	render() {
		const { user } = this.props
		const { testplan, field, dirty, message, showMessageModal } = this.state
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
									defaultValue={field.tags}
									onSearch={this.searchTags}
									onChange={(e)=>this.setState({ field: {...this.state.field, tags: e}, dirty: true })}
									dropdownMatchSelectWidth={false}
								>
									{field.options.map(item => <Option key={item}>{item}</Option>)}
								</Select>
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