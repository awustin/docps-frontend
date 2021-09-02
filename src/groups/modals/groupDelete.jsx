import { withRouter } from "react-router";
import React from 'react';
import { activeMembersforGroupById, deleteGroup } from '../../services/groupsService';
import {
    Modal,
    Row,
    Col,
	Alert,
	Button
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';

class GroupDelete extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.closeMessageModal = this.closeMessageModal.bind(this)
	}
	state = {
		success: false,
		showMessageModal: false,
		message: {
			title:undefined,
			description:undefined,
			type: undefined,
			def: '¿Desea eliminar este grupo?',
			hasActiveUsers: 'Este grupo contiene usuarios que están dados de alta, ¿desea eliminarlo de todas formas?',
		},
		hasActiveUsers: false,
		validDeletion: true,
		loading: true
	}
	
	componentDidMount() {
		const { groupId } = this.props
		activeMembersforGroupById(groupId).then((result)=>{
			if(result.success) {
				this.setState({ hasActiveUsers: result.bool, loading: false })	
			}
		})
	}

	handleSubmit(values) {
		const { groupId } = this.props
		deleteGroup(groupId).then((result)=>{
			if(!result.success) {
				if(!result.hasOwnProperty('validate'))
					this.setState({ 
						showMessageModal: true, 
						message: {
							title:'Se produjo un error',
							description:'Inténtelo de nuevo',
							type:'validate'
						}
					})
				else {
					this.setState({ 
						showMessageModal: true, 
						message: {
							title:'No se eliminó el grupo',
							description:'Este grupo contiene proyectos, por lo que no se puede eliminar',
							type:'validate'
						}
					})						
				}					
			}
			else {
				this.setState({ 
					success: true,
					showMessageModal: true, 
					message: {
						title:'Grupo eliminado',
						description:'El grupo fue eliminado con éxito',
						type:'success'
					}
				})					
			}	
		})
	}

	closeMessageModal() {
		const { closeDelete, reloadSearch } = this.props
		const { success, showMessageModal } = this.state
		if(success)
			reloadSearch()
		closeDelete()
	}
	
	render() {
		const { closeDelete, visibleDelete } = this.props
		const { message,hasActiveUsers,showMessageModal,loading } = this.state
		
		return(
		<>
		{ (!loading) ? (
			<>
				<Modal
					visible={visibleDelete}
					closable={false}
					width={400}
					onOk={this.handleSubmit}
					onCancel={closeDelete}
					okText="Eliminar"
					cancelText="Cancelar"
				>
					<Row>
						<Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
							<ExclamationCircleOutlined style={{color:"#ffc02e"}} />
						</Col>
						<Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
							{(hasActiveUsers)?(message.hasActiveUsers):(message.def)}
						</Col>
					</Row>
				</Modal>
				<MessageModal								
					type={message.type}
					title={message.title}
					description={message.description}
					visible={showMessageModal}
					onClose={this.closeMessageModal}
				/>
			</>
			) 
			: (<></>)
		}				
		</>
		)
	}
}

export default withRouter(GroupDelete);