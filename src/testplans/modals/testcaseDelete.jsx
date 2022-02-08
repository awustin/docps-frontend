import {
	ExclamationCircleOutlined
} from '@ant-design/icons';
import {
	Col, Modal,
	Row
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import MessageModal from '../../common/messageModal';
import { deleteTestcase } from '../../services/workspaceService';

class TestcaseDelete extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	state = {
		success: false,
		message: {
			def: '¿Desea eliminar este caso de prueba?',
			validate: {
				title: 'No se eliminó el caso de prueba',
				description: 'Este caso de prueba contiene ejecuciones, por lo que no se puede eliminar',
				type: 'validate'
			}
		},
		showMessage: false
	}

	handleSubmit() {
		const { testcaseId } = this.props
		deleteTestcase(testcaseId).then((result) => {
			if (result.success)
				this.setState({
					message: {
						...this.state.message,
						title: 'Caso de prueba eliminado',
						description: 'Se eliminó el caso de prueba con éxito.',
						type: 'success'
					},
					success: true
				})
			else
				this.setState({
					message: {
						...this.state.message,
						title: 'No se eliminó el caso de prueba',
						description: 'Este caso tiene ejecuciones asociadas, por lo que no se puede eliminar.',
						type: 'validate'
					},
					success: false
				})
			this.setState({ showMessage: true });
		})
	}

	render() {
		const { closeDelete, reloadSearch, visibleDelete } = this.props
		const { message, showMessage, success } = this.state

		return (
			<>
				{(!showMessage) ? (
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
							<Col flex="1 0 20%" style={{ textAlign: "center", fontSize: "160%", alignItems: "center" }}>
								<ExclamationCircleOutlined style={{ color: "#ffc02e" }} />
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
							type={message.type}
							title={message.title}
							description={message.description}
							visible={showMessage}
							onClose={() => {
								if (success)
									reloadSearch()
								closeDelete()
							}}
						/>
					)
				}
			</>
		);
	}
}

export default withRouter(TestcaseDelete);