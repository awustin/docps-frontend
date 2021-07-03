import React from 'react';
import {
    Descriptions,
} from 'antd';
import { withRouter } from "react-router";

class Variable extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const { variable } = this.props
        return(
            <>
            { (variable.values !== undefined) ? (
                <i style={{ fontSize: "85%" }}><b>{variable.name}</b>: {variable.values.join()}</i>
            ) : (
                <></>    
            )}
            </>
        );
    }
}

export default withRouter(Variable);