import React from 'react';
import {
    Space,
    Button,
    Typography,
    Form,
    Input,
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
                <Row style={{ marginBlockStart: "5%", justifyContent: "flex-end" }}>
                    <Col style={{  marginRight: "16px"  }} span={12}>
                        <Input/>
                    </Col>
                    <Col style={{ marginLeft: "23px" }}>
                        <Button style={{ alignItems: "center", borderRadius: "1em" }} 
                                htmlType="submit"
                                icon={<SearchOutlined style={{ fontSize: "110%" }}/>}    
                        >Buscar pasos
                        </Button>
                    </Col>
                </Row>
            </div>
            </>
        );
    }
}

export default withRouter(StepSearch);