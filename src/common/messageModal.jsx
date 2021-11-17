import { withRouter } from "react-router";
import React from 'react';
import {
	Modal,
	Row,
	Col,
	Button,
	Space,
	Typography
} from 'antd';
import {
	CloseCircleOutlined,
	CheckCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;

class MessageModal extends React.Component {
	render() {
		const { type, title, description, onClose, visible } = this.props

		return (
			<>
				<Modal
					visible={visible}
					closable={false}
					width={450}
					footer={
						<Button type="primary" onClick={onClose}>Cerrar</Button>
					}
					destroyOnClose
				>
					{
						(type === "validate") ?
							(
								<Row style={{ alignItems: "center" }}>
									<Col flex="1 0 15%" style={{ textAlign: "center", fontSize: "200%", alignItems: "center" }}>
										<CloseCircleOutlined style={{ color: "#f55742" }} />
									</Col>
									<Col flex="1 0 85%" style={{ textAlign: "start", alignSelf: "center" }}>
										<Space direction="vertical">
											<Text strong style={{ fontSize: "110%" }}>{title}</Text>
											<Text>{description}</Text>
										</Space>
									</Col>
								</Row>
							)
							:
							(
								(type === "success") ?
									(
										<Row style={{ alignItems: "center" }}>
											<Col flex="1 0 15%" style={{ textAlign: "center", fontSize: "200%", alignItems: "center" }}>
												<CheckCircleOutlined style={{ color: "#4de879" }} />
											</Col>
											<Col flex="1 0 85%" style={{ textAlign: "start", alignSelf: "center" }}>
												<Space direction="vertical">
													<Text strong style={{ fontSize: "110%" }}>{title}</Text>
													<Text>{description}</Text>
												</Space>
											</Col>
										</Row>
									)
									:
									(<></>)
							)
					}
				</Modal>
			</>
		);
	}
}

export default withRouter(MessageModal);