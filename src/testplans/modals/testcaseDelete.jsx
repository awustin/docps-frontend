import {
	ExclamationCircleOutlined
} from '@ant-design/icons';
import {
	Col, Modal,
	Row
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import MessageModal from '../../common/messageModal';
import { deleteTestcase } from '../../services/workspaceService';

class TestcaseDelete extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
	state = {
		message: {
			def: '¿Desea eliminar este caso de prueba?',
			validate: {
				title:'No se eliminó el caso de prueba',
				description:'Este caso de prueba contiene ejecuciones, por lo que no se puede eliminar',
				type:'validate'
			}
		},
		validDeletion: true
	}

	handleSubmit(values) {
		const { testcaseId, closeDelete, reloadSearch } = this.props
		deleteTestcase(testcaseId).then((result)=>{
			if(result.success) {
				closeDelete()
				reloadSearch()				
			}
			else {				
				this.setState({ validDeletion: false })
			}
		})
	}

	render() {
		const { closeDelete, visibleDelete } = this.props
		const { message, validDeletion } = this.state

		return(
			<>
			{ (validDeletion) ? (
					<Modal
							visible={visibleDelete}
							closable={false}
							width={400}
							onOk={this.handleSubmit}
							onCancel={closeDelete}
							okText="Eliminar"
							cancelText="Cancelar"
							destroyOnClose
					>
						<Row>
							<Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
								<ExclamationCircleOutlined style={{color:"#ffc02e"}} />
							</Col>
							<Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
								{message.def}
							</Col>
						</Row>
					</Modal>
			) 
			: 
			(
			<MessageModal								
				type={message.validate.type}
				title={message.validate.title}
				description={message.validate.description}
				visible={!validDeletion}
				onClose={closeDelete}
			/>
			)
			}				
			</>
		);
	}
}

export default withRouter(TestcaseDelete);