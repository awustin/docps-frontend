import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import {
    Button, Col, Modal, Row, Space, Typography
} from 'antd';
import React from 'react';

const { Text } = Typography;

export default function ConfirmationModal(props) {
    return (
        <Modal
            visible={props.visible}
            closable={false}
            width={450}
            footer={
                <>
                    <Button type="secondary" onClick={props.onCancel}>Cancelar</Button>
                    <Button type="primary" onClick={props.onConfirmation}>Confirmar</Button>
                </>
            }
            destroyOnClose
        >
            <Row style={{ alignItems: "center" }}>
                <Col flex="1 0 15%" style={{ textAlign: "center", fontSize: "200%", alignItems: "center" }}>
                    <QuestionCircleOutlined style={{ color: "#4287f5" }} />
                </Col>
                <Col flex="1 0 85%" style={{ textAlign: "start", alignSelf: "center" }}>
                    <Space direction="vertical">
                        <Text strong style={{ fontSize: "110%" }}>{props.title}</Text>
                        <Text>{props.question}</Text>
                    </Space>
                </Col>
            </Row>
        </Modal>
    );
}