import { withRouter } from "react-router";
import React from 'react';
import '../CustomStyles.css';
import {
    Divider,
    Form,
    Input,
    Button,    
    Select,
    DatePicker,
    List,
    Tag,
    Avatar,
    Tooltip,
    Row,
    Col,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import ProjectEdit from './modals/projectEdit';
import ProjectDelete from './modals/projectDelete';

class ProjectSearchPane extends React.Component {
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.showResults = this.showResults.bind(this)
      this.reloadSearch = this.reloadSearch.bind(this)
			this.selectGroupsHandle = this.selectGroupsHandle.bind(this)
    }

    state = {
			lastValues: undefined,
			results: undefined,
			groupOptions: [],
			error: undefined,
			visibleEdit: false,
			visibleDelete: false,
			visibleCreateTestplan: false,
			editProjectId: undefined
    }

    handleSubmit(values) {
        //Query para buscar proyectos
        let results = []
        let groups = ['Pumas','Leones','Aguilas','Tiburones']
				for (let g = 0; g < groups.length; g++) {
					for (let index = 0; index < 10; index++) {
							results.push(
									{
											key: "project"+(g*10+index),
											id: (g*10+index)*10,
											createdOn: (index+1) +'/02/2021',
											name: 'G'+g+'P'+index+" Proyecto",
											testplanCount: Math.floor(Math.random() * 30),
											group: groups[g]
									}
							)
					}					
				}				
        this.setState({ results: results, lastValues: values })
    }

    reloadSearch() {
			const { lastValues } = this.state
			if( lastValues !== undefined )
			{
        //Query para hacer la busqueda de proyectos con lastValues
        let results = []
        let groups = ['Pumas','Leones','Aguilas','Tiburones']
				for (let g = 0; g < groups.length; g++) {
					for (let index = 0; index < 4; index++) {
							results.push(
									{
											key: "project"+(g*10+index),
											id: (g*10+index)*10,
											createdOn: (index+1) +'/02/2021',
											name: 'G'+g+'P'+index+" Proyecto modificado",
											testplanCount: Math.floor(Math.random() * 30),
											group: groups[g]
									}
							)
					}					
				}
        this.setState({ results: results, groups: groups })
			}
    }
		
		selectGroupsHandle() {
			//Query para traer los grupos elegibles
		this.setState({ groupOptions: [
			{key:0,name:'Pumas'},
			{key:1,name:'Águilas'},
			{key:2,name:'Pulpos'},
			{key:3,name:'Leones'}
		] })
		}

		groupResultsByGroup() {
      const { results } = this.state
			let groupedResults = {}
			results.forEach( function(r) {
				if( !Object.keys(groupedResults).includes(r.group) ) {
					Object.defineProperty(groupedResults,r.group,{
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
			const { results, groups } = this.state
			
			const editHandle = (function(id) {
				this.setState({ visibleEdit: true, editProjectId: id })
			}).bind(this)
			
			const deleteHandle = (function(id) {
				this.setState({ visibleDelete: true, editProjectId: id })
			}).bind(this)
			
			if(results !== undefined) {
				let groupedResults = this.groupResultsByGroup()
				let listSections = []
				
				Object.keys(groupedResults).forEach( function(e) {
						listSections.push(
							<Divider key={e+'Divider'} orientation="left">
								{e}
							</Divider>
						)
						
						listSections.push(
							<List
								key={e+'List'}
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
													<Tooltip title="Modificar proyecto" color="#108ee9">
															<EditOutlined style={{ fontSize: '150%', color: "#228cdbff"}} onClick={()=>{editHandle(item.id)}}/>
													</Tooltip>,
													<Tooltip title="Eliminar proyecto" color="#108ee9">
															<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff"}} onClick={()=>{deleteHandle(item.id)}}/>
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
        const { groupOptions, visibleEdit, visibleDelete, editProjectId } = this.state
        const { Option } = Select
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
										name="projectSearch"
										layout="vertical"
										style={{ marginBlockStart:"1%" }}
										onFinish={this.handleSubmit}
								>
									<Row>
										<Col span={24}>
											<Form.Item
													label="Nombre"
													name="projectName"
											>
													<Input/>
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
															onDropdownVisibleChange={this.selectGroupsHandle}
													>
														{groupOptions.map(i=><Option key={i.key}>{i.name}</Option>)}
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
                <ProjectEdit
										projectId={editProjectId}
										visibleEdit={visibleEdit}
										closeEdit={(()=>{this.setState({ visibleEdit: false })}).bind(this)}
										reloadSearch={this.reloadSearch}
                />
            ) : (
                <></>
            )}
            { (visibleDelete) ? (
                <ProjectDelete
										projectId={editProjectId}
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

export default withRouter(ProjectSearchPane);