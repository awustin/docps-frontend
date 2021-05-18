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

class ProjectForm extends React.Component {
    constructor(props) {
      super(props)
      this.clearForm = this.clearForm.bind(this)
    }

    clearForm(){
        alert('Limpiar formulario')
    }

    render() {
        const { Title } = Typography;
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
                <Breadcrumb.Item>Crear</Breadcrumb.Item>
            </Breadcrumb>
            <div className="project-form-container" style={{margin: "50px"}}>
                <Title level={3}>Crear proyecto</Title>
                <Divider dashed></Divider>
                <Form {...layout}
                    name="projectForm"
                    layout="horizontal"
                >
                    <Form.Item 
                        label="Nombre"
                        name="projectName"
                        rules={[{ required: true, message: 'El nombre del proyecto está vacío.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Grupo"
                        name="projectGroup"
                        rules={[{ required: true, message: 'Seleccione un grupo.' }]}
                    >
                        <Select>
                            <Select.Option value="Pumas">Pumas</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Guardar</Button>
                        <Button htmlType="button" onClick={this.clearForm} style={{ margin: '0 8px' }}>Cancelar</Button>
                    </Form.Item>
                </Form>
            </div>
            </>
        );
    }
}

export default hot(module)(ProjectForm);