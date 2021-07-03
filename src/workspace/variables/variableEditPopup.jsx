import React from 'react';
import '../../CustomStyles.css';
import {
    Popover,
    Tooltip,
    Form,
    Input,
    Button,
    Select,
    Row,
    Col
} from 'antd';
import { withRouter } from "react-router";
import { 
    PlusOutlined,
    CloseOutlined,
    EditOutlined,
} from '@ant-design/icons';

class VariableEditPopup extends React.Component {
    constructor(props){
        super(props)
        this.showEditVariableContent = this.showEditVariableContent.bind(this)
        this.handleEditVariable = this.handleEditVariable.bind(this)
    }

    state = {
        popupVisible: false,
    }

    handleEditVariable(data) {
        const { variablesOperations, field, stepIndex } = this.props
        variablesOperations.addVariable(stepIndex,field,data)
        this.setState({ popupVisible: false })
    }

    showEditVariableContent() {
        const { variable } = this.props
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 18 },
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
                            {/*tagItems.map(item => <Option key={item}>{item}</Option>)*/}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Guardar</Button>
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
                >
                    { (!variable.name || !variable.values) ? (
                    <Tooltip title="Agregar variable" color="#108ee9">
                        <PlusOutlined style={{color:"#108ee9"}} onClick={()=>{this.setState({ popupVisible: true })}}/>
                    </Tooltip>
                    ) : (
                    <Tooltip title="Modificar variable" color="#108ee9">
                        <EditOutlined style={{color:"#108ee9"}} onClick={()=>{this.setState({ popupVisible: true })}}/>
                    </Tooltip>
                    )}
                </Popover>
            </>
        );
    }
}

export default withRouter(VariableEditPopup);