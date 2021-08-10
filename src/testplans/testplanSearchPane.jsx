import { withRouter } from "react-router";
import React from 'react';
import '../CustomStyles.css';
import { Link } from 'react-router-dom';
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
		Typography
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
	//Query para traer los grupos a los q puede agregar planes
		this.setState({ groupOptions: [
			{key:0,name:'Pumas'},
			{key:1,name:'Águilas'},
			{key:2,name:'Pulpos'},
			{key:3,name:'Leones'}
			] 
		})	
	}

	handleSubmit(values) {
		//Query para buscar planes
		let results = []
		let statuses = ['Not executed','In progress','Passed','Failed']
		for (let index = 0; index < 21; index++) {
			results.push(
				{
					id: index*11+5,
					key: "testplan"+index*2,
					testplanId: index,
					testplanName: "DOCPS-" + index*11,
					description: "Este es un plan de pruebas",
					tags: ["test","etiqueta"],
					createdOn: '10/02/2021',
					status: statuses[Math.floor(Math.random() * statuses.length)],
					projectName: 'PROY99'
				}
			)            
		}			
		this.setState({ results: results, lastValues: values })
	}

	reloadSearch() {
		const { lastValues } = this.state
		if( lastValues !== undefined )
		{
			//Query para hacer la busqueda de planes con lastValues
			let results = []
			let statuses = ['Not executed','In progress','Passed','Failed']
			for (let index = 0; index < 21; index++) {
				results.push(
					{
						id: index*3+7,
						key: "testplan"+index*2,
						testplanId: index,
						testplanName: "MODIF-" + index*11,
						description: "Este es un plan de pruebas",
						tags: ["test","etiqueta"],
						createdOn: '10/02/2021',
						status: statuses[Math.floor(Math.random() * statuses.length)],
						projectName: 'PROY99'
					}
				)            
			}			
			this.setState({ results: results })
			}
	}
	
	getProjectOptions(groupId) {
	//Query para traer los proyectos elegibles del grupo elegido
		let list = []
		for (let index = 0; index < 5; index++) {
			list.push(
				{
					id: index,
					name: "G"+groupId+"PROY-" + index,                   
				}
		)
		}
		this.setState({ projectOptions: list })
	}
	
	getTagOptions() {
		//Query para traer etiquetas
		let list = []
		for (let index = 0; index < 5; index++) {
			list.push({
				tag: "TAG" + index
			})
		}
		this.setState({ tagOptions: list  })
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
									<Text key={item.key+'created'} type="secondary">{item.createdOn}</Text>,
                item.tags.map( tag => <Tag className={'hideable'} key={item.key+tag}>{tag}</Tag> ),
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
							<List.Item.Meta
									description=<div className={'list-item description'}>
										{'Proyecto: ' + item.projectName}
									</div>
								/>
									{item.testplanName}
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