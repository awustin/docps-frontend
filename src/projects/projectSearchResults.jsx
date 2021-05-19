import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    Table,
    Space,
} from 'antd';
import { 
  DeleteTwoTone,
  EditTwoTone,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class ProjectSearchResults extends React.Component {
    constructor(props) {
      super(props)
    }

    buildResultTable() {
      const { resultList } = this.props

      const columns = [
        {
          title: 'Nombre',
          dataIndex: 'name'
        },
        {
          title: 'Grupo',
          dataIndex: 'group',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.group.localeCompare(b.group)
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space>
              <Link to={{ pathname: "/projects/id?"+record.id, "projectId": record.id }}><EditTwoTone fontSize={19} /></Link>
              <DeleteTwoTone />
            </Space>
          ),
        },
      ]

      if(resultList !== undefined || resultList.length() !== 0) 
      {
        return <Table columns={columns} dataSource={resultList}/>
      }

    }

    render() {
        const { Title } = Typography;
        return(            
            <>
            <div className="project-search-results">
                <Title level={4}>Resultados</Title>
                {this.buildResultTable()}
            </div>
            </>
        );
    }
}

export default hot(module)(ProjectSearchResults);