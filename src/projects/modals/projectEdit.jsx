import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import React from 'react';
import '../../CustomStyles.css';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
		Typography,
		Tooltip,
		Button,
		Divider,
		List,
		Skeleton,
		Tag
} from 'antd';
import {
	ExclamationCircleOutlined,
	PlusCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';
import TestplanDelete from '../../testplans/modals/testplanDelete';
import ProjectTestplanCreate from './projectTestplanCreate';

const { Title,Text } = Typography

class ProjectEdit extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.showTestplans = this.showTestplans.bind(this)
		this.statusTag = this.statusTag.bind(this)
		this.reloadTestplanSearch = this.reloadTestplanSearch.bind(this)
	}

	state = {
		project: {
				id: undefined,
				createdOn: undefined,
				name: undefined,
				group: undefined,
				testplanList: []
		},
		dirty: false,
		field: {
			name: undefined,
		},
		showMessageModal: false,
		message: {
			title:undefined,
			description:undefined,
			type: undefined
			},
		loading: true,
		showCancelModal: false,
		visibleTestplanDelete: false,
		visibleCreateTestplan: false,
		editTestplanId: undefined
	}

	componentDidMount() {
		const { projectId } = this.props
		//Query para traer toda la info del proyecto 
		let project = {
				id: 999,
				createdOn: '1/06/2021',
				name: 'DOCPS-0001: Tests de integración',
				group: 'Pumas'
		}
		this.setState({ project: project, field:{name:project.name} })
		//Query para traer la lista de planes de prueba
		let list = []
		let statuses = ['Not executed','In progress','Passed','Failed']
		for (let index = 0; index < 10; index++) {
				list.push({
						title: 'DOCPS-15' + index,
						key: index + 1,
						id: index + 1,
						dateModified: '15/04/2021',
						status: statuses[Math.floor(Math.random() * statuses.length)]
				})                        
		}
		project.testplanList=list
		setTimeout(()=>this.setState({ project: project, loading:false }), 1000)			
	}
	
	reloadTestplanSearch() {
		const { projectId } = this.props
		this.setState({ loading:true })
		//Query para traer la lista de planes de prueba
		let list = []
		let statuses = ['Not executed','In progress','Passed','Failed']
		for (let index = 0; index < 10; index++) {
				list.push({
						title: 'DOCPS-15 MODIF' + index,
						key: index + 1,
						id: index + 1,
						dateModified: '15/04/2021',
						status: statuses[Math.floor(Math.random() * statuses.length)]
				})                        
		}
		setTimeout(()=>this.setState({ project: { ...this.state.project, testplanList: list}, loading:false }), 1000)	
	}

	handleSubmit() {
		 const { closeEdit, reloadSearch } = this.props
			const { field } = this.state
			/*
			//Validar nombre vacío
			this.setState({
					showMessageModal: true, 
					message: {
						title:'Nombre vacío',
						description:'Debe ingresar otro nombre.',
						type:'validate'
					}
				})
			//Validar nombre único
			this.setState({
					showMessageModal: true, 
					message: {
						title:'Un proyecto con ese nombre ya existe',
						description:'Debe ingresar otro nombre.',
						type:'validate'
					}
				})
			*/
			//Query para hacer el update del proyecto
			closeEdit()
			reloadSearch()
	}

	statusTag(status) {
		switch(status)
		{
				case 'Not executed':
						return <Tag color="#999997">No ejecutado</Tag>
				case 'In progress':
						return <Tag color="#ebcf52">En progreso</Tag>
				case 'Passed':
						return <Tag color="#09de8c">Pasó</Tag>
				case 'Failed':
						return <Tag color="#f50">Falló</Tag>
		}
	}
		
		showTestplans() {
			const { project, loading } = this.state
			return(
				<Skeleton
					loading={loading}	
					paragraph={{ rows: 7 }}
					active
				>
					<List
							size="small"
							pagination={{
									pageSize: 7,
									size: "small"
									}}
							dataSource={project.testplanList}
							bordered={true}
							renderItem={item => (
									<List.Item
											key={item.key}
											span={4}
											actions={[
													this.statusTag(item.status),
													<Link to={{ pathname: "/testplans/id=" + item.id }} style={{color:"#228cdbff"}}>
														<EditOutlined style={{ fontSize: '150%'}} />
													</Link>,
													<Tooltip title="Eliminar plan de pruebas" color="#108ee9">
														<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff"}} onClick={()=>this.setState({ visibleTestplanDelete:true, editTestplanId:item.id })}/>
													</Tooltip>
											]}
											style={{background: "#fff"}}
											className="modal-list-item"
									>
											<List.Item.Meta
													title={item.title}
													description={'Última modificación: ' + item.dateModified}
													/>
									</List.Item>
							)}
					/>
				</Skeleton>
			)
		}

    render() {
        const { visibleEdit, closeEdit } = this.props
        const { project, message, showCancelModal, showMessageModal, statusOptions, dirty, field, visibleTestplanDelete, visibleCreateTestplan, editTestplanId } = this.state
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        
        return(
            <>
                {(project.id!==undefined)?(
                    <>
                    <Modal
                        title={"Proyecto"}
                        visible={visibleEdit}
                        closable={false}
                        width={800}
                        okText="Confirmar"
                        okButtonProps={{onClick:this.handleSubmit, disabled: !dirty}}
                        cancelText="Cancelar"
                        onCancel={()=>{this.setState({showCancelModal:true})}}
                        destroyOnClose={true}                
                        maskClosable={false}
                        keyboard={false}
                    >
													<Text className="modal-title-label">Nombre</Text>
													<Title 
														className="modal-editable-title"
														level={4}
														editable={{
															tooltip: <Tooltip>Modificar nombre</Tooltip>,
															autoSize: { minRows: 1, maxRows: 2 },
															onChange: ((e)=>{
																this.setState({ dirty: true, field:{name:e} })
															})
														}}
													>
														{field.name}													
													</Title>
													<Divider/>
													<Row style={{alignItems: "center", marginBlockStart:"5%", paddingBottom: "1%"}}>
															<Col flex="1 0 70%">
																	<Title className="modal-subtitle" level={5}>Planes de pruebas</Title>
															</Col>
															<Col flex="1 0 30%" style={{textAlign: "end"}}>
																	<Button type="primary" shape="round" icon={<PlusCircleOutlined style={{ fontSize:"110%" }}/>} onClick={()=>this.setState({ visibleCreateTestplan:true })}>
																			Crear plan de pruebas
																	</Button>
															</Col>
													</Row>
													{this.showTestplans()}
                    </Modal>
                    <Modal
                        visible={showCancelModal}
                        closable={false}
                        width={400}
                        onOk={() => { 
                            this.setState({showCancelModal:false})
                            closeEdit()
                        }}
                        onCancel={() => { 
															this.setState({showCancelModal:false}) 
														}}
                        okText="Salir"
                        cancelText="Cancelar"
                    >
                        <Row>
                            <Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
                            <ExclamationCircleOutlined style={{color:"#ffc02e"}} />
                            </Col>
                            <Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
                            ¿Salir de la modificación del proyecto?
                            </Col>
                        </Row>
                    </Modal>
											<MessageModal								
												type={message.type}
												title={message.title}
												description={message.description}
												visible={showMessageModal}
												onClose={()=>this.setState({ showMessageModal: false })}
											/>
                    </>
                ):(<></>)}
								
									{ (visibleTestplanDelete) ? (
										<TestplanDelete
											testplanId={editTestplanId}
											visibleDelete={visibleTestplanDelete}
											closeDelete={(()=>{this.setState({ visibleTestplanDelete: false })}).bind(this)}
											reloadSearch={this.reloadTestplanSearch}				
										/>
									) : (
									<></>
									)}
									{ (visibleCreateTestplan) ? (
											<ProjectTestplanCreate
													projectId={project.id}
													visibleCreateTestplan={visibleCreateTestplan}
													close={(()=>{this.setState({ visibleCreateTestplan: false })}).bind(this)}
													reloadSearch={this.reloadTestplanSearch}
											/>
									) : (
											<></>
									)}
            </>
        );
    }
}

export default withRouter(ProjectEdit);