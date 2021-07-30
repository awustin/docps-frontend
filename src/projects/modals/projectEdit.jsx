import { withRouter } from "react-router";
import React from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
		Typography,
		Tooltip
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography

class ProjectEdit extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    state = {
			project: {
					id: undefined,
					createdOn: undefined,
					name: undefined,
					group: undefined
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
			validationMessage: undefined,
			showCancelModal: false
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
    }

    handleSubmit(values) {
        const { closeEdit, reloadSearch } = this.props
        //Validar nombre único
        this.setState({ validationMessage: {title:'Un proyecto con ese nombre ya existe',description:'Debe ingresar otro nombre'} })        
        //Query para hacer el insert del proyecto
        //Enviar el mail de verificacion al usuario nuevo
        closeEdit()
        reloadSearch()
    }

    render() {
        const { visibleEdit, closeEdit } = this.props
        const { project, showCancelModal, showMessageModal, statusOptions, dirty, field } = this.state
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
                        width={700}
                        okText="Confirmar"
                        okButtonProps={{form:'editForm', key: 'submit', htmlType: 'submit', disabled: !dirty}}
                        cancelText="Cancelar"
                        onCancel={()=>{this.setState({showCancelModal:true})}}
                        destroyOnClose={true}                
                        maskClosable={false}
                        keyboard={false}
                    >
												<Title level={4} 
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
                    </>
                ):(<></>)}
            </>
        );
    }
}

export default withRouter(ProjectEdit);