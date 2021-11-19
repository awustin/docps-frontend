import {
	DeleteOutlined,
	ExportOutlined,
	EyeOutlined,
	PlusCircleOutlined
} from '@ant-design/icons';
import {
	Button, Col,
	DatePicker, Divider,
	Form,
	Input, List, Row, Select, Space, Tag, Tooltip, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import '../CustomStyles.css';
import { getGroupsDropdown, getProjectsDropdown } from '../services/projectsService';
import { getTagsForTestplan, searchTestplans } from '../services/testplansService';
import { datePickerRangeConvert } from '../utils/format';
import TestplanDelete from './modals/testplanDelete';
import TestplanForm from './testplanForm';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

class TestplanSearchPane extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.showResults = this.showResults.bind(this)
		this.reloadSearch = this.reloadSearch.bind(this)
		this.getProjectOptions = this.getProjectOptions.bind(this)
		this.getTagOptions = this.getTagOptions.bind(this)
	}

	state = {
		lastValues: undefined,
		results: undefined,
		groupOptions: [],
		projectOptions: [],
		tagOptions: [],
		error: undefined,
		editTestplanId: undefined,
		testplan: undefined,
		openForm: false,
		mode: 'add'
	}

	componentDidMount() {
		const { user } = this.props
		getGroupsDropdown(user.id).then((result) => {
			if (result.success) {
				this.setState({ groupOptions: result.groups })
			}
		})
	}

	handleSubmit(values) {
		values.createdOn = (values.createdOn) ? datePickerRangeConvert(values.createdOn) : undefined
		searchTestplans(values).then((result) => {
			if (result.success) {
				this.setState({ results: result.testplans, lastValues: values })
			}
		})
	}

	reloadSearch() {
		const { lastValues } = this.state
		if (lastValues !== undefined) {
			searchTestplans(lastValues).then((result) => {
				if (result.success) {
					this.setState({ results: result.testplans })
				}
			})
		}
	}

	getProjectOptions(groupId) {
		getProjectsDropdown(groupId).then((result) => {
			if (result.success) {
				this.setState({ projectOptions: result.projects })
			}
		})
	}

	getTagOptions() {
		getTagsForTestplan().then((result) => {
			if (result.success) {
				this.setState({ tagOptions: result.tags })
			}
		})
	}

	showResults() {
		const { results } = this.state

		const deleteHandle = (function (id) {
			this.setState({ visibleDelete: true, editTestplanId: id })
		}).bind(this)

		const statusTag = (function (status, key) {
			switch (status) {
				case 'Not executed':
					return <Tag key={key + '999997'} color="#999997">No ejecutado</Tag>
				case 'In progress':
					return <Tag key={key + 'ebcf52'} color="#ebcf52">En progreso</Tag>
				case 'Passed':
					return <Tag key={key + '09de8c'} color="#09de8c">Pasó</Tag>
				case 'Failed':
					return <Tag key={key + 'f50'} color="#f50">Falló</Tag>
			}
		}).bind(this)

		let list;

		if (results !== undefined) {
			list = <List
				size="small"
				pagination={{
					size: "small",
					pageSize: 20
				}}
				dataSource={results}
				bordered={false}
				renderItem={item => (
					<List.Item
						key={item.key}
						span={4}
						actions={[
							statusTag(item.status, item.key),
							<Tooltip key={`view-${item.key}`} title="Ver plan de pruebas" color="#108ee9">
								<Link to={{ pathname: "/testplans/id=" + item.id }} style={{ color: "#228cdbff" }}>
									<EyeOutlined style={{ fontSize: '150%', color: "#228cdbff" }} />
								</Link>
							</Tooltip>,
							<Tooltip key={`delete-${item.key}`} title="Eliminar plan de pruebas" color="#108ee9">
								<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff" }} onClick={() => { deleteHandle(item.id) }} />
							</Tooltip>,
							<Tooltip key={`export-${item.key}`} title="Exportar" color="#108ee9">
								<Link to={{ pathname: `/testplans/export=${item.id}` }} style={{ color: "#000" }}>
									<ExportOutlined style={{ fontSize: '150%' }} />
								</Link>
							</Tooltip>
						]}
						className={'list-item testplan'}
						style={{ background: "#fff" }}
					>
						<Space direction="vertical" size={5} style={{ width: "100%" }}>
							<List.Item.Meta
								description=<div className={'list-item description'}>
								{'Proyecto: ' + item.projectName + ' '}
								<Text className={'date hideable'} key={item.key + 'created'} type="secondary"><i>{item.createdOn}</i></Text>
							</div>								
							/>
							<Row gutter={16}>
								<Col>
									{item.testplanName}
								</Col>
								<Col>
									{item.tags.map(tag => <Tag className={'tags hideable'} key={item.key + tag}>{tag}</Tag>)}
								</Col>
							</Row>
						</Space>
					</List.Item>
				)}
			/>
		}


		return (
			<>
				<div className="search-results">
					{list}
				</div>
			</>
		)
	}


	render() {
		const { groupOptions, projectOptions, tagOptions, visibleDelete, editTestplanId, openForm, mode } = this.state
		const { user } = this.props
		const layout = {
			labelCol: { span: 18 },
			wrapperCol: { span: 20 },
		}
		const tailLayout = {
			wrapperCol: { span: 12 },
		}
		return (
			<>
				<Row>
					<Col span={7}>
						<Form {...layout}
							name="testplanSearch"
							layout="vertical"
							style={{ marginBlockStart: "1%" }}
							onFinish={this.handleSubmit}
						>
							<Row>
								<Col span={24}>
									<Form.Item
										label="Grupo"
										name="group"
										rules={[{ required: true, message: 'Seleccione un grupo.' }]}
									>
										<Select
											allowClear
											placeholder="Seleccione un grupo"
											onChange={id => this.getProjectOptions(id)}
										>
											{groupOptions.map(e => (<Option key={e.key}>{e.name}</Option>))}
										</Select>
									</Form.Item>
									<Form.Item
										label="Proyecto"
										name="projects"
										rules={[{ required: true, message: 'Seleccione uno o mas proyectos.' }]}
									>
										<Select
											mode="multiple"
											allowClear
											placeholder="Seleccione uno o más proyectos"
											disabled={(projectOptions || []).length === 0}
										>
											{projectOptions.map(item => (<Option key={item.id}>{item.name}</Option>))}
										</Select>
									</Form.Item>
									<Form.Item
										label="Nombre"
										name="testplanName"
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Fecha de creación"
										name="createdOn"
									>
										<RangePicker />
									</Form.Item>
									<Form.Item
										label="Etiquetas"
										name="testplanTags"
									>
										<Select
											mode="multiple"
											allowClear
											placeholder="Seleccione una o más etiquetas"
											onDropdownVisibleChange={this.getTagOptions}
										>
											{tagOptions.map(item => (<Option key={item.tag}>{item.tag}</Option>))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row span={16}>
								<Form.Item {...tailLayout}>
									<Button type="primary" htmlType="submit">Buscar</Button>
								</Form.Item>
							</Row>
						</Form>
					</Col>
					<Col span={1}>
						<Divider type="vertical" style={{ height: "100%" }} dashed />
					</Col>
					<Col span={16}>
						<Col style={{ textAlign: "end", marginBlockEnd: "1%" }}>
							<Button
								icon={<PlusCircleOutlined />}
								type="primary"
								onClick={() => this.setState({ openForm: true, mode: 'add', user: undefined })}
							>
								Crear plan de pruebas
							</Button>
						</Col>
						{this.showResults()}
					</Col>
				</Row>
				<TestplanForm
					mode={mode}
					open={openForm}
					user={user}
					close={() => this.setState({ openForm: false })}
					reloadSearch={this.reloadSearch}
				/>
				{(visibleDelete) ? (
					<TestplanDelete
						testplanId={editTestplanId}
						visibleDelete={visibleDelete}
						closeDelete={(() => { this.setState({ visibleDelete: false }) }).bind(this)}
						reloadSearch={this.reloadSearch}
					/>
				) : (
					<></>
				)}
			</>
		);
	}
}

export default withRouter(TestplanSearchPane);