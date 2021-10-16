import { withRouter } from "react-router";
import React from 'react';
import '../CustomStyles.css';
import { datePickerRangeConvert } from '../utils/format';
import { searchUsers } from '../services/usersService';
import {
    Divider,
    Form,
    Input,
    Button,    
    Select,
    DatePicker,
    List,
    Tag,
    Avatar,
    Tooltip,
    Row,
    Col,
		Space,
		Typography,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import UserEdit from './modals/userEdit';
import UserDelete from './modals/userDelete';

const { Text }  = Typography

class UserSearchPane extends React.Component {
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.showResults = this.showResults.bind(this)
      this.statusTag = this.statusTag.bind(this)
      this.reloadSearch = this.reloadSearch.bind(this)
    }
    state = {
        lastValues: undefined,
        statusOptions: [
            {
                value:'inactive',
                name:'Inactivo'
            },
            {
                value:'active',
                name:'Activo'
            },
            {
                value:'any',
                name:'Todos'
            }
        ],
        results: undefined,
        error: undefined,
        visibleEdit: false,
        visibleDelete: false,
        editUserId: undefined
    }

    handleSubmit(values) {
				values.createdOn = (values.createdOn) ? datePickerRangeConvert(values.createdOn) : undefined
				searchUsers(values).then((result)=>{
					let { success, users } = result
					if(success)
					{
						this.setState({ results: users, lastValues: values })						
					}
				})
    }

    reloadSearch() {
        const { lastValues } = this.state
        if( lastValues !== undefined )
        {
						searchUsers(lastValues).then((result)=>{
							let { success, users } = result
							if(success)
							{
								this.setState({ results: users })						
							}
						})
        }
    }
    
    statusTag(status,itemKey) {
        switch(status)
        {
            case 'active':
                return <Tag key={itemKey+'green'} color="green" onClick={()=>{console.log('Dar de baja')}}>Activo</Tag>
            case 'inactive':
                return <Tag key ={itemKey+'red'} color="volcano" onClick={()=>{console.log('Dar de alta')}}>Inactivo</Tag>
            default:
                break
        }
    }

    showResults() {
        const { results } = this.state
        if(results !== undefined)
        return (
            <>
            <div className="user-search-results">
                <List
                    size="small"
                    pagination={{
                        pageSize: 15
                        }}
                    dataSource={results}
                    bordered={false}
                    renderItem={item => (
                        <List.Item
                            key={item.key}
                            span={4}
                            actions={[
																<>
																{this.statusTag(item.status,item.key)}
																</>,
                                <Tooltip title="Modificar usuario" color="#108ee9">
                                    <EditOutlined style={{ fontSize: '150%', color: "#228cdbff"}} onClick={()=>{this.setState({ visibleEdit: true, editUserId: item.id })}}/>
                                </Tooltip>,
                                <Tooltip title="Eliminar usuario" color="#108ee9">
                                    <DeleteOutlined style={{ fontSize: '150%', color: "#228cdbff"}} onClick={()=>{this.setState({ visibleDelete: true, editUserId: item.id })}}/>
                                </Tooltip>
                            ]}
														className={'list-item'}
                            style={{ background: "#fff" }}
                        >
														<List.Item.Meta
															avatar={ (item.avatar) ? (
																				<Avatar src={item.avatar}/>
																			) : (
																				<Avatar className={"userdefavatar"+Math.floor(Math.random()*5)}/>
																			)}
														/>
													<Space direction="vertical" size={5} style={{ width:'100%' }}>
														<Row>
														<div className={'list-item description'}> 
																	<Text className={'date hideable'} key={item.key+'created'} type="secondary"><i> Fecha de creación: {item.createdOn}</i></Text>
																</div>	
																</Row>
														<Row gutter={16}>
															<Col>
																<Text className={'list-item-main-content'}>{item.name + ' ' + item.lastname}</Text>
															</Col>
															<Col>
																<Text className={'list-item-secondary-content'}>{item.email}</Text>
															</Col>
														</Row>
													</Space>
                        </List.Item>
                    )}
                />
            </div>
            </>
        )
    }

    render() {
        const { statusOptions, visibleEdit, visibleDelete, editUserId } = this.state
        const { Option } = Select
        const { RangePicker } = DatePicker
        const layout = {
            labelCol: { span: 18 },
            wrapperCol: { span: 20 },
        }
        const tailLayout = {
          wrapperCol: { span: 12 },
        }
        return(            
            <>
						<Row>
							<Col span={7}>
								<Form {...layout}
										name="userSearch"
										layout="vertical"
										style={{ marginBlockStart:"1%" }}
										onFinish={this.handleSubmit}
								>
									<Row>
										<Col span={24}>
											<Form.Item
													label="Nombre"
													name="name"
											>
													<Input/>
											</Form.Item>
											<Form.Item 
													label="Correo electrónico"
													name="email"
											>
													<Input/>
											</Form.Item>
											<Form.Item 
													label="Fecha de creación"
													name="createdOn"
											>
													<RangePicker/>
											</Form.Item>
											<Form.Item
													label="Estado"
													name="status"
													initialValue={statusOptions[2].value}
											>
													<Select>
															{statusOptions.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
													</Select>
											</Form.Item>
										</Col>
									</Row>
									<Row span={16}>
										<Form.Item {...tailLayout}>
												<Button type="primary" htmlType="submit">Buscar</Button>
										</Form.Item>
									</Row>
								</Form>
							</Col>
							<Col span={1}>
							<Divider type="vertical" style={{ height:"100%" }} dashed/>
							</Col>
							<Col span={16}>
                {this.showResults()}
							</Col>
						</Row>
            { (visibleEdit) ? (           
                <UserEdit
                    userId={editUserId}
                    visibleEdit={visibleEdit}
                    closeEdit={(()=>{this.setState({ visibleEdit: false })})}
                    reloadSearch={this.reloadSearch}
                />
            ) : (
                <></>
            )}
            { (visibleDelete) ? (           
                <UserDelete
                    userId={editUserId}
                    visibleDelete={visibleDelete}
                    closeDelete={(()=>{this.setState({ visibleDelete: false })})}
                    reloadSearch={this.reloadSearch}
                />
            ) : (
                <></>
            )}
            </>
        );
    }
}

export default withRouter(UserSearchPane);