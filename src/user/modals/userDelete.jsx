import { withRouter } from "react-router";
import React from 'react';
import {
	deleteUserById,
} from '../../services/usersService';
import {
    Modal,
    Row,
    Col
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';

class UserDelete extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {
        const { userId, closeDelete, reloadSearch } = this.props
        deleteUserById(userId).then( (result) => {
					const { success } = result
					if(success)
					{	
						closeDelete()
						reloadSearch()
					}
				 })
    }

    render() {
        const { closeDelete, visibleDelete } = this.props
        
        return(
            <>
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
                        ¿Eliminar este usuario?
                        </Col>
                    </Row>
                </Modal>
            </>
        );
    }
}

export default withRouter(UserDelete);