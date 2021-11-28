import {
	CheckCircleTwoTone, DownloadOutlined, LeftCircleOutlined, WarningTwoTone
} from '@ant-design/icons';
import {
	Breadcrumb, Button, Col, Divider, Progress, Row, Space, Tooltip, Typography, Spin
} from 'antd';
import { saveAs } from 'file-saver';
import React from 'react';
import { withRouter } from "react-router";
import { emitExportTestplan, initSocket } from '../services/socket';
import { cancelFile, downloadTestplanFile, getTestcasesCount } from '../services/testplansService';

const { Title, Text } = Typography
var socket = initSocket();

class TestplanExport extends React.Component {
	constructor(props) {
		super(props)
		this.onExportClick = this.onExportClick.bind(this)
		this.showExportPreview = this.showExportPreview.bind(this)
		this.showExportOptions = this.showExportOptions.bind(this)
		this.downloadFile = this.downloadFile.bind(this)
		this.cancelFile = this.cancelFile.bind(this)
	}
	state = {
		id: undefined,
		name: undefined,
		casesCount: undefined,
		loading: false,
		exportSuccess: undefined,
		exportFailure: undefined,
		numExported: undefined,
		progress: 0,
		fileName: undefined
	}

	componentDidMount() {
		if (Object.keys(this.props).includes("match")) {
			const { id } = this.props.match.params
			this.setState({ loading: true })
			getTestcasesCount(id).then((result) => {
				if (result.success) {
					const { data } = result
					this.setState({
						id: id,
						name: data.name,
						casesCount: data.count,
						exportSuccess: undefined,
						exportFailure: undefined
					})
				}
				this.setState({ loading: false })
			})
		}
		socket.on('update-progress', (data) => {
			if (data.progress >= 100) {
				this.setState({
					progress: data.progress,
					loading: false,
					exportSuccess: true,
					exportFailure: false,
					numExported: data.numExported,
					fileName: data.fileName
				})
			}
			if (data.progress === -1) {
				this.setState({ progress: data.progress, loading: false, exportSuccess: false, exportFailure: true, numExported: -1 })
			}
			else {
				this.setState({ progress: data.progress })
			}
		})
	}

	componentWillUnmount() {
		socket.removeAllListeners();
	}

	onExportClick() {
		const { id } = this.state
		emitExportTestplan(id)
		this.setState({ loading: true })
	}

	downloadFile() {
		const { fileName } = this.state
		downloadTestplanFile(fileName).then((response) => {
			try {
				if (response.type === "text/html" || response.size === 0) {
					alert('No se encontró el archivo');
				}
				else {
					saveAs(response, `${fileName}`);
				}
			} catch (e) {
				console.log(e);
			}
			this.props.history.goBack();
		})
	}

	cancelFile() {
		const { id, fileName } = this.state
		let values = { id: id, fileName: fileName }
		cancelFile(values).then(() => {

		})
		socket.removeAllListeners();
		this.props.history.goBack();
	}

	showExportPreview() {
		const { name, casesCount, loading, exportSuccess, exportFailure, progress } = this.state
		if (loading) {
			return (<>
				<Text type="secondary">Generando archivo .xls...</Text>
				<Progress
					type="circle"
					strokeColor={{
						'0%': '#108ee9',
						'100%': '#87d068',
					}}
					percent={progress}
				/>
			</>)
		}
		if (exportSuccess) {
			return (
				<CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "500%" }} />
			)
		}
		if (exportFailure) {
			return (
				<WarningTwoTone twoToneColor="#f56751" style={{ fontSize: "500%" }} />
			)
		}
		return (
			<>
				<Text>El plan de pruebas `{name}` tiene</Text>
				<Text style={{ fontSize: "500%" }}>{casesCount}</Text>
				<Text>casos para exportar</Text>
			</>
		)
	}

	showExportOptions() {
		const { loading, exportSuccess, exportFailure, numExported } = this.state
		if (loading) {
			return (
				<>
					<Space>
						<Button type="primary" icon={<DownloadOutlined />} onClick={this.onExportClick} disabled={true}>Exportar</Button>
						<Button disabled={true}>Cancelar</Button>
					</Space>
				</>
			)
		}
		if (exportSuccess) {
			return (
				<>
					<Text style={{ fontSize: "120%", color: "#52c41a" }}>¡Exportado con éxito!</Text>
					<Text style={{ fontSize: "105%" }}>Se exportaron <b>{numExported}</b> casos de prueba</Text>
					<Space>
						<Button type="primary" icon={<DownloadOutlined />} onClick={this.downloadFile}>Descargar</Button>
						<Button onClick={this.cancelFile}>Cancelar</Button>
					</Space>
				</>
			)
		}
		if (exportFailure) {
			return (
				<>
					<Text style={{ fontSize: "120%", color: "#f56751" }}>Hubo un error al exportar los casos de pruebas</Text>
					<Text style={{ fontSize: "105%" }}>Intente nuevamente más tarde</Text>
					<Button onClick={this.props.history.goBack}>Finalizar</Button>
				</>
			)
		}
		return (
			<>
				<Text>¿Generar archivo de casos de pruebas?</Text>
				<Space>
					<Button type="primary" icon={<DownloadOutlined />} onClick={this.onExportClick}>Exportar</Button>
					<Button onClick={this.props.history.goBack}>Volver</Button>
				</Space>
			</>
		)
	}

	render() {
		const { casesCount, loading } = this.state
		return (
			<>
				<Breadcrumb>
					<Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>
					<Breadcrumb.Item>Exportar</Breadcrumb.Item>
				</Breadcrumb>
				<div className="navigation">
					<Row>
						<Col>
							<Tooltip title="Atrás">
								<LeftCircleOutlined style={{ fontSize: "200%" }} onClick={() => { this.props.history.goBack() }} />
							</Tooltip>
						</Col>
					</Row>
				</div>
				<div className="container">
					<Title level={3}>Exportar</Title>
					<Divider dashed></Divider>
					<Row style={{ alignItems: "center", flexFlow: "column", textAlign: "center" }}>
						{(casesCount) ?
							<>
								<Col flex="1 0 20%" style={{ fontSize: "120%" }}>
									<Space direction="vertical">
										{this.showExportPreview()}
									</Space>
								</Col>
								<Col flex="1 0 20%" style={{ fontSize: "105%" }}>
									<Space direction="vertical" style={{ marginBlockStart: "20%" }}>
										{this.showExportOptions()}
									</Space>
								</Col>
							</>
							:
							(loading) ? <Spin size="large"></Spin> :
								<>
									<Col flex="1 0 20%" style={{ fontSize: "120%" }}>
										<Space direction="vertical">
											<WarningTwoTone twoToneColor="#edb54c" style={{ fontSize: "500%" }} />
										</Space>
									</Col>
									<Col flex="1 0 20%" style={{ fontSize: "105%" }}>
										<Space direction="vertical" style={{ marginBlockStart: "20%" }}>
											<Text style={{ fontSize: "120%", color: "#edb54c" }}>No hay casos de prueba para exportar</Text>
											<Button onClick={() => { this.props.history.goBack() }}>Atrás</Button>
										</Space>
									</Col>
								</>
						}
					</Row>
				</div>
			</>
		);
	}
}

export default withRouter(TestplanExport);