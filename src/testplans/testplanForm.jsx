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
import { 
PlusOutlined,
} from '@ant-design/icons';
import { withRouter } from "react-router";

class TestplanForm extends React.Component {
    constructor(props) {
      super(props)
      this.clearForm = this.clearForm.bind(this)
      this.onNewTagChange = this.onNewTagChange.bind(this)
      this.addItemTag = this.addItemTag.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {
        projectId: undefined,
        projectName: undefined,
        tagItems: ['pumas','regresiones','usuario'],
        newTag: ''
    }

    clearForm(){
        alert('Limpiar formulario')
    }

    componentDidMount(){
        if(Object.keys(this.props).includes("match"))
            this.setState({
                projectId: this.props.match.params.projectId,
                projectName: this.props.match.params.projectName
            })
    }

    componentDidUpdate() {
        const { projectId } = this.state
        if(this.props.location.pathname === '/testplans/create' && projectId !== undefined)
            this.setState({ 
                projectId: undefined, 
                projectName: undefined 
            })
    }

    onNewTagChange(e) {
        this.setState({ newTag: e.target.value })
    }

    addItemTag() {
        const { tagItems, newTag } = this.state;
        this.setState({
            tagItems: [...tagItems, newTag],
            newTag: '',
        });
    }

    handleSubmit(values) {
        const { projectId } = this.state
        let params = {
            testplanPorjectId: values.testplanProjectId || projectId,
            testplanName: values.testplanName,
            description: values.description,
            tags: values.tags            
        }
        // Query
    }

    render() {
        const { projectId, projectName, tagItems, newTag } = this.state
        const { Title } = Typography
        const { Option } = Select
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
                <Breadcrumb.Item>Planes de pruebas</Breadcrumb.Item>
                <Breadcrumb.Item>Crear</Breadcrumb.Item>
            </Breadcrumb>
            <div className="project-form-container" style={{margin: "50px"}}>
                <Title level={3}>Crear plan de pruebas</Title>
                <Divider dashed></Divider>
                <Form {...layout}
                    name="projectForm"
                    layout="horizontal"
                    onFinish={this.handleSubmit}
                >
                    {
                        (projectId === undefined) ? 
                            (
                                <Form.Item 
                                    label="Proyecto"
                                    name="testplanProjectId"
                                    rules={[{ required: true, message: 'Seleccione un proyecto.' }]}
                                >
                                    <Select>
                                        <Select.Option value="1">PROYECTO-01</Select.Option>
                                        <Select.Option value="2">PROYECTO-02</Select.Option>
                                    </Select>
                                </Form.Item>
                            ) : 
                            (
                                <Form.Item 
                                    label="Proyecto"
                                >
                                    {projectName}
                                </Form.Item>                        
                            )
                    }
                    <Form.Item 
                        label="Nombre"
                        name="testplanName"
                        rules={[{ required: true, message: 'El nombre del plan está vacío.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Descripcion"
                        name="description"
                    >
                        <Input.TextArea 
                            maxLength={500}
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Etiquetas"
                        name="tags"
                    >
                        <Select 
                            mode="tags"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={newTag} onChange={this.onNewTagChange} />
                                        <a
                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                            onClick={this.addItemTag}
                                        >
                                            <PlusOutlined /> Agregar etiqueta
                                        </a>
                                    </div>
                                </div>
                            )}                            
                        >
                            {tagItems.map(item => <Option key={item}>{item}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Crear</Button>
                        <Button htmlType="button" onClick={this.clearForm} style={{ margin: '0 8px' }}>Cancelar</Button>
                    </Form.Item>
                </Form>
            </div>
            </>
        );
    }
}

export default withRouter(TestplanForm);