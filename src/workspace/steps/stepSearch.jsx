import React from 'react';
import {
    TreeSelect,
    Row,
    Col,
} from 'antd';
import { withRouter } from "react-router";

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
            const { id } = treeNode.props;
            setTimeout(() => {
              this.setState({
                treeData: this.state.treeData.concat([
                  this.genTreeNode(id, false),
                  this.genTreeNode(id, true),
                ]),
              });
              resolve();
            }, 300);
        });
    }
    
    genTreeNode = (parentId, isLeaf = false) => {
        const random = Math.random().toString(36).substring(2, 6);
        return {
            id: random,
            pId: parentId,
            value: random,
            title: isLeaf ? 'Tree Node' : 'Expand to load',
            isLeaf,
        };
    };

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