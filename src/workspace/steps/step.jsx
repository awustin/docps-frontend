import React from 'react';
import {
    Row,
    Col,
    Typography,
    Tooltip,
    Popconfirm,
    message
} from 'antd';
import { withRouter } from "react-router";
import { 
    DeleteOutlined,
} from '@ant-design/icons';

class Step extends React.Component {
    constructor(props){
        super(props)
        this.onActionEdit = this.onActionEdit.bind(this)
        this.onDataEdit = this.onDataEdit.bind(this)
        this.onResultEdit = this.onResultEdit.bind(this)
        this.onStepDelete = this.onStepDelete.bind(this)
    }

    state = {
        action: this.props.step.action,
        data: this.props.step.data,
        result: this.props.step.result,
        order: this.props.step.order
    }

    componentDidMount() {
        const { step } = this.props
        this.setState({
            action: step.action,
            data: step.data,
            result: step.result,
            order: step.order
            })
    }

    onActionEdit(a) {
        const { editStep,step } = this.props
        if(a !== '')
            editStep('action', step.order, a)
    }

    onDataEdit(a) {
        const { editStep,step } = this.props
        editStep('data', step.order, a)
    }

    onResultEdit(a) {
        const { editStep,step } = this.props
        editStep('result', step.order, a)
    }

    onStepDelete() {
        const { deleteStep, step } = this.props
        deleteStep(step.order)
        message.success("Paso eliminado.")
    }

    render() {
        const { key, step } = this.props
        const { Paragraph } = Typography
        return(
            <Row key={key}
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
                <Col flex="1 0 20%">
                    <Paragraph style={{ marginBottom: "0px" }} editable={{ onChange: this.onActionEdit }}>{step.action}</Paragraph>
                </Col>
                <Col flex="1 0 20%">
                    <Paragraph style={{ marginBottom: "0px" }} editable={{ onChange: this.onDataEdit }}>{step.data}</Paragraph>
                </Col>
                <Col flex="1 0 20%">
                    <Paragraph style={{ marginBottom: "0px" }} editable={{ onChange: this.onResultEdit }}>{step.result}</Paragraph>
                </Col>
                <Col flex="1 0 5%">
                    <Tooltip title="Eliminar paso" color="#108ee9">
                        <Popconfirm
                            title="¿Eliminar este paso?"
                            placement="top"
                            onConfirm={this.onStepDelete}
                            okText="Eliminar"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{ fontSize: "120%" }}/>
                        </Popconfirm>
                    </Tooltip>
                </Col>
            </Row>
        );
    }
}

export default withRouter(Step);