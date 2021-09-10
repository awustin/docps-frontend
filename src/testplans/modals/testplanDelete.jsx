import { withRouter } from "react-router";
import React from 'react';
import { deleteTestplan } from '../../services/testplansService';
import {
    Modal,
    Row,
    Col,
	Alert,
	Button
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';

class TestplanDelete extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
	state = {
		message: {
			def: '¿Desea eliminar este plan de pruebas?',
			validate: {
				title:'No se eliminó el plan de pruebas',
				description:'Este plan contiene casos de prueba, por lo que no se puede eliminar',
				type:'validate'
			}
		},
		validDeletion: true
	}

	handleSubmit(values) {
		const { testplanId, closeDelete, reloadSearch } = this.props
			//Query para eliminar el plan de prueba
		deleteTestplan(testplanId).then((result)=>{
			if(result.success) {
				closeDelete()
				reloadSearch()				
			}
			else {				
				this.setState({ validDeletion: false })
			}
		})
		let valid = true
		if(valid)
		{		
				closeDelete()
				reloadSearch()				
		}
		else
		{
			this.setState({ validDeletion: false })
		}
	}

    render() {
			const { closeDelete, visibleDelete } = this.props
			const { message,validDeletion } = this.state

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

export default withRouter(TestplanDelete);