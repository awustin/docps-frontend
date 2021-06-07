import React from 'react';
import {
    Typography,
    Space,
    Button,
    Card,
} from 'antd';
import { withRouter } from "react-router";
import { 
    PlusCircleOutlined
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
        const { Paragraph } = Typography
        return(
            <>
            <div className="testcase-steps-container" style={{marginLeft: "30px"}}>
            <Space direction="vertical" style={{width: "100%"}}>
                {this.displaySteps()}
            </Space>
            <Button style={{display: "inline-flex", alignItems: "center", width: "100%", height:"75px", marginBlockStart: "1%"}} 
                    onClick={this.onNewStepClick}
                    icon={<PlusCircleOutlined style={{ fontSize: "110%" }}/>}    
            >Agregar paso
            </Button>
            </div>
            </>
        );
    }
}

export default withRouter(TestcaseSetps);