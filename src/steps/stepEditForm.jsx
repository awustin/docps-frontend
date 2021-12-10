import { Button, Card, Form, Input, Select, Typography, Alert, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
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


export default function StepEditForm(props) {
    const [actionField, setActionField] = useState();
    const [dataField, setDataField] = useState();
    const [resultField, setResultField] = useState();
    const [editForm] = Form.useForm();
    const { current, editStep, success, close } = props;

    useEffect(() => {
        editForm.setFieldsValue({
            action: current.action,
            actionVariableName: current.actionVariable.name,
            actionVariableValues: current.actionVariable.values,
            data: current.data,
            dataVariableName: current.dataVariable.name,
            dataVariableValues: current.dataVariable.values,
            result: current.result,
            resultVariableName: current.resultVariable.name,
            resultVariableValues: current.resultVariable.values
        })
        setActionField(current.action);
        setDataField(current.data);
        setResultField(current.result);
    }, [current]);

    return (<>
        <Card className="steps-form-card">
            <Meta
                title={"Modificar paso"}
                description={<>
                    <Text type='secondary'>Puede modificar la Acción, Datos o Resultado del paso seleccionado; y agregar, modificar o eliminar una variable para cada campo.</Text>
                    <Form {...layout}
                        form={editForm}
                        name="editStepForm"
                        layout="vertical"
                        onFinish={(values) => {
                            values.order = current.order
                            editStep(values)
                        }}
                        style={{ alignItems: "center", width: "100%", marginBlockStart: "1em" }}
                    >
                        <Form.Item
                            name="action"
                            label="Acción"
                            rules={[{ required: true, message: "Debe ingresar una acción" }]}
                            onChange={e => setActionField(e.target.value)}
                        >
                            <Input placeholder="Acción" />
                        </Form.Item>
                        <Text type="secondary">Variable para el campo Acción</Text>
                        <Form.Item style={{ marginTop: "1em", marginBottom: 0 }}
                        >
                            <Form.Item
                                name="actionVariableName"
                                style={{ display: 'inline-block', width: 'calc(45% - 16px)' }}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (getFieldValue('actionVariableValues') && value ||
                                                !getFieldValue('actionVariableValues') && !value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Debe ingresar un valor en ambos campos'));
                                        },
                                    })
                                ]}
                                validateTrigger="onSubmit"
                            >
                                <Input placeholder="Nombre de la variable" disabled={!actionField} />
                            </Form.Item>
                            <Form.Item
                                name="actionVariableValues"
                                style={{ display: 'inline-block', width: 'calc(45% - 16px)', margin: '0 8px' }}
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
                                    placeholder="Valores"
                                    disabled={!actionField}
                                >
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(10% - 16px)', margin: '0 8px', fontSize: "120%" }}
                            >
                                <Tooltip title="Eliminar variable" color="#108ee9">
                                    <CloseCircleOutlined onClick={() => editForm.resetFields(['actionVariableName','actionVariableValues'])} />
                                </Tooltip>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            name="data"
                            label="Datos"
                            onChange={e => setDataField(e.target.value)}
                        >
                            <Input placeholder="Datos" />
                        </Form.Item>
                        <Text type="secondary">Variable para el campo Datos</Text>
                        <Form.Item style={{ marginTop: "1em", marginBottom: 0 }}
                        >
                            <Form.Item
                                name="dataVariableName"
                                style={{ display: 'inline-block', width: 'calc(45% - 16px)' }}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (getFieldValue('dataVariableValues') && value ||
                                                !getFieldValue('dataVariableValues') && !value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Debe ingresar un valor en ambos campos'));
                                        },
                                    })
                                ]}
                                validateTrigger="onSubmit"
                            >
                                <Input placeholder="Nombre de la variable" disabled={!dataField} />
                            </Form.Item>
                            <Form.Item
                                name="dataVariableValues"
                                style={{ display: 'inline-block', width: 'calc(45% - 16px)', margin: '0 8px' }}
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
                                    placeholder="Valores"
                                    disabled={!dataField}
                                >
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(10% - 16px)', margin: '0 8px', fontSize: "120%" }}
                            >
                                <Tooltip title="Eliminar variable" color="#108ee9">
                                    <CloseCircleOutlined onClick={() => editForm.resetFields(['dataVariableName','dataVariableValues'])} />
                                </Tooltip>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            name="result"
                            label="Resultado"
                            onChange={e => setResultField(e.target.value)}
                        >
                            <Input placeholder="Resultado esperado" />
                        </Form.Item>
                        <Text type="secondary">Variable para el campo Resultado</Text>
                        <Form.Item style={{ marginTop: "1em", marginBottom: 0 }}
                        >
                            <Form.Item
                                name="resultVariableName"
                                style={{ display: 'inline-block', width: 'calc(45% - 16px)' }}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (getFieldValue('resultVariableValues') && value ||
                                                !getFieldValue('resultVariableValues') && !value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Debe ingresar un valor en ambos campos'));
                                        },
                                    })
                                ]}
                                validateTrigger="onSubmit"
                            >
                                <Input placeholder="Nombre de la variable" disabled={!resultField} />
                            </Form.Item>
                            <Form.Item
                                name="resultVariableValues"
                                style={{ display: 'inline-block', width: 'calc(45% - 16px)', margin: '0 8px' }}
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
                                    placeholder="Valores"
                                    disabled={!resultField}
                                >
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(10% - 16px)', margin: '0 8px', fontSize: "120%" }}
                            >
                                <Tooltip title="Eliminar variable" color="#108ee9">
                                    <CloseCircleOutlined onClick={() => editForm.resetFields(['resultVariableName','resultVariableValues'])} />
                                </Tooltip>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Guardar cambios
                            </Button>
                            <Button
                                onClick={close}
                                style={{ marginLeft: "1em" }}>
                                Cancelar
                            </Button>
                        </Form.Item>
                        {(success) ?
                            <Alert className="success-message" message="Cambios guardados" type="success" showIcon />
                            : <></>
                        }
                    </Form>
                </>}
            />
        </Card>
    </>);
}