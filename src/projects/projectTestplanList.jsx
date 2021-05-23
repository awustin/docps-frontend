import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    List,
    Avatar,
    Tag,
    Button,
    Skeleton
} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

class ProjectTestplanList extends React.Component {
    constructor(props){
        super(props)
        this.statusTag = this.statusTag.bind(this)
    }
    state = {
        testplanList: []
    }

    componentDidMount() {
        let list = []
        let statuses = ['Not executed','In progress','Passed','Failed']
        for (let index = 0; index < 21; index++) {
            list.push({
                title: 'TEST-' + index,
                key: index + 1,
                dateModified: '15/04/2021',
                status: statuses[Math.floor(Math.random() * statuses.length)]
            })                        
        }
        this.setState({ testplanList: list })
    }
    statusTag(status) {
        switch(status)
        {
            case 'Not executed':
                return <Tag color="#999997">No ejecutado</Tag>
            case 'In progress':
                return <Tag color="#ebcf52">En progreso</Tag>
            case 'Passed':
                return <Tag color="#09de8c">Pasó</Tag>
            case 'Failed':
                return <Tag color="#f50">Falló</Tag>
        }
    }

    render() {
        const { testplanList } = this.state
        const { Title } = Typography
        return(
            <>
            <Title level={4}>Planes de pruebas</Title>
            <List
                size="small"
                pagination={{
                    pageSize: 10
                    }}
                dataSource={testplanList}
                bordered={true}
                renderItem={item => (
                    <List.Item
                        key={item.key}
                        extra={<>
                            {this.statusTag(item.status)}
                        </>}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={'Última modificación: ' + item.dateModified}
                            />
                    </List.Item>
            )}
        />
            </>
        );
    }
}

export default hot(module)(ProjectTestplanList);