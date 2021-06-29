import React from 'react';
import {
    Row,
    Col,
    Typography,
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
    }

    state = {
        action: this.props.step.action,
        data: this.props.step.data,
        result: this.props.step.result
    }

    componentWillReceiveProps() {
        const { step } = this.props
        this.setState({
            action: step.action,
            data: step.data,
            result: step.result
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

    render() {
        const { key, step } = this.props
        const { action, data, result } = this.state
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
                    <Paragraph style={{ marginBottom: "0px" }} editable={{ onChange: this.onActionEdit }}>{action}</Paragraph>
                </Col>
                <Col flex="1 0 20%">
                    <Paragraph style={{ marginBottom: "0px" }} editable={{ onChange: this.onDataEdit }}>{data}</Paragraph>
                </Col>
                <Col flex="1 0 20%">
                    <Paragraph style={{ marginBottom: "0px" }} editable={{ onChange: this.onResultEdit }}>{result}</Paragraph>
                </Col>
                <Col flex="1 0 5%"><DeleteOutlined/></Col>
            </Row>
        );
    }
}

export default withRouter(Step);