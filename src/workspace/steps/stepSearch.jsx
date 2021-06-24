import React from 'react';
import {
    Space,
    Button,
    Typography,
    Form,
    Input,
    AutoComplete,
    Row,
    Col,
} from 'antd';
import { withRouter } from "react-router";
import { 
    SearchOutlined
} from '@ant-design/icons';

class StepSearch extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <>
            <div className="steps-search-container">
                <Row style={{ justifyContent: "flex-start", marginBlock: "1% 1%" }}>
                    <Col span={20}>
                        <AutoComplete
                            style={{ width: "100%" }}
                            disabled={true}
                        />
                    </Col>
                </Row>
            </div>
            </>
        );
    }
}

export default withRouter(StepSearch);