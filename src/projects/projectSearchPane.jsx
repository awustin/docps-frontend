import { withRouter } from "react-router";
import React from 'react';
import '../CustomStyles.css';
import { searchProjects, getGroupsDropdown } from '../services/projectsService';
import {
	Divider,
	Form,
	Input,
	Button,
	Select,
	List,
	Avatar,
	Tooltip,
	Row,
	Col,
	Typography
} from 'antd';
import {
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import ProjectEdit from './modals/projectEdit';
import ProjectDelete from './modals/projectDelete';

const { Text } = Typography

class ProjectSearchPane extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.showResults = this.showResults.bind(this)
		this.reloadSearch = this.reloadSearch.bind(this)
	}

	state = {
		lastValues: undefined,
		results: undefined,
		groupOptions: [],
		error: undefined,
		visibleEdit: false,
		visibleDelete: false,
		visibleCreateTestplan: false,
		editProjectId: undefined,
		loading: true
	}

	componentDidMount() {
		const { user } = this.props
		getGroupsDropdown(user.id).then((result) => {
			let { success, groups } = result
			if (success) {
				this.setState({ groupOptions: groups, loading: false })
			}
		})
	}

	handleSubmit(values) {
		searchProjects(values).then((result) => {
			let { success, projects } = result
			if (success) {
				this.setState({ results: projects, lastValues: values })
			}
		})
	}

	reloadSearch() {
		const { lastValues } = this.state
		if (lastValues !== undefined) {
			searchProjects(lastValues).then((result) => {
				let { success, projects } = result
				if (success) {
					this.setState({ results: projects })
				}
			})
		}
	}

	groupResultsByGroup() {
		const { results } = this.state
		let groupedResults = {}
		results.forEach(function (r) {
			if (!Object.keys(groupedResults).includes(r.group)) {
				Object.defineProperty(groupedResults, r.group, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: []
				})
			}
			groupedResults[r.group].push(r)
		})
		return groupedResults
	}

	showResults() {
		const { results } = this.state

		const editHandle = (function (id) {
			this.setState({ visibleEdit: true, editProjectId: id })
		}).bind(this)

		const deleteHandle = (function (id) {
			this.setState({ visibleDelete: true, editProjectId: id })
		}).bind(this)

		if (results !== undefined) {
			let groupedResults = this.groupResultsByGroup()
			let listSections = []

			Object.keys(groupedResults).forEach(function (e) {
				listSections.push(
					<Divider key={e + 'Divider'} orientation="left" style={{ alignItems: 'center' }}>
						<Avatar className={groupedResults[e][0].defaultAvatar + ' divider-list-avatar'} size={{ xs: 20, sm: 20, md: 20, lg: 20, xl: 20, xxl: 20 }}></Avatar>
						<Text className='divider-list-title'>{e}</Text>
					</Divider>
				)

				listSections.push(
					<List
						key={e + 'List'}
						size="small"
						pagination={{
							size: "small",
							pageSize: 20
						}}
						dataSource={groupedResults[e]}
						bordered={false}
						renderItem={item => (
							<List.Item
								key={item.key}
								span={4}
								actions={[
									<Tooltip key={`edit-${item.key}`} title="Modificar proyecto" color="#108ee9">
										<EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { editHandle(item.id) }} />
									</Tooltip>,
									<Tooltip key={`delete-${item.key}`} title="Eliminar proyecto" color="#108ee9">
										<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff" }} onClick={() => { deleteHandle(item.id) }} />
									</Tooltip>
								]}
								className={'list-item project'}
								style={{ background: "#fff" }}
							>
								<List.Item.Meta
									title={item.name}
								/>
								{item.testplanCount} planes de pruebas
							</List.Item>
						)}
					/>
				)

			}
			)

			return (
				<>
					<div className="search-results">
						{listSections}
					</div>
				</>
			)
		}
	}

	render() {
		const { groupOptions, visibleEdit, visibleDelete, editProjectId, loading } = this.state
		const { Option } = Select
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
				<Row>
					<Col span={7}>
						<Form {...layout}
							name="projectSearch"
							layout="vertical"
							style={{ marginBlockStart: "1%" }}
							onFinish={this.handleSubmit}
						>
							<Row>
								<Col span={24}>
									<Form.Item
										label="Nombre"
										name="projectName"
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Grupos"
										name="projectGroups"
										rules={[{ required: true, message: 'Seleccione al menos un grupo.' }]}
									>
										<Select
											mode="multiple"
											allowClear
											style={{ width: '100%' }}
											placeholder="Seleccione uno o más grupos"
										>
											{groupOptions.map(i => <Option key={i.key}>{i.name}</Option>)}
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
						{this.showResults()}
					</Col>
				</Row>
				{(visibleEdit) ? (
					<ProjectEdit
						projectId={editProjectId}
						visibleEdit={visibleEdit}
						closeEdit={(() => { this.setState({ visibleEdit: false }) }).bind(this)}
						reloadSearch={this.reloadSearch}
					/>
				) : (
					<></>
				)}
				{(visibleDelete) ? (
					<ProjectDelete
						projectId={editProjectId}
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

export default withRouter(ProjectSearchPane);