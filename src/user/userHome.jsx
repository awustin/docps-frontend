import { withRouter } from "react-router";
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
		Card,
		Space
} from 'antd';
import {
    UserOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import UserBadge from './userBadge';
import CommonUserOptions from './commonUserOptions';
import AdminUserOptions from './adminUserOptions';

class UserHome extends React.Component {
    render() {
        const { user } = this.props
        const { Title, Text } = Typography
				console.log(user)
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
            </Breadcrumb>            
            <div className="user-view-container" style={{margin: "50px"}}>
								<UserBadge
										user={user}
								/>
								<CommonUserOptions/>
								{(user.isAdmin) ? 
									(
										<AdminUserOptions/>
									) : (<></>)
								}
            </div>
            </>
        );
    }
}

export default withRouter(UserHome);