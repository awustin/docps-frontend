import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, Space, TreeSelect, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getStepsDropdown, getTestcaseById, getTestcasesDropdown, getTestplansDropdown } from '../services/workspaceService';
import './steps.css';

const { Meta } = Card;
const { Text } = Typography;
const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0 }
}


export default function StepList(props) {
    const [steps, setSteps] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [treeValue, setTreeValue] = useState();
    const [form] = Form.useForm();
    const { id } = props;

    useEffect(() => {
        getTestplansDropdown(id).then((result) => {
            if (result.success)
                setTreeData(result.testplans)
        })
    }, []);

    useEffect(() => {
        getTestcaseById(id).then((result) => {
            if (result.success)
                setSteps(result.testcase.steps || []);
        });
    }, []);

    function addStep(values) {
        setSteps(oldSteps => [...oldSteps, {
            action: values.action,
            result: values.result,
            data: values.data,
            order: steps.length,
            actionVariable: {
                name: undefined,
                values: undefined
            },
            resultVariable: {
                name: undefined,
                values: undefined
            },
            dataVariable: {
                name: undefined,
                values: undefined
            }
        }]);
        form.resetFields();
    }

    function showSteps() {
        //with React Flow!!
        return <>
            {steps.map(s => <div key={s.order}>{s.action};{s.data};{s.result}</div>)}
        </>
    }

    return (<>
        <div className="steps-form">
            <Card className="card">
                <Meta
                    description={<>
                        <Text type="secondary">Puede buscar y seleccionar un paso desde otros casos de pruebas, desde la lista desplegable superior, o puede ingresar cualquier valor en Acción, Datos y Resultado. Luego presione <i>Insertar paso</i> para insertar el nuevo paso.</Text>
                        <Form {...layout}
                            form={form}
                            name="addStepForm"
                            layout="vertical"
                            onFinish={values => addStep(values)}
                            style={{ alignItems: "center", width: "100%", marginBlockStart: "2em" }}
                        >
                            <Form.Item
                                name="treeSearch"
                                label="Buscar un paso"
                            >
                                <TreeSelect
                                    treeDataSimpleMode
                                    placeholder="Seleccione para comenzar la búsqueda"
                                    value={treeValue}
                                    onChange={value => {
                                        let step = treeData.find(element => element.id === value)
                                        setTreeValue(value);
                                        form.setFieldsValue({
                                            action: step.action,
                                            data: step.data,
                                            result: step.result
                                        })
                                    }}
                                    loadData={(treeNode) => new Promise(resolve => {
                                        const { id, pId } = treeNode;
                                        if (!pId)
                                            getTestcasesDropdown(id).then((result) => {
                                                if (result.success)
                                                    setTreeData(treeData.concat(result.testcases));
                                            })
                                        else
                                            getStepsDropdown(id).then((result) => {
                                                if (result.success) {
                                                    if (result.success)
                                                        setTreeData(treeData.concat(result.steps));
                                                }
                                            })
                                        resolve();
                                    })}
                                    treeData={treeData}
                                />
                            </Form.Item>
                            <Divider orientation="left" />
                            <Form.Item
                                name="action"
                                label="Acción"
                                rules={[{ required: true, message: "Debe ingresar una acción" }]}
                            >
                                <Input autoComplete="off" placeholder="Acción" />
                            </Form.Item>
                            <Form.Item
                                name="data"
                                label="Datos"
                            >
                                <Input autoComplete="off" placeholder="Datos" />
                            </Form.Item>
                            <Form.Item
                                name="result"
                                label="Resultado"
                            >
                                <Input autoComplete="off" placeholder="Resultado esperado" />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<PlusCircleOutlined style={{ fontSize: "110%" }} />}
                                >
                                    Insertar paso
                                </Button>
                            </Form.Item>
                        </Form>
                    </>}
                />
            </Card>
        </div>
        <Space className="steps-flowchart" direction="vertical" style={{ width: "100%" }}>
            {showSteps()}
        </Space>
    </>);
}