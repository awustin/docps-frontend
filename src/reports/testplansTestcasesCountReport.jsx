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
import { getTestplansTestcasesCount } from '../services/reportsService';
import { datePickerRangeConvert } from '../utils/format';

const { Option } = Select
const { RangePicker } = DatePicker

class TestplansTestcasesCountReport extends React.Component {
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
			testplans: undefined,
			testcases: undefined,
		},
		data: {
			labels: [],
			datasets: [
				{
					label: 'N° de planes',
					data: [],
					fill: false,
					backgroundColor: '#f7c95e',
					borderColor: '#f7c95e',
				},
				{
					label: 'N° de casos',
					data: [],
					fill: false,
					backgroundColor: '#5e6df7',
					borderColor: '#5e6df7',
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
		getTestplansTestcasesCount(values).then((result) => {
			let { data, totals } = this.state
			if (result.success) {
				data.labels = result.report.dataX
				data.datasets[0].data = result.report.dataYtestplans
				data.datasets[1].data = result.report.dataYtestcases
				totals.testplans = result.report.totalTestplans
				totals.testcases = result.report.totalTestcases
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
		var canvas = document.getElementById("testplan-report")
		canvas.toBlob(function (blob) {
			saveAs(blob, "testplansReport.png")
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
		return (
			<>
				<Breadcrumb>
					<Breadcrumb.Item>Reportes</Breadcrumb.Item>
					<Breadcrumb.Item>{user.currentGroup.name}</Breadcrumb.Item>
				</Breadcrumb>
				<Spin spinning={loading} size="large">
					<div className="navigation" style={{ margin: "20px" }}>
						<Row>
							<Col span={2}>
								<Tooltip title="Atrás">
									<LeftCircleOutlined style={{ fontSize: "150%" }} onClick={() => { this.props.history.goBack() }} />
								</Tooltip>
							</Col>
							<Col span={22}>
								<Form {...layout}
									name="reportsTestplanCount"
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
											className='testplan-report'
											id='testplan-report'
											data={data}
											options={options}
										/>
									}
								</Col>
								<Col span={8} className='report-stats-column'>
									<Card>
										<Statistic
											title="Planes de pruebas totales"
											value={totals.testplans}
											precision={0}
											valueStyle={{ color: '#e0b422', fontSize: "250%" }}
											loading={loading}
										/>
										<Statistic
											title="Casos de pruebas totales"
											value={totals.testcases}
											precision={0}
											valueStyle={{ color: '#5e6df7', fontSize: "250%" }}
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
				</Spin>
			</>
		);
	}
}

export default withRouter(TestplansTestcasesCountReport);