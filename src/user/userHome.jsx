import {
    Breadcrumb
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import AdminUserOptions from './adminUserOptions';
import CommonUserOptions from './commonUserOptions';
import UserBadge from './userBadge';

class UserHome extends React.Component {
    render() {
        const { user } = this.props
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
            </Breadcrumb>            
            <div className="container">
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