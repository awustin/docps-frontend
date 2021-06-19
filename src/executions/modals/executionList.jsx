import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Button,
    Modal,
    Card,
    Space,
    Tag,
    Row,
    Col,
    Divider,
} from 'antd';
import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
} from '@ant-design/icons';

const { Meta } = Card

class ExecutionList extends React.Component {
    constructor(props){
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.showExecutionList = this.showExecutionList.bind(this)
        this.statusTag = this.statusTag.bind(this)
    }
    state = {
        confirmLoading: false
    }

    setConfirmLoading(value) {
        this.setState({ confirmLoading: value })
    }
    
    handleOk(values) {
        const { isModalVisible } = this.props
        this.setConfirmLoading(true);
        //close
        isModalVisible(false);
        this.setConfirmLoading(false);
    }

    showExecutionList() {
        const { list } = this.props
        let renderItems = []
        list.forEach(item => {
            renderItems.push(
                <Card className="execution-card" 
                    style={{ borderRadius: "0.5em", margin: 15 }} 
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                    key={'card-' + item.key}
                >
                    <Row style={{display: "flex", alignItems: "center", marginBottom: 15}}>
                        <Col flex="1 0 25%" style={{ textAlign: "center" }}>
                        {this.statusTag(item.status)}
                        </Col>
                        <Col flex="1 0 75%" style={{ textAlign: "justify" }}>
                        <div>{item.commentary}</div>
                        </Col>
                    </Row>
                    <Meta description={"Fecha de creación: " + item.createdOn}/>
                </Card>
            )
        });
        return(renderItems)
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
        const { visible } = this.props
        const { confirmLoading } = this.state
        return(
            <> 
            <Modal
                title="Ejecuciones"
                visible={visible}
                confirmLoading={confirmLoading}
                destroyOnClose={true}
                width={700}
                closable={false}
                footer={[<Button key="close" onClick={this.handleOk}>Cerrar</Button>]}
            >
                <div className="execution-list-container"  style={{margin: "10px"}}>
                    {this.showExecutionList()}
                </div>
            </Modal>
            </>
        );
    }
}

export default hot(module)(ExecutionList);