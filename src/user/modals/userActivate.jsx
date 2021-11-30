
import { Col, Modal, Row, Switch, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { changeUserStatusById } from '../../services/usersService';
import MessageModal from '../../common/messageModal';

export default function UserActivate(props) {
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState({
        type: undefined,
        title: undefined,
        description: undefined
    });
    const [success, setSuccess] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [visibleActivate, setVisibleActivate] = useState(false);
    const { status, email, id, reloadSearch } = props;

    useEffect(() => {
        setChecked(status === 'active');
    }, [status]);

    function handleSubmit() {
        changeUserStatusById({ id: id, status: status, email: email })
            .then((result) => {
                if (!result.success) {
                    setShowMessageModal(true);
                    setMessage({
                        title: 'Error',
                        description: 'Hubo un error al cambiar el estado',
                        type: 'validate'
                    });
                    setSuccess(false);
                }
                else {
                    setShowMessageModal(true);
                    setMessage({
                        title: 'Se cambió el estado con éxito',
                        description: (result.status === 'ACTIVATE') ? 'Se envió un mail de activación a la dirección de correo electrónico del usuario' : 'Se desactivó este usuario',
                        type: 'success'
                    });
                    setSuccess(true);
                }
            })
            .catch(() => {
                setShowMessageModal(true);
                setMessage({
                    title: 'Error',
                    description: 'Hubo un error al cambiar el estado',
                    type: 'validate'
                });
                setSuccess(false);
            })
    }

    return (
        <>
            <Tooltip key={`activate-${id}`} title={(status === 'active') ? 'Desactivar usuario' : 'Activar usuario'} color="#108ee9">
                <Switch
                    checked={checked}
                    onClick={() => setVisibleActivate(true)}
                />
            </Tooltip>
            <Modal
                visible={visibleActivate}
                closable={false}
                width={400}
                onOk={handleSubmit}
                onCancel={() => {
                    setChecked(status === 'active');
                    setVisibleActivate(false);
                }}
                okText={(status === 'active') ? 'Desactivar' : 'Activar'}
                cancelText="Cancelar"
            >
                <Row>
                    <Col flex="1 0 20%" style={{ textAlign: "center", fontSize: "160%", alignItems: "center" }}>
                        <ExclamationCircleOutlined style={{ color: "#ffc02e" }} />
                    </Col>
                    <Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
                        {(status === 'active') ? '¿Desactivar este usuario?' : '¿Activar este usuario?'}
                    </Col>
                </Row>
            </Modal>
            <MessageModal
                type={message.type}
                title={message.title}
                description={message.description}
                visible={showMessageModal}
                onClose={() => {
                    if (success)
                        reloadSearch();
                    setShowMessageModal(false);
                    setVisibleActivate(false);
                }}
            />
        </>
    );
}