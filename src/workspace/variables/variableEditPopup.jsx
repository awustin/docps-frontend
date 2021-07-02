import React from 'react';
import '../../CustomStyles.css';
import {
    Popover,
    Tooltip,
    Form,
    Input,
    Button,
    Typography
} from 'antd';
import { withRouter } from "react-router";
import { 
    PlusOutlined,
} from '@ant-design/icons';

class VariableEditPopup extends React.Component {
    constructor(props){
        super(props)
        this.showEditVariableContent = this.showEditVariableContent.bind(this)
        this.handleEditVariable = this.handleEditVariable.bind(this)

    }

    handleEditVariable(data) {
        const { variablesOperations, field, stepIndex } = this.props
        if(variablesOperations.addVariable != undefined)
        {
            variablesOperations.addVariable(stepIndex,field,data)
        }        
    }

    showEditVariableContent() {
        const { variable } = this.props
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }
        return <>
                <Form {...layout}
                    name="variableForm"
                    id="editVariableForm"
                    layout="horizontal"
                    onFinish={this.handleEditVariable}
                >
                    <Form.Item 
                        label="Nombre"
                        name="name"
                        initialValue={variable.name}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Valores"
                        name="values"
                        initialValue={variable.values}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Guardar</Button>
                    </Form.Item>
                </Form>
            </>
    }

    render() {
        return(
            <>
                <Popover
                    placement="bottom"
                    title="Agregar variable"
                    content={this.showEditVariableContent}
                    trigger="click"
                >
                    <Tooltip title="Agregar variable" color="#108ee9">
                        <PlusOutlined style={{color:"#108ee9"}}/>
                    </Tooltip>
                </Popover>
            </>
        );
    }
}

export default withRouter(VariableEditPopup);