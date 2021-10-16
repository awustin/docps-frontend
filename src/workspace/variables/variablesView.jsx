import React from 'react';
import {
    Row,
    Col,
    Space,
    Tooltip,
    Descriptions,
} from 'antd';
import { withRouter } from "react-router";
import VariableEditPopup from './variableEditPopup';
import Variable from './variable';

class VariablesView extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const { variablesOperations, step } = this.props
        return(
            <>
                <Row className="step-variable-row">
                    <Col flex="1 0 5%"></Col>
                    <Col flex="1 0 20%">
                        <Space>
                            <VariableEditPopup 
                                variablesOperations={variablesOperations}
                                stepIndex={step.order}
                                variable={step.actionVariable}
                                field='action'
                            />
                            <Variable
                                variable={step.actionVariable}
                            />
                        </Space>
                    </Col>
                    <Col flex="1 0 20%">
                        <Space>
                        <VariableEditPopup
                            variablesOperations={variablesOperations}
                            stepIndex={step.order}
                            variable={step.dataVariable}
                            field='data'
                        />
                        <Variable
                            variable={step.dataVariable}
                        />
                        </Space>
                    </Col>
                    <Col flex="1 0 20%">
                        <Space>
                        <VariableEditPopup
                            variablesOperations={variablesOperations}
                            stepIndex={step.order}
                            variable={step.resultVariable}
                            field='result'
                        />
                        <Variable
                            variable={step.resultVariable}
                        />
                        </Space>
                    </Col>
                    <Col flex="1 0 5%"></Col>
                    <Col flex="1 0 5%"></Col>                  
                </Row>
            </>
        );
    }
}

export default withRouter(VariablesView);