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
    InsertRowLeftOutlined,
} from '@ant-design/icons';
import VariablesView from '../variables/variablesView';

class Step extends React.Component {
    constructor(props){
        super(props)
        this.onActionEdit = this.onActionEdit.bind(this)
        this.onDataEdit = this.onDataEdit.bind(this)
        this.onResultEdit = this.onResultEdit.bind(this)
        this.onStepDelete = this.onStepDelete.bind(this)
        this.onShowVariablesClick = this.onShowVariablesClick.bind(this)
    }

    state = {
        action: this.props.step.action,
        data: this.props.step.data,
        result: this.props.step.result,
        order: this.props.step.order,
        showVariables: false
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

    onShowVariablesClick() {
        const { showVariables } = this.state
        this.setState({ showVariables: !showVariables })
    }

    render() {
        const { showVariables } = this.state
        const { key, step, variablesOperations } = this.props
        const { Paragraph } = Typography
        return(
            <>
            <Row key={key} className="step-row" align="middle">
                <Col flex="1 0 5%" style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
											<div className="step-number-label">
                    {step.order+1}
											</div>
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
                    <Tooltip title="Variables" color="#108ee9">
                        <InsertRowLeftOutlined style={{ fontSize: "120%" }} onClick={this.onShowVariablesClick}/>
                    </Tooltip>
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
            { (showVariables) ?
                <VariablesView
                    variablesOperations={variablesOperations}
                    step={step}
                />
                :
                <></>
            }
            </>       
        );
    }
}

export default withRouter(Step);