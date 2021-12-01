
import { Col, Modal, Row, Switch, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { changeGroupStatusById } from '../../services/groupsService';
import MessageModal from '../../common/messageModal';

export default function GroupActivate(props) {
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState({
        type: undefined,
        title: undefined,
        description: undefined
    });
    const [success, setSuccess] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [visibleActivate, setVisibleActivate] = useState(false);
    const { status, id, reloadSearch } = props;

    useEffect(() => {
        setChecked(status === 'active');
    }, [status]);

    function handleSubmit() {
        changeGroupStatusById({ id: id, status: status })
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
                        description: (result.status === 'ACTIVATE') ? 'Se activó este grupo' : 'Se desactivó este grupo',
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
            <Tooltip key={`activate-${id}`} title={(status === 'active') ? 'Desactivar grupo' : 'Activar grupo'} color="#108ee9">
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
                        {(status === 'active') ? '¿Desactivar este grupo?' : '¿Activar este grupo?'}
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