import React from 'react';
import {
    TreeSelect,
    Row,
    Col,
} from 'antd';
import { withRouter } from "react-router";

function random() {
    return Math.random().toString(36).substring(2, 6)
}

class StepSearch extends React.Component {
    constructor(props){
        super(props)
        this.onLoadData = this.onLoadData.bind(this)
        this.getTestplanList = this.getTestplanList.bind(this)
    }

    state = {
        value: undefined,
        treeData: this.getTestplanList()
    }

    onLoadData(treeNode) {
        return new Promise( resolve => {
            const { id,pId } = treeNode.props;
            console.log(this.state.treeData)
            setTimeout(() => {
                if(!pId)
                {
                    //Fetch testcases
                    let testcases = this.getTestcaseList(id)
                    this.setState({
                        treeData: this.state.treeData.concat(testcases)                
                    });
                }
                else
                {
                    //Fetch steps
                    let steps = this.getStepList(id)
                    this.setState({
                        treeData: this.state.treeData.concat(steps),
                    });
                }
              resolve();
            }, 300);
        });
    }

    getStepList(testcaseId) {        
        //Query to fetch steps of testcase treeNode
        let list = []
        for (let index = 0; index < 3; index++) {
            let ran = random()
            list.push({
                id: 'step'+ran,
                pId: testcaseId,
                value: 'step'+ran,
                title: testcaseId + "-step-" + index,
                selectable: true,
                isLeaf: true
            })            
        }
        return list;
    }

    getTestcaseList(testplanId) {
        //Query to fetch testcases of testplan treeNode
        let list = []
        for (let index = 0; index < 3; index++) {            
            let ran = random()
            list.push({
                id: 'case'+ran,
                pId: testplanId,
                value: 'case'+ran,
                title: testplanId + "-Testcase-" + index,
                selectable: false
            })            
        }
        return list;
    }    

    getTestplanList() {
        //Query para la lista de los planes de prueba del mismo Grupo
        let list = []
        for (let index = 0; index < 10; index++) {
            list.push(
                {
                    id: index+1,
                    pId: 0,
                    value: index+1,
                    title: "Testplan-" + index,
                    selectable: false
                }
            )
        }
        return list
    }

    render() {
        const { treeData, value }  = this.state
        return(
            <>
            <div className="steps-search-container">
                <Row style={{ justifyContent: "center", marginBlock: "1% 1%" }}>
                    <Col span={24}>
                        <TreeSelect
                            treeDataSimpleMode
                            style={{ width: "100%" }}
                            placeholder="Seleccione para comenzar la búsqueda"
                            value={value}
                            loadData={this.onLoadData}
                            onChange={(a)=>{console.log(a);this.setState({value:a})}}
                            treeData={treeData}
                        />
                    </Col>
                </Row>
            </div>
            </>
        );
    }
}

export default withRouter(StepSearch);