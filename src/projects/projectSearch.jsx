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
  } from 'antd';
import ProjectSearchResults from './projectSearchResults';

class ProjectSearch extends React.Component {
    constructor(props) {
      super(props)
    }
    state = {
        results: {
            "GROUP A" : {
                "proyecto-00": 1,
                "PROYECTO-01": 2
            },
            "GROUP B" : {
                "DOCPS-Tests": 4,
                "Proyecto-de-prueba": 5
            }
        },
        error: undefined
    }
    showResults() {
        const { results } = this.state
        if(results !== undefined)
        return (
            <>
            <Divider dashed/>
            <ProjectSearchResults resultList={results}/>
            </>
        )
    }

    render() {
        const { Title } = Typography;
        const { Option } = Select;
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
                <Breadcrumb.Item>Proyectos</Breadcrumb.Item>
                <Breadcrumb.Item>Buscar</Breadcrumb.Item>
            </Breadcrumb>
            <div className="project-search-container" style={{margin: "50px"}}>
                <Title level={3}>Buscar proyectos</Title>
                <Divider dashed></Divider>
                <Form {...layout}
                    name="projectSearch"
                    layout="horizontal"
                >
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
                        >
                            <Option key="Pumas">Pumas</Option>
                            <Option key="Leones">Leones</Option>
                            <Option key="Águilas">Águilas</Option>
                            <Option key="Tiburones">Tiburones</Option>
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

export default hot(module)(ProjectSearch);