import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    List,
    Avatar,
    Tag,
	Tooltip
} from 'antd';
import { 
    EditOutlined,
    DeleteOutlined,
	ExportOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class TestplanSearchResults extends React.Component {
    constructor(props) {
      super(props)
      this.statusTag = this.statusTag.bind(this)
      this.handleEditTestplanClick = this.handleEditTestplanClick.bind(this)
    }
    
    statusTag(status,itemKey) {
        switch(status)
        {
            case 'Not executed':
                return <Tag key={itemKey+'999997'} color="#999997">No ejecutado</Tag>
            case 'In progress':
                return <Tag key ={itemKey+'ebcf52'} color="#ebcf52">En progreso</Tag>
            case 'Passed':
                return <Tag key={itemKey+'09de8c'} color="#09de8c">Pasó</Tag>
            case 'Failed':
                return <Tag key={itemKey+'f50'} color="#f50">Falló</Tag>
        }
    }

    handleEditTestplanClick(item) {
        const { setTestplan } = this.props
        setTestplan(item)
    }

    buildResultList() {
      const { resultList } = this.props
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
                            item.tags.map( tag => <Tag key={item.key+tag}>{tag}</Tag> ),
                            this.statusTag(item.status,item.key),
                            <Tooltip title="Modificar plan de pruebas" color="#108ee9">
								<Link to={{ pathname: "/testplans/id=" + item.testplanId }} style={{color:"#000"}}>
									<EditOutlined style={{ fontSize: '150%'}} onClick={() => this.handleEditTestplanClick(item)}/>
								</Link>
							</Tooltip>,
                            <Tooltip title="Eliminar plan de pruebas" color="#108ee9">
								<DeleteOutlined style={{ fontSize: '150%', color: "#000"}} />
							</Tooltip>,
                            <Tooltip title="Exportar" color="#108ee9">
								<Link to={{ pathname: "/testplans/export" }} style={{color:"#000"}}>
									<ExportOutlined style={{ fontSize: '150%'}} onClick={() => this.handleEditTestplanClick(item)}/>
								</Link>
							</Tooltip>
                        ]}
                        style={{background: "#fff"}}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.testplanName}</a>}
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