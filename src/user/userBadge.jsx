import { withRouter } from "react-router";
import React from 'react';
import {
	getCurrentUserInfoById,
} from '../services/usersService';
import { 
    Row,
    Col,
    Space,
    Typography,
    Avatar,
		Tag
} from 'antd';
import {
    AntDesignOutlined,
} from '@ant-design/icons';

class UserBadge extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        userInfo: {
            id: undefined,
            completeName: undefined,
            email: undefined,
            username: undefined,
            job: undefined,
            avatar: undefined,
            isAdmin: undefined
        }
    }

    componentDidMount() {
        const { user } = this.props
        getCurrentUserInfoById(user.id).then( (result) => {
					const { success, user } = result
					if(success)
						this.setState({ userInfo: user })
				 })
    }

    render() {
        const { userInfo } = this.state
        const { Title, Text } = Typography
        return(
            <>         
            <div className="user-badge" style={{margin: "50px"}}>
                <Row style={{ height:"100%" }}>
                    <Col flex="1 0 15%" style={{textAlign:"center",alignSelf:"center"}}>
                        <Avatar className="default-avatar-1"
                            size={{ xs: 85, sm: 85, md: 85, lg: 100, xl: 120, xxl: 120 }}
                            icon={<AntDesignOutlined/>}
                        />
                    </Col>
                    <Col flex="1 0 75%">
                        <Space direction="vertical">
                            <Text className="badge-name">{userInfo.completeName}</Text>
                            <Text >{userInfo.job}</Text>
                            <Text>{userInfo.email}</Text>
															{(userInfo.isAdmin)?(<Tag color="volcano">Administrador del sistema</Tag>):(<></>)}
                        </Space>
                    </Col>
                </Row>                
            </div>
            </>
        );
    }
}

export default withRouter(UserBadge);