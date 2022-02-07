import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, Row, TreeSelect, Typography, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import MessageModal from '../common/messageModal';
import { getStepsDropdown, getTestcaseById, getTestcasesDropdown, getTestplansDropdown, saveSteps } from '../services/workspaceService';
import StepEditForm from './stepEditForm';
import './steps.css';
import StepsList from './stepsList';

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
    const [showEditStep, setShowEditStep] = useState(false);
    const [current, setCurrent] = useState({});
    const [editSuccess, setEditSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [form] = Form.useForm();
    const { id } = props;

    useEffect(() => {
        reloadTreeData();
    }, []);

    useEffect(() => {
        getTestcaseById(id).then((result) => {
            if (result.success)
                setSteps(result.testcase.steps || []);
        });
    }, []);

    const reloadTreeData = () => {
        getTestplansDropdown(id).then((result) => {
            if (result.success)
                setTreeData(result.testplans)
        })
    };

    const addStep = values => {
        setSteps(steps.concat({
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
        })
        );
        form.resetFields();
        reloadTreeData();
    }

    const editStep = values => {
        let updatedSteps = steps.map(elm => {
            if (elm.order === values.order) {
                let elmUpdate = elm;
                elmUpdate.action = values.action;
                elmUpdate.actionVariable = {
                    name: (values.action) ? values.actionVariableName : undefined,
                    values: (values.action) ? values.actionVariableValues : undefined
                };
                elmUpdate.data = values.data;
                elmUpdate.dataVariable = {
                    name: (values.data) ? values.dataVariableName : undefined,
                    values: (values.data) ? values.dataVariableValues : undefined
                };
                elmUpdate.result = values.result;
                elmUpdate.resultVariable = {
                    name: (values.result) ? values.resultVariableName : undefined,
                    values: (values.result) ? values.resultVariableValues : undefined
                }
                return elmUpdate
            }
            return elm
        })
        setSteps(updatedSteps)
        setEditSuccess(true)
        setTimeout(() => setEditSuccess(false), 1400)
    };

    const deleteStep = step => {
        let index = step.order;
        let updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        for (let index = 0; index < updatedSteps.length; index++) {
            updatedSteps[index].order = index
        }
        setCurrent({});
        setShowEditStep(false);
        setSteps(updatedSteps);
    };

    const saveCurrentSteps = () => {
        console.log({ id: id, steps: steps })
        setLoading(true);
        saveSteps({ id: id, steps: steps })
            .then((result) => {
                setLoading(false);
                if (result.success) {
                    setMessage({
                        type: 'success',
                        title: 'Pasos guardados',
                        description: 'Se guardaron los pasos y variables con éxito.'
                    });
                    setShowMessage(true);
                }
                else {
                    setMessage({
                        type: 'validate',
                        title: 'Error',
                        description: 'Hubo un error y no se guardaron los cambios.'
                    });
                    setShowMessage(true);
                }
            })
    }

    const showStepsList = () => <StepsList
        showEdit={(step) => {
            setCurrent(step)
            setShowEditStep(true)
        }}
        deleteStep={deleteStep}
        saveSteps={saveCurrentSteps}
        steps={steps}
    />;

    return (<>
        <Spin spinning={loading}>
            <Row>
                <Col span={14}>
                    {showStepsList()}
                </Col>
                <Col span={10}>
                    {(!showEditStep) ?
                        <Card className="steps-form-card">
                            <Meta
                                title={"Insertar un paso"}
                                description={<>
                                    <Text type="secondary">Puede buscar y seleccionar un paso desde otros casos de pruebas, desde la lista desplegable superior, o puede ingresar cualquier valor en Acción, Datos y Resultado. Luego presione <i>Insertar paso</i> para insertar el nuevo paso.</Text>
                                    <Form {...layout}
                                        form={form}
                                        name="addStepForm"
                                        layout="vertical"
                                        onFinish={values => addStep(values)}
                                        style={{ alignItems: "center", width: "100%", marginBlockStart: "1em" }}
                                    >
                                        <Form.Item
                                            name="treeSearch"
                                            label="Buscar un paso"
                                        >
                                            <TreeSelect
                                                treeDataSimpleMode
                                                placeholder="Seleccione para comenzar la búsqueda"
                                                onChange={value => {
                                                    const step = treeData.find(element => element.id === value)
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
                        :
                        <StepEditForm
                            current={current}
                            editStep={editStep}
                            success={editSuccess}
                            close={() => setShowEditStep(false)}
                        />
                    }
                </Col>
            </Row>
        </Spin>
        <MessageModal
            type={message.type}
            title={message.title}
            description={message.description}
            visible={showMessage}
            onClose={() => setShowMessage(false)}
        />
    </>);
}