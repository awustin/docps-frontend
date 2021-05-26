import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    Divider,
    Form,
    Input,
    Button,    
    Select,
    Breadcrumb,
    DatePicker,
} from 'antd';
import TestplanSearchResults from './testplanSearchResults';

class TestplanSearch extends React.Component {
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getProjectList = this.getProjectList.bind(this)
      this.getTagList = this.getTagList.bind(this)
    }
    state = {
        projectListSearch: this.getProjectList(),
        tagListSearch: this.getTagList(),
        results: undefined,
        error: undefined
    }

    handleSubmit(values) { 
        //Query
        let results = []
        let statuses = ['Not executed','In progress','Passed','Failed']
        for (let index = 0; index < 21; index++) {
            results.push(
                {
                    key: "item"+index*2,
                    testplanId: index,
                    testplanName: "TESTPLAN-" + index,
                    description: "Este es un plan de pruebas",
                    tags: ["test","noche"],
                    createdOn: '10/02/2021',
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    projectId: index % 3,
                    projectName: "PROYECTO-" + index % 3,
                    groupId: index % 3,
                    groupName: "GRUPO-" + index % 3
                }
            )            
        }
        this.setState({ results: results })
    }

    getProjectList() {
        //Query
        let projectListSearch = []
        for (let index = 0; index < 5; index++) {
            projectListSearch.push(
                {
                    groupId: index % 2,
                    groupName: "GRUPO-" + index % 2,
                    projectId: index,
                    projectName: "PROYECTO-" + index,                   
                }
            )
        }
        return projectListSearch
    }

    getTagList() {
        //Query
        let tagListSearch = []
        for (let index = 0; index < 5; index++) {
            tagListSearch.push(
                {
                    tag: "TAG" + index
                }
            )
        }
        return tagListSearch
    }

    showResults() {
        const { results } = this.state
        const { setTestplan } = this.props
        if(results !== undefined)
        return (
            <>
            <Divider dashed/>
            <TestplanSearchResults resultList={results} setTestplan={setTestplan}/>
            </>
        )
    }

    render() {
        const { projectListSearch, tagListSearch } = this.state
        const { Title } = Typography
        const { Option } = Select
        const { RangePicker } = DatePicker
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        const tailLayout = {
          wrapperCol: { offset: 7, span: 12 },
        }
        return(            
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>
                <Breadcrumb.Item>Buscar</Breadcrumb.Item>
            </Breadcrumb>
            <div className="testplan-search-container" style={{margin: "50px"}}>
                <Title level={3}>Buscar planes de pruebas</Title>
                <Divider dashed></Divider>
                <Form {...layout}
                    name="testplanSearch"
                    layout="horizontal"
                    onFinish={this.handleSubmit}
                >
                    <Form.Item
                        label="Proyecto"
                        name="testplanProjects"
                        rules={[{ required: true, message: 'Seleccione uno o mas proyectos.' }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Seleccione uno o más proyectos"                        
                        >
                            {projectListSearch.map(item => (<Option key={`${item.groupId}-${item.projectId}`}>{item.groupName} / {item.projectName}</Option>))}
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
                        >
                            {tagListSearch.map(item => (<Option key={item.tag}>{item.tag}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Buscar</Button>
                    </Form.Item>
                </Form>
                {this.showResults()}
            </div>
            </>
        );
    }
}

export default hot(module)(TestplanSearch);