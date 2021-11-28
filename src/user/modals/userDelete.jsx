import { withRouter } from "react-router";
import React from 'react';
import { deleteUserById } from '../../services/usersService';
import { Modal, Row, Col } from 'antd';
import { ExclamationCircleOutlined, } from '@ant-design/icons';
import MessageModal from '../../common/messageModal';

class UserDelete extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validationMessage = "No es posible eliminar el usuario porque pertenece a un Grupo, está en estado de alta o tiene ejecuciones asociadas.";
        this.closeMessageModal = this.closeMessageModal.bind(this)
    }

    state = {
        showMessageModal: false,
        message: {
            title: undefined,
            description: undefined,
            type: undefined
        }
    }

    handleSubmit() {
        const { userId } = this.props
        deleteUserById(userId).then((result) => {
            if (!result.success) {
                this.setState({
                    showMessageModal: true,
                    message: {
                        title: 'No se eliminó el usuario',
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
                        title: 'Usuario eliminado',
                        description: 'El usuario fue eliminado con éxito',
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
        const { showMessageModal, message } = this.state
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
                            ¿Eliminar este usuario?
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
        );
    }
}

export default withRouter(UserDelete);