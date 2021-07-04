import React from 'react';
import {
    Descriptions,
} from 'antd';
import { withRouter } from "react-router";

class Variable extends React.Component {
    constructor(props){
        super(props)
        this.maxCharRender = this.maxCharRender.bind(this)
    }

    maxCharRender(str) {
        return (str.length <= 20) ? str : str.substring(0,20)+'...'
    }

    render() {
        const { variable } = this.props
        //recortar string max caracteres
        return(
            <>
            { (variable.values !== undefined) ? (
                <i style={{ fontSize: "85%"}}><b>{variable.name}</b>: {this.maxCharRender(variable.values.join(', '))}</i>
            ) : (
                <></>    
            )}
            </>
        );
    }
}

export default withRouter(Variable);