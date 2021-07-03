import React from 'react';
import {
    Row,
    Col,
    Tooltip,
    Descriptions,
} from 'antd';
import { withRouter } from "react-router";
import VariableEditPopup from './variableEditPopup';

class VariablesView extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const { variablesOperations, step } = this.props
        return(
            <>
                <Row 
                style={{ 
                    borderRadius: "0.8em",
                    display: "flex",
                    marginBlockStart: "1%",
                    paddingTop: "1%",
                    paddingBottom: "1%",
                    background: "#fdfdfd",
                    borderRadius: "0.8em",
                }}>
                    <Col flex="1 0 5%"></Col>
                    <Col flex="1 0 20%">
                        <Descriptions
                            column={1}
                            size="small"
                            labelStyle={{ fontSize: "85%" }}
                            contentStyle={{ fontSize: "85%" }}
                            >
                            <Descriptions.Item label="Nombre">{step.actionVariable.name}</Descriptions.Item>
                            <Descriptions.Item label="Valores">{step.actionVariable.values}</Descriptions.Item>
                        </Descriptions>
                        <VariableEditPopup 
                            variablesOperations={variablesOperations}
                            stepIndex={step.order}
                            variable={step.actionVariable}
                            field='action'
                        />
                    </Col>
                    <Col flex="1 0 20%">{step.dataVariable.name}<VariableEditPopup variablesOperations={variablesOperations} stepIndex={step.order} variable={step.dataVariable} field='data'/></Col>
                    <Col flex="1 0 20%">{step.resultVariable.name}<VariableEditPopup variablesOperations={variablesOperations} stepIndex={step.order} variable={step.resultVariable} field='result'/></Col>
                    <Col flex="1 0 5%"></Col>
                    <Col flex="1 0 5%"></Col>                  
                </Row>
            </>
        );
    }
}

export default withRouter(VariablesView);