import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Space, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCurrentUserInfoById } from '../services/usersService';

const { Text } = Typography;

const UserBadge = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const { user, setLoading } = props;

    useEffect(() => {
        setLoading(true)
        getCurrentUserInfoById({ id: user.id }).then(({ success, user }) => {
            if (success)
                setUserInfo(user);
            setLoading(false)
        })
    }, []);

    const showTagbyRole = () => {
        switch (user.role) {
            case 'admin':
                return <Tag color="volcano">Administrador del sistema</Tag>;
            case 'groupAdmin':
                return <Tag color="geekblue">Administrador de grupo</Tag>;
            case 'user':
                return <Tag color="blue">Usuario</Tag>;
        }
    }

    return (<>
        <div className="user-badge" >
            <Row gutter={16} style={{ height: "100%", marginBlock: "1em" }}>
                <Col flex="1 0 15%" style={{ textAlign: "center", alignSelf: "center" }}>
                    <Avatar className="default-avatar-1"
                        size={{ xs: 85, sm: 85, md: 85, lg: 100, xl: 120, xxl: 120 }}
                        icon={<AntDesignOutlined />}
                    />
                </Col>
                <Col flex="1 0 75%">
                    <Space direction="vertical">
                        <Text className="badge-name">{userInfo.completeName}</Text>
                        <Text >{userInfo.job}</Text>
                        <Text>{userInfo.email}</Text>
                        {showTagbyRole()}
                    </Space>
                </Col>
            </Row>
        </div>
    </>)
}

export default UserBadge;