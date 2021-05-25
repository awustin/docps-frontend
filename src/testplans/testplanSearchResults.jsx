import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    List,
    Avatar,
    Tag,
} from 'antd';
import { 
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class TestplanSearchResults extends React.Component {
    constructor(props) {
      super(props)
      this.statusTag = this.statusTag.bind(this)
      this.tags = this.tags.bind(this)
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

    tags(tags) {
    }

    buildResultList() {
      const { resultList } = this.props
      console.log(resultList)
      if(resultList !== undefined && resultList.lenght !== 0) 
        return (
            <List
                size="small"
                pagination={{
                    pageSize: 9
                    }}
                dataSource={resultList}
                bordered={false}
                renderItem={item => (
                    <List.Item
                        key={item.key}
                        span={4}
                        actions={[
                            item.tags.map( tag => <Tag>{tag}</Tag> ),
                            this.statusTag(item.status),
                            <Link to={{ pathname: "/testplans/" + item.id }} style={{color:"#000"}}><EditOutlined style={{ fontSize: '150%'}} /></Link>,
                            <DeleteOutlined style={{ fontSize: '150%', color: "#000"}} />
                        ]}
                        style={{background: "#fff"}}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.groupName + ' / ' + item.projectName}
                            />
                    </List.Item>
                )}
            />
            )

    }

    render() {
        const { Title } = Typography;
        return(            
            <>
            <div className="testplan-search-results">
                <Title level={4}>Resultados</Title>
                {this.buildResultList()}
            </div>
            </>
        );
    }
}

export default hot(module)(TestplanSearchResults);