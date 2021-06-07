import React from 'react';
import {
    Typography,
    Space,
    Divider,
    Button,
    Row,
    Col,
    Descriptions,
    Tag,
    Breadcrumb,
    List,
    Avatar,
    Tooltip,
    Card,
} from 'antd';
import { withRouter } from "react-router";
import { 
    EditOutlined,
    DeleteOutlined,
    ThunderboltOutlined,
    PlusCircleFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class TestcaseSetps extends React.Component {
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
                <Card key={index}>{step.action} {step.result} {step.data}</Card>
            )
        }
        return cardList
    }

    onNewStepClick() {
        const { addStep } = this.props
        addStep('values')
    }

    render() {
        const { Title,Text } = Typography
        const { Meta } = Card
        return(
            <>
            <div className="testcase-steps-container" style={{marginLeft: "30px"}}>
            <Space direction="vertical" style={{width: "100%"}}>
                {this.displaySteps()}
            </Space>
            <Button style={{display: "inline-flex", alignItems: "center", width: "100%", marginBlockStart: "1%"}} onClick={this.onNewStepClick}>
                <PlusCircleFilled style={{ color: "#b0b0b0", paddingTop: "1px"}}/>Agregar paso
            </Button>
            </div>
            </>
        );
    }
}

export default withRouter(TestcaseSetps);