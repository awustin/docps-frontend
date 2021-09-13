import { withRouter } from "react-router";
import React from 'react';
import '../CustomStyles.css';
import { Link } from 'react-router-dom';
import { searchTestplans, getTagsForTestplan } from '../services/testplansService';
import { getGroupsDropdown, getProjectsDropdown } from '../services/projectsService';
import { datePickerRangeConvert } from '../utils/format';
import {
    Divider,
    Form,
    Input,
    Button,    
    Select,
    List,
    Tag,
    Avatar,
    Tooltip,
    Row,
    Col,
    DatePicker,
		Typography,
		Space
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
		ExportOutlined,
		EyeOutlined
} from '@ant-design/icons';
import TestplanDelete from './modals/testplanDelete';

const { Text } = Typography;

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
		visibleEdit: false,
		editTestplanId: undefined,
	}
	
	componentDidMount() {
		const { user } = this.props
		getGroupsDropdown(user.id).then((result)=>{
			if(result.success) {
				this.setState({ groupOptions: result.groups })				
			}				
		})
	}

	handleSubmit(values) {
		values.createdOn = (values.createdOn) ? datePickerRangeConvert(values.createdOn) : undefined
		searchTestplans(values).then((result)=>{
			if(result.success) {
				this.setState({ results: result.testplans, lastValues: values })				
			}
		})
	}

	reloadSearch() {
		const { lastValues } = this.state
		if( lastValues !== undefined )
		{
			searchTestplans(lastValues).then((result)=>{
				if(result.success) {
					this.setState({ results: result.testplans })				
				}
			})
			}
	}
	
	getProjectOptions(groupId) {
		getProjectsDropdown(groupId).then((result)=>{
			if(result.success) {
				this.setState({ projectOptions: result.projects })				
			}				
		})
	}
	
	getTagOptions() {
		getTagsForTestplan().then((result)=>{
			if(result.success) {
				this.setState({ tagOptions: result.tags })				
			}				
		})
	}	

	showResults() {
		const { results, groups } = this.state

		const deleteHandle = (function(id) {
			this.setState({ visibleDelete: true, editTestplanId: id })
		}).bind(this)
		
		const statusTag = (function(status,key) {
			switch(status)
			{
				case 'Not executed':
						return <Tag key={key+'999997'} color="#999997">No ejecutado</Tag>
				case 'In progress':
						return <Tag key ={key+'ebcf52'} color="#ebcf52">En progreso</Tag>
				case 'Passed':
						return <Tag key={key+'09de8c'} color="#09de8c">Pasó</Tag>
				case 'Failed':
						return <Tag key={key+'f50'} color="#f50">Falló</Tag>
			}			
		}).bind(this)
		
		let list;

		if(results !== undefined) {
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
                statusTag(item.status,item.key),									
									<Tooltip title="Ver plan de pruebas" color="#108ee9">
										<Link to={{ pathname: "/testplans/id="+item.id }} style={{color:"#228cdbff"}}>
											<EyeOutlined style={{ fontSize: '150%', color: "#228cdbff"}} />
										</Link>
									</Tooltip>,
									<Tooltip title="Eliminar plan de pruebas" color="#108ee9">
										<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff"}} onClick={()=>{deleteHandle(item.id)}}/>
									</Tooltip>,
									<Tooltip title="Exportar" color="#108ee9">
										<Link to={{ pathname: "/testplans/export" }} style={{color:"#000"}}>
											<ExportOutlined style={{ fontSize: '150%'}} onClick={() => alert('Exportar')}/>
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
									<Text className={'date hideable'} key={item.key+'created'} type="secondary"><i>{item.createdOn}</i></Text>
								</div>								
							/>
							<Row gutter={16}>
								<Col>
									{item.testplanName}
								</Col>
								<Col>
									{item.tags.map( tag => <Tag className={'tags hideable'} key={item.key+tag}>{tag}</Tag> )}
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
		const { groupOptions, projectOptions, tagOptions, visibleEdit, visibleDelete, editTestplanId } = this.state
		const { Option } = Select
		const { RangePicker } = DatePicker
		const layout = {
			labelCol: { span: 18 },
			wrapperCol: { span: 20 },
		}
		const tailLayout = {
			wrapperCol: { span: 12 },
		}
		return(            
			<>
			<Row>
				<Col span={7}>
				<Form {...layout}
					name="testplanSearch"
					layout="vertical"
					style={{ marginBlockStart:"1%" }}
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
																onChange={id=>this.getProjectOptions(id)}
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
                        >
                            {projectOptions.map(item => (<Option key={item.id}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="Nombre"
                        name="testplanName"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Fecha de creación"
                        name="createdOn"
                    >
                        <RangePicker/>
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
					<Divider type="vertical" style={{ height:"100%" }} dashed/>
				</Col>
				<Col span={16}>
				{this.showResults()}
				</Col>
			</Row>
			{ (visibleEdit) ? (
			'Edit'
			) : (
			<></>
			)}
			{ (visibleDelete) ? (
				<TestplanDelete
					testplanId={editTestplanId}
					visibleDelete={visibleDelete}
					closeDelete={(()=>{this.setState({ visibleDelete: false })}).bind(this)}
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