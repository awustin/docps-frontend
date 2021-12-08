import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Space, Typography } from 'antd';
import React from 'react';
import { withRouter } from "react-router";

class TestcaseSteps extends React.Component {
    constructor(props) {
        super(props)
        this.displaySteps = this.displaySteps.bind(this)
        this.onNewStepClick = this.onNewStepClick.bind(this)
    }

    displaySteps() {
        const { steps } = this.props
        let stepList = []
        for (let index = 0; index < steps.length; index++) {
            let step = steps[index]
            stepList.push(
                // <Step
                //     key={index}
                //     step={step}
                //     editStep={editStep}
                //     deleteStep={deleteStep}
                //     variablesOperations={variablesOperations}
                // />
            )
        }
        return stepList
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
        const { addStep, testcase } = this.props
        const { Title } = Typography
        return (
            <>
                <div>
                    <Row style={{ flexDirection: "column" }}>
                        <Title level={4} className="modal-title-label">Agregar un paso existente</Title>
                        {/* <StepSearch
                            testcase={testcase}
                            addStep={addStep}
                        /> */}
                    </Row>
                    <Row style={{ marginBlock: "1% 1%" }}>
                        <Col>
                            <Title level={4} className="modal-title-label">Crear un paso</Title>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                        <Form name="steps_form"
                            layout="inline"
                            onFinish={(e) => { this.onNewStepClick(e) }}
                            style={{ alignItems: "center", width: "100%" }}
                        >
                            <Col span={8}>
                                <Form.Item name="action"
                                    rules={[{ required: true, message: "Debe ingresar una acción" }]}
                                >
                                    <Input.TextArea placeholder="Acción" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="data">
                                    <Input.TextArea placeholder="Datos" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="result">
                                    <Input.TextArea placeholder="Resultado esperado" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    <Button style={{ alignItems: "center", borderRadius: "1em", width: "100%" }}
                                        type="primary"
                                        htmlType="submit"
                                        icon={<PlusCircleOutlined style={{ fontSize: "110%" }} />}
                                    >
                                        Crear paso
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Form>
                    </Row>
                    <Divider />
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Row style={{ paddingTop: "0%", paddingBottom: "0%" }} align="middle">
                            <Col flex="1 0 5%"></Col>
                            <Col flex="1 0 20%"><Title level={5}>Acción</Title></Col>
                            <Col flex="1 0 20%"><Title level={5}>Datos</Title></Col>
                            <Col flex="1 0 20%"><Title level={5}>Resultado</Title></Col>
                            <Col flex="1 0 5%"></Col>
                            <Col flex="1 0 5%"></Col>
                        </Row>
                        {this.displaySteps()}
                    </Space>
                </div>
            </>
        );
    }
}

export default withRouter(TestcaseSteps);