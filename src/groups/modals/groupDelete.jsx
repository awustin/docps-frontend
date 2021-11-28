import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import MessageModal from '../../common/messageModal';
import { deleteGroup } from '../../services/groupsService';

class GroupDelete extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.closeMessageModal = this.closeMessageModal.bind(this)
		this.validationMessage = "No es posible eliminar el Grupo porque tiene usuarios miembros, está en estado de alta o tiene Proyectos asociados"
	}
	state = {
		success: false,
		showMessageModal: false,
		message: {
			title: undefined,
			description: undefined,
			type: undefined
		}
	}

	handleSubmit() {
		const { groupId } = this.props
		deleteGroup(groupId).then((result) => {
			if (!result.success) {
				this.setState({
					showMessageModal: true,
					message: {
						title: 'No se eliminó el grupo',
						description: this.validationMessage,
						type: 'validate'
					}
				})
			}
			else {
				this.setState({
					success: true,
					showMessageModal: true,
					message: {
						title: 'Grupo eliminado',
						description: 'El grupo fue eliminado con éxito',
						type: 'success'
					}
				})
			}
		})
	}

	closeMessageModal() {
		const { closeDelete, reloadSearch } = this.props
		const { success } = this.state
		if (success)
			reloadSearch()
		closeDelete()
	}

	render() {
		const { closeDelete, visibleDelete } = this.props
		const { message, showMessageModal } = this.state

		return (
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
						<Col flex="1 0 20%" style={{ textAlign: "center", fontSize: "160%", alignItems: "center" }}>
							<ExclamationCircleOutlined style={{ color: "#ffc02e" }} />
						</Col>
						<Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
							¿Eliminar este grupo?
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
	}
}

export default withRouter(GroupDelete);