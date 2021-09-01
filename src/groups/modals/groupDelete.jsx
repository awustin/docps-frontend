import { withRouter } from "react-router";
import React from 'react';
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

class GroupDelete extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
	state = {
		message: {
			def: '¿Desea eliminar este grupo?',
			hasActiveUsers: 'Este grupo contiene usuarios que están dados de alta, ¿desea eliminarlo de todas formas?',
			validate: {
				title:'No se eliminó el grupo',
				description:'Este grupo contiene proyectos, por lo que no se puede eliminar',
				type:'validate'
			}
		},
		hasActiveUsers: false,
		validDeletion: true
	}
	
	componentDidMount() {
		//Query para consultar si hay usuarios de alta (SI-> informar (non blocking warning))
		this.setState({ hasActiveUsers: true })	
	}

	handleSubmit(values) {
		const { groupId, closeDelete, reloadSearch } = this.props
		//Query para verificar que no tenga proyectos (SI-> denegar (blocking warning))
		let valid = false
		if(valid)
		{		
			//Query para eliminar el usuario
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
		const { message,hasActiveUsers,validDeletion } = this.state
        
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
                >
                    <Row>
                        <Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
                        <ExclamationCircleOutlined style={{color:"#ffc02e"}} />
                        </Col>
                        <Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
						{(hasActiveUsers)?(message.hasActiveUsers):(message.def)}
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

export default withRouter(GroupDelete);