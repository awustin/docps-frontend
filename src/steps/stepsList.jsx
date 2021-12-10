import { CloseCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Popconfirm, Tooltip, Typography } from 'antd';
import React from 'react';
import './steps.css';

const { Meta } = Card;
const { Text } = Typography;

const StepsList = (props) => {
    const { steps, showEdit, deleteStep, saveSteps } = props;

    const handleClick = (step) => {
        showEdit(step)
    }

    const onDelete = (step) => {
        deleteStep(step)
    }

    const onSave = () => {
        saveSteps();
    }

    return (<>
        <div className='step-list'>
            {
                ((steps || []).length > 0) ?
                    <Card className='step-list__card'>
                        <Meta
                            title={"Pasos"}
                            description={
                                <>
                                    {steps.map(s => <>
                                        <div className='step-list__row'>
                                            <Tooltip title="Modificar paso" color="#108ee9">
                                                <div key={s.order} className='step-list__item' onClick={() => handleClick(s)}>
                                                    <div className='description'>
                                                        <div className='indicator'>{s.order + 1}</div>
                                                        <div className='section action'>
                                                            <h5 className='header'>Acción</h5>
                                                            <div className='text'>{s.action}</div>
                                                        </div>
                                                        <div className='section data'>
                                                            <h5 className='header'>Datos</h5>
                                                            <div className='text'>{(s.data) ? s.data : '-'}</div>
                                                        </div>
                                                        <div className='section result'>
                                                            <h5 className='header'>Resultados</h5>
                                                            <div className='text'>{(s.result) ? s.result : '-'}</div>
                                                        </div>
                                                    </div>
                                                    {(s.actionVariable.name || s.dataVariable.name || s.resultVariable) ?
                                                        <div className='variables'>
                                                            <div className='indicator'>&nbsp;&nbsp;&nbsp;</div>
                                                            <div className='section action'>
                                                                <div className='text'>
                                                                    <b>{(s.actionVariable.name) ? s.actionVariable.name + ':' : ''}</b>{(s.actionVariable.values || []).join(', ')}
                                                                </div>
                                                            </div>
                                                            <div className='section data'>
                                                                <div className='text'>
                                                                    <b>{(s.dataVariable.name) ? s.dataVariable.name + ':' : ''}</b>{(s.dataVariable.values || []).join(', ')}
                                                                </div>
                                                            </div>
                                                            <div className='section result'>
                                                                <div className='text'>
                                                                    <b>{(s.resultVariable.name) ? s.resultVariable.name + ':' : ''}</b>{(s.resultVariable.values || []).join(', ')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            </Tooltip>
                                            <div className='delete'>
                                                <Tooltip placement='bottom' title="Eliminar paso" color="#108ee9">
                                                    <Popconfirm
                                                        title="¿Eliminar este paso?"
                                                        placement="top"
                                                        onConfirm={() => onDelete(s)}
                                                        okText="Eliminar"
                                                        cancelText="No"
                                                    >
                                                        <CloseCircleOutlined style={{ fontSize: "130%" }} />
                                                    </Popconfirm>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </>)
                                    }
                                    <Button type="primary" onClick={onSave}>Guardar cambios</Button>
                                </>
                            }
                        />
                    </Card>
                    :
                    <Card>
                        <Meta
                            description={<>
                                <Alert
                                    message="Agregue pasos a este caso de prueba"
                                    description={<p>Desde la sección <i>Insertar un paso</i> en panel de la derecha.</p>}
                                    type="info"
                                    showIcon
                                    closable={false}
                                />
                                <Button type="primary" onClick={onSave} style={{ marginBlock: "1em" }}>Guardar cambios</Button>
                            </>}
                        />
                    </Card>
            }
        </div>
    </>)
}

export default StepsList;