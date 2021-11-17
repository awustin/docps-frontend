import {
	DownloadOutlined, LeftCircleOutlined, LoadingOutlined
} from '@ant-design/icons';
import {
	Breadcrumb, Button, Card, Col, DatePicker, Form, Row, Select, Spin, Statistic, Tooltip
} from 'antd';
import 'chartjs-adapter-date-fns';
import { saveAs } from 'file-saver';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { withRouter } from "react-router";
import '../CustomStyles.css';
import { getProjectsDropdown } from '../services/projectsService';
import { getExecutionsReport } from '../services/reportsService';
import { datePickerRangeConvert } from '../utils/format';

const { Option } = Select
const { RangePicker } = DatePicker

class ExecutionsReport extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.downloadCanvas = this.downloadCanvas.bind(this)
	}

	state = {
		loading: true,
		generatingReport: false,
		projectOptions: [],
		totals: {
			executions: undefined
		},
		data: {
			labels: [],
			datasets: [
				{
					label: 'N° de ejecuciones',
					data: [],
					fill: true,
					backgroundColor: '#5ed6ba',
					borderColor: '#5ed6ba',
				}
			]
		},
		options: {
			scales: {
				yAxes: {
					min: 0,
					ticks: {
						precision: 0,
						beginAtZero: true
					},
				},
				xAxes: {
					type: 'time',
					time: {
						unit: 'week',
						displayFormats: {
							week: 'eee dd, MMMM yyy',
							weekStartsOn: 1
						}
					}
				}
			},
			layout: {
				padding: 12
			}
		}
	}

	componentDidMount() {
		const { user } = this.props
		getProjectsDropdown(user.currentGroup.id).then((result) => {
			if (result.success) {
				result.projects = result.projects.map((e) => {
					return (
						{
							id: user.currentGroup.id + '.' + e.id,
							name: e.name
						}
					)
				})
				this.setState({ projectOptions: result.projects, loading: false })
			}
		})
	}

	handleSubmit(values) {
		values.dates = (values.dates) ? datePickerRangeConvert(values.dates) : undefined
		this.setState({ generatingReport: true });
		getExecutionsReport(values).then((result) => {
			let { data, totals } = this.state
			if (result.success) {
				data.labels = result.report.dataX
				data.datasets[0].data = result.report.dataY
				totals.executions = result.report.totalExecutions
				this.setState({
					data: data,
					generatingReport: false
				});
			}
			else {
				this.setState({ generatingReport: false });
			}
		})
	}

	downloadCanvas() {
		var canvas = document.getElementById("executions-report")
		canvas.toBlob(function (blob) {
			saveAs(blob, "executionsReport.png")
		});
	}

	render() {
		const { user } = this.props
		const { loading, generatingReport, projectOptions, totals, data, options } = this.state
		const layout = {
			labelCol: { span: 18 },
			wrapperCol: { span: 20 },
		}
		const tailLayout = {
			wrapperCol: { span: 12 },
		}

		if (loading)
			return (<></>)
		return (
			<>
				<Breadcrumb>
					<Breadcrumb.Item>Reportes</Breadcrumb.Item>
					<Breadcrumb.Item>{user.currentGroup.name}</Breadcrumb.Item>
				</Breadcrumb>
				<div className="navigation" style={{ margin: "20px" }}>
					<Row>
						<Col span={2}>
							<Tooltip title="Atrás">
								<LeftCircleOutlined style={{ fontSize: "150%" }} onClick={() => { this.props.history.goBack() }} />
							</Tooltip>
						</Col>
						<Col span={22}>
							<Form {...layout}
								name="reportsExecutions"
								layout="vertical"
								onFinish={this.handleSubmit}
							>
								<Row>
									<Col span={12}>
										<Form.Item
											label="Proyectos"
											name="projects"
											rules={[{ required: true, message: 'Seleccione uno o mas proyectos.' }]}
										>
											<Select
												mode="multiple"
												allowClear
												placeholder="Seleccione uno o más proyectos"
											>
												{projectOptions.map(item => (<Option key={item.id}>{item.name}</Option>))}
											</Select>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											label="Fechas"
											name="dates"
										>
											<RangePicker />
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={24}>
										<Form.Item {...tailLayout}>
											<Button type="primary" htmlType="submit">Generar reporte</Button>
										</Form.Item>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</div>
				{(data.labels.length === 0) ? <></> : (
					<div className='report-container'>
						<Row>
							<Col span={16} className='report-column'>
								{(generatingReport) ?
									<Spin
										indicator={
											<LoadingOutlined style={{ fontSize: 150 }} spin />
										}
									/>
									:
									<Bar
										height={200}
										className='executions-report'
										id='executions-report'
										data={data}
										options={options}
									/>
								}
							</Col>
							<Col span={8} className='report-stats-column'>
								<Card>
									<Statistic
										title="Número de ejecuciones totales"
										value={totals.executions}
										precision={0}
										valueStyle={{ color: '#5ed6ba', fontSize: "250%" }}
										loading={loading}
									/>
									<Button disabled={generatingReport} icon={<DownloadOutlined />} onClick={this.downloadCanvas}>
										Descargar
									</Button>
								</Card>
							</Col>
						</Row>
					</div>
				)}
			</>
		);
	}
}

export default withRouter(ExecutionsReport);