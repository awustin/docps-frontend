import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, TreeSelect } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { getStepsDropdown, getTestcasesDropdown, getTestplansDropdown } from '../../services/workspaceService';

function random() {
	return Math.random().toString(36).substring(2, 6)
}

class StepSearch extends React.Component {
	constructor(props) {
		super(props)
		this.onLoadData = this.onLoadData.bind(this)
		this.getTestplanList = this.getTestplanList.bind(this)
		this.onChangeValue = this.onChangeValue.bind(this)
		this.onInsertStepClick = this.onInsertStepClick.bind(this)
	}

	state = {
		value: undefined,
		testplanValue: undefined,
		testcaseValue: undefined,
		treeData: undefined,
		step: undefined
	}

	componentDidMount() {
		const { testcase } = this.props
		this.getTestplanList(testcase.id)
	}

	onLoadData(treeNode) {
		return new Promise(resolve => {
			const { id, pId } = treeNode.props;
			if (!pId) {
				this.getTestcaseList(id)
			}
			else {
				this.getStepList(id)
			}
			resolve();
		});
	}

	getStepList(testcaseId) {
		getStepsDropdown(testcaseId).then((result) => {
			if (result.success) {
				this.setState({
					treeData: this.state.treeData.concat(result.steps),
					testcaseValue: { testcaseId: testcaseId }
				});
			}
		})
		let list = []
		for (let index = 0; index < 3; index++) {
			let ran = random()
			list.push({
				id: 'step' + ran,
				pId: testcaseId,
				value: 'step' + ran,
				title: 'step' + ran,
				selectable: true,
				isLeaf: true,
				action: 'Paso ' + 'step' + ran,
				data: 'Datos para utilizar',
				result: 'Se insertó un paso'
			})
		}
	}

	getTestcaseList(testplanId) {
		getTestcasesDropdown(testplanId).then((result) => {
			if (result.success) {
				this.setState({
					treeData: this.state.treeData.concat(result.testcases),
					testplanValue: { testplanId: testplanId }
				});
			}
		})
	}

	getTestplanList(id) {
		getTestplansDropdown(id).then((result) => {
			if (result.success) {
				this.setState({ treeData: result.testplans })
			}
		})
	}

	onChangeValue(value) {
		const { treeData } = this.state
		let step = undefined
		for (let index = treeData.length - 1; index >= 0; index--) {
			const item = treeData[index]
			if (item['id'] === value) {
				step = {
					action: item['action'],
					data: item['data'],
					result: item['result']
				}
				break
			}
		}
		this.setState({ value: value, step: step })
	}

	onInsertStepClick() {
		const { addStep } = this.props
		const { step } = this.state
		//Query to fetch variables for step?
		addStep(step)
	}

	render() {
		const { treeData, value } = this.state
		return (
			<>
				<div className="steps-search-container">
					<Row style={{ justifyContent: "center", marginBlock: "1% 1%" }}>
						<Col span={20}>
							<TreeSelect
								treeDataSimpleMode
								style={{ width: "97%" }}
								placeholder="Seleccione para comenzar la búsqueda"
								value={value}
								loadData={this.onLoadData}
								onChange={this.onChangeValue}
								treeData={treeData}
							/>
						</Col>
						<Col span={4}>
							<Button style={{ alignItems: "center", borderRadius: "1em" }}
								icon={<PlusCircleOutlined style={{ fontSize: "110%" }} />}
								disabled={!value}
								onClick={this.onInsertStepClick}
							>Agregar paso
							</Button>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default withRouter(StepSearch);