import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    List,
    Space,
    Tag,
} from 'antd';
import { Link } from 'react-router-dom';


class ProjectSearchResults extends React.Component {
    constructor(props) {
      super(props)
    }

    buildResultList() {
      const { resultList } = this.props
      if(resultList !== undefined || resultList.length() !== 0) 
      {
        let list = []
        Object.entries(resultList).forEach(element => {
          list.push(
          <> 
            <List
              header={<div>{element[0]}</div>}
              bordered
              size={"small"}
              style={{margin: "0 0 10px", background: "#ffffff"}}
              dataSource={Object.entries(element[1])}
              renderItem={item => (
              <List.Item>
                <Space align="center">
                  <Link to={{ 
                      pathname: "/projects/id?" + item[1]
                  }}>
                    {item}
                  </Link>
                </Space>
              </List.Item>
            )}
            />
          </>
          )
        })
        return list
      }

    }

    render() {
        const { Title } = Typography;
        return(            
            <>
            <div className="project-search-results">
                <Title level={4}>Resultados</Title>
                {this.buildResultList()}
            </div>
            </>
        );
    }
}

export default hot(module)(ProjectSearchResults);