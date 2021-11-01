import {
    CloseOutlined,
    EditOutlined, PlusOutlined
} from '@ant-design/icons';
import {
    Button, Col, Form,
    Input, message, Popconfirm, Popover, Row, Select, Tooltip
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import '../../CustomStyles.css';

class VariableEditPopup extends React.Component {
    constructor(props){
        super(props)
        this.showEditVariableContent = this.showEditVariableContent.bind(this)
        this.handleEditVariable = this.handleEditVariable.bind(this)
        this.handleDeleteVariable = this.handleDeleteVariable.bind(this)
    }

    state = {
        popupVisible: false,
    }

    handleEditVariable(data) {
        const { variablesOperations, field, stepIndex } = this.props
        variablesOperations.editVariable(stepIndex,field,data)
        this.setState({ popupVisible: false })
    }

    handleDeleteVariable() {
        const { variablesOperations, field, stepIndex } = this.props
        variablesOperations.deleteVariable(stepIndex,field)
        this.setState({ popupVisible: false })
        message.success("Variable eliminada.")
    }

    showEditVariableContent() {
        const { variable } = this.props
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 18 },
        }
        const tailLayout = {
          wrapperCol: { offset: 8, span: 18 },
        };
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
                        rules={[{ required: true, message: "Debe ingresar un nombre"}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Valores"
                        name="values"
                        initialValue={variable.values}
                        rules={[{ required: true, message: "Debe ingresar al menos un valor"}]}
                    >
                        <Select 
                            mode="tags"
                            dropdownRender={menu => (
                                <div>
                                    <i style={{ fontSize: "75%", marginLeft: "10px" }}>Agregar un valor y presionar Enter</i>
                                    {menu}
                                </div>
                            )}
                            notFoundContent={<></>}
                            placeholder="Escribir un valor"
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Guardar</Button>
                        <Popconfirm
                            title="¿Eliminar esta variable?"
                            placement="bottom"
                            onConfirm={this.handleDeleteVariable}
                            okText="Eliminar"
                            cancelText="No"
                        >
                            <Button 
                                style={{marginLeft:"2%"}}
                                disabled={(!variable.name && !variable.values)}
                            >
                                Eliminar
                            </Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </>
    }

    render() {
        const { popupVisible } = this.state
        const { variable } = this.props
        return(
            <>
                <Popover
                    placement="bottom"
                    title={
                        <Row>
                            <Col flex="1 0 50%">Modificar variable</Col>
                            <Col flex="1 0 50%" style={{textAlign: "end"}}>
                                <Tooltip title="Cerrar">
                                    <CloseOutlined onClick={ ()=>{this.setState({ popupVisible: false })}}/>
                                </Tooltip>
                            </Col>                          
                        </Row>
                    }
                    content={this.showEditVariableContent}
                    trigger="click"
                    visible={popupVisible}
                    destroyTooltipOnHide={true}
                >
                    { (!variable.name || !variable.values) ? (
                    <Tooltip title="Agregar variable" color="#108ee9">
                        <PlusOutlined style={{color:"#108ee9",fontSize:"120%"}} onClick={()=>{this.setState({ popupVisible: true })}}/>
                    </Tooltip>
                    ) : (
                    <>
                    <Tooltip title="Modificar variable" color="#108ee9">
                        <EditOutlined style={{color:"#108ee9",fontSize:"120%"}} onClick={()=>{this.setState({ popupVisible: true })}}/>
                    </Tooltip>
                    </>
                    )}
                </Popover>
            </>
        );
    }
}

export default withRouter(VariableEditPopup);