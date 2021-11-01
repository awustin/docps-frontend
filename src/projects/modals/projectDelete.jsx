import { withRouter } from "react-router";
import React from 'react';
import { deleteProject } from '../../services/projectsService';
import {
    Modal,
    Row,
    Col
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';

class ProjectDelete extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
	state = {
		message: {
			def: '¿Desea eliminar este proyecto?',
			validate: {
				title:'No se eliminó el proyecto',
				description:'Este proyecto contiene planes de prueba, por lo que no se puede eliminar',
				type:'validate'
			}
		},
		validDeletion: true
	}

	handleSubmit() {
		const { closeDelete, reloadSearch, projectId } = this.props
		deleteProject(projectId).then((result)=>{
			const { success } = result
			if(success) {
				closeDelete()
				reloadSearch()				
			}
			else {
				this.setState({ validDeletion: false })				
			}
		})
	}

    render() {
			const { closeDelete, visibleDelete } = this.props
			const { message,validDeletion } = this.state

			return(
				<>
				{ (validDeletion) ? (
						<Modal
								visible={visibleDelete}
								closable={false}
								width={400}
								onOk={this.handleSubmit}
								onCancel={closeDelete}
								okText="Eliminar"
								cancelText="Cancelar"
								destroyOnClose
						>
							<Row>
								<Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
									<ExclamationCircleOutlined style={{color:"#ffc02e"}} />
								</Col>
								<Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
									{message.def}
								</Col>
							</Row>
						</Modal>
				) 
				: 
				(
				<MessageModal								
					type={message.validate.type}
					title={message.validate.title}
					description={message.validate.description}
					visible={!validDeletion}
					onClose={closeDelete}
				/>
				)
				}				
				</>
			);
		}
}

export default withRouter(ProjectDelete);