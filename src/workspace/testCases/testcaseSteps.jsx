import React from 'react';
import {
    Space,
    Button,
    Typography,
    Form,
    Input,
    Row,
    Col,
    Divider
} from 'antd';
import { withRouter } from "react-router";
import { 
    PlusCircleOutlined
} from '@ant-design/icons';
import StepSearch from '../steps/stepSearch';

class TestcaseSteps extends React.Component {
    constructor(props){
        super(props)
        this.displaySteps = this.displaySteps.bind(this)
        this.onNewStepClick = this.onNewStepClick.bind(this)
    }

    displaySteps() {
        const { steps } = this.props
        let cardList = []
        for (let index = 0; index < steps.length; index++) {
            let step = steps[index]
            cardList.push(
                <Row key={index}
                    style={{ 
                        borderRadius: "0.8em",
                        display: "flex",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                        background: "#fafafa",
                        borderRadius: "0.8em",
                    }}
                    align="middle"
                >
                    <Col flex="1 0 10%"
                        style={{textAlign:"center"}}
                    >
                        {step.order+1}                    
                    </Col>
                    <Col flex="1 0 20%">{step.action}</Col>
                    <Col flex="1 0 20%">{step.data}</Col>
                    <Col flex="1 0 20%">{step.result}</Col>
                    <Col flex="1 0 10%">acciones</Col>
                </Row>
            )
        }
        return cardList
    }

    onNewStepClick(values) {
        const { addStep } = this.props
        addStep(values)
        document.getElementById("steps_form_action").value = ''
        document.getElementById("steps_form_data").value = ''
        document.getElementById("steps_form_result").value = ''
        document.getElementById("steps_form").reset()
    }

    render() {
        const { addStep } = this.props
        const { Title } = Typography
        return(
            <>
            <div className="testcase-steps-container" style={{marginLeft: "30px"}}>
                {/*<div id="steps-form-container" style={{ 
                    justifyContent:"center",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    background: "#fafafa",
                    borderRadius: "0.8em",                    
                    border: "solid",
                    borderWidth: "1px",
                    borderColor: "#cccccc"
                    }}
                >*/}
                    <Row style={{ marginBlock: "1% 1%" }}>
                        <Col>
                            <Title level={5}>Agregar un paso</Title>
                        </Col>
                    </Row>
                    <Row
                        style={{ justifyContent: "center" }}
                    >
                        <Form name="steps_form"
                            layout="inline"
                            onFinish={ (e) => {this.onNewStepClick(e)} }
                            style={{ alignItems: "center"}}
                        >
                            <Form.Item name="action"
                                rules={[{ required: true, message: "Debe ingresar una acción"}]}
                                style={{ flex:"1 0 20%" }}
                            >
                                <Input.TextArea placeholder="Acción"/>
                            </Form.Item>
                            <Form.Item name="data"
                                style={{ flex:"1 0 20%" }}
                            >
                                <Input.TextArea placeholder="Datos"/>
                            </Form.Item>
                            <Form.Item name="result"
                                style={{ flex:"1 0 20%" }}
                            >
                                <Input.TextArea placeholder="Resultado esperado"/>
                            </Form.Item>
                            <Form.Item 
                                    style={{flex:"auto"}}
                                >
                                    <Button style={{ alignItems: "center", borderRadius: "1em" }} 
                                            type="primary"
                                            htmlType="submit"
                                            icon={<PlusCircleOutlined style={{ fontSize: "110%" }}/>}    
                                    >Agregar paso
                                    </Button>
                                </Form.Item>
                        </Form>
                    </Row>
                    <Row style={{ marginBlock: "5% 1%" }}>
                        <Col>
                            <Title level={5}>Buscar un paso</Title>
                        </Col>
                    </Row>
                    <StepSearch
                        addStep = {addStep}
                    />
                <Divider/>
                <Space direction="vertical" style={{width: "100%"}}>
                    <Row style={{ 
                            paddingTop: "0%",
                            paddingBottom: "0%",
                        }}
                        align="middle"
                    >
                        <Col flex="1 0 10%"></Col>
                        <Col flex="1 0 20%"><Title level={5}>Acción</Title></Col>
                        <Col flex="1 0 20%"><Title level={5}>Datos</Title></Col>
                        <Col flex="1 0 20%"><Title level={5}>Resultado</Title></Col>
                        <Col flex="1 0 10%"></Col>
                    </Row>
                    {this.displaySteps()}
                </Space>
            </div>
            </>
        );
    }
}

export default withRouter(TestcaseSteps);