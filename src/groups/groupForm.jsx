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

export default class GroupForm extends React.Component {
    constructor(props) {
      super(props)
      this.clearForm = this.clearForm.bind(this)
    }

    clearForm(){
        alert('Limpiar formulario')
    }
    state = {
        memberItems: ['Marcos','Louis','Felipe'],
    }
    render() {
        const {memberItems} = this.state
        const { Title } = Typography;
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
                <Breadcrumb.Item>Grupos</Breadcrumb.Item>
                <Breadcrumb.Item>Crear</Breadcrumb.Item>
            </Breadcrumb>
            <div className="project-form-container" style={{margin: "50px"}}>
                <Title level={3}>Crear grupo</Title>
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
                        label="Miembros"
                        name="memberItems"
                        rules={[{ required: false, message: 'Seleccione uno o varios miembros.' }]}
                    >
                        <Select 
                            mode="multiple"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                </div>
                            )}                            
                        >
                            {memberItems.map(item => <Option key={item}>{item}</Option>)}
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

