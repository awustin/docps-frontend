import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Alert, Card, Popconfirm, Spin, Tag, Timeline, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import * as d from '../AppConsts.json';
import { createExecution, getExecutionsForTestcase, deleteExecutionById } from '../services/executionsService';
import './executions.css';
import ExecutionsEditForm from './executionsEditForm';

const { Meta } = Card;

const ExecutionsPreview = (props) => {
    const [executions, setExecutions] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [current, setCurrent] = useState({});
    const [loading, setLoading] = useState(false);
    const { id, user, reloadTestcase } = props;

    useEffect(() => {
        loadExecutions();
    }, []);

    const loadExecutions = () => {
        setLoading(true);
        getExecutionsForTestcase(id).then(result => {
            setExecutions(result.executions || [])
            setLoading(false)
        });
        reloadTestcase();
    };

    const addExecution = () => {
        createExecution({ id: id, user: user.id }).then(() => loadExecutions())
    };

    const onClickEdit = (execution) => {
        setCurrent(execution);
        setShowEdit(true);
    };

    const onDelete = (execution) => {
		deleteExecutionById(execution.id).then(() => loadExecutions())
    };

    return (<>
        <Spin spinning={loading}>
            <Card
                className="search-results__card"
                actions={[
                    <Tooltip key={`add-${id}`} title="Insertar ejecución" color="#108ee9">
                        <PlusCircleOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={addExecution} />
                    </Tooltip>
                ]}
            >
                <Meta
                    title="Ejecuciones"
                    description={<>
                        {((executions || []).length > 0) ?
                            <div className='executions-timeline'>
                                <Timeline>
                                    {executions.map((elm, i) => {
                                        return <>
                                            <Timeline.Item key={elm.key + i}>
                                                <div className='executions-timeline__row'>
                                                    <Tooltip title="Modificar ejecución" color="#108ee9">
                                                        <div className='executions-timeline__content' onClick={() => onClickEdit(elm)}>
                                                            <div className='executions-timeline__header'>
                                                                <Tag className={`status-tag ${d.statuses[elm.status].class}`}>{d.statuses[elm.status].label}</Tag>
                                                                <div className='date'>{elm.createdOn}</div>
                                                            </div>
                                                            <div className='commentary'>{(elm.commentary) ? elm.commentary : <i>No se ingresaron comentarios</i>}</div>
                                                        </div>
                                                    </Tooltip>
                                                    <div className='delete'>
                                                        <Tooltip placement='bottom' title="Eliminar ejecución" color="#108ee9">
                                                            <Popconfirm
                                                                title="¿Eliminar esta ejecución?"
                                                                placement="top"
                                                                onConfirm={() => onDelete(elm)}
                                                                okText="Eliminar"
                                                                cancelText="No"
                                                            >
                                                                <CloseCircleOutlined style={{ fontSize: "130%" }} />
                                                            </Popconfirm>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </Timeline.Item>
                                        </>
                                    })}
                                </Timeline>
                            </div>
                            :
                            <Alert
                                message="No hay ejecuciones aún"
                                description={<p>Agregue ejecuciones desde el botón <i>Insertar ejecución</i> inferior.</p>}
                                type="info"
                                showIcon
                                closable={false}
                            />
                        }
                    </>}
                />
            </Card>
        </Spin>
        {(current.id) ?
            <ExecutionsEditForm
                visible={showEdit}
                execution={current}
                close={() => {
                    loadExecutions();
                    setShowEdit(false);
                }}
            /> : <></>
        }
    </>)
};

export default ExecutionsPreview;