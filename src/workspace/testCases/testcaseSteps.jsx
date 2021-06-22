import React from 'react';
import {
    Space,
    Button,
    Card,
    Form,
    Input,
    Row,
    Col
} from 'antd';
import { withRouter } from "react-router";
import { 
    PlusCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
                <Card key={index}
                    style={{ 
                        borderRadius: "0.8em"
                    }}
                >
                    <Row>
                        <Col flex="1 0 33%">{step.action}</Col>
                        <Col flex="1 0 33%">{step.data}</Col>
                        <Col flex="1 0 33%">{step.result}</Col>
                    </Row>
                </Card>
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
    }

    render() {
        return(
            <>
            <div className="testcase-steps-container" style={{marginLeft: "30px"}}>
                <Space style={{ 
                    marginBlockEnd: "1%",
                    justifyContent:"center",
                    width: "100%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    background: "#fafafa",
                    borderRadius: "0.8em",                    
                    border: "solid",
                    borderWidth: "1px",
                    borderColor: "#cccccc"
                    }}
                >
                    <Form style={{ alignItems: "center", justifyContent: "space-between" }}
                    name="steps_form"
                    layout="inline"
                    onFinish={ (e) => {this.onNewStepClick(e)} }
                >
                    <Form.Item 
                        name="action"
                        rules={[{ required: true, message: "Debe ingresar una acción"}]}
                        style={{flex:"0 0 25%"}}
                    >
                        <Input.TextArea placeholder="Acción"/>
                    </Form.Item>
                    <Form.Item 
                        name="data"
                        style={{flex:"0 0 20%"}}
                    >
                        <Input.TextArea placeholder="Datos"/>
                    </Form.Item>
                    <Form.Item 
                        name="result"
                        style={{flex:"0 0 25%"}}
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
                </Space>
                <Space direction="vertical" style={{width: "100%"}}>
                    {this.displaySteps()}
                </Space>
            </div>
            </>
        );
    }
}

export default withRouter(TestcaseSteps);