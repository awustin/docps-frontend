import { withRouter } from "react-router";
import React from 'react';
import {
    Typography,
    Divider,
    Form,
    Input,
    Button,    
    Select,
    Breadcrumb,
    List,
    Tag,
    Avatar,
    Tooltip,
    Row,
    Col,
	Space,
	Alert
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    LeftCircleOutlined,
	DownloadOutlined,
	LoadingOutlined,
	CheckCircleTwoTone,
	WarningTwoTone
} from '@ant-design/icons';

const { Title, Text } = Typography

class TestplanExport extends React.Component {
    constructor(props) {
      super(props)
	  this.onExportClick = this.onExportClick.bind(this)
	  this.showExportPreview = this.showExportPreview.bind(this)
	  this.showExportOptions = this.showExportOptions.bind(this)
    }	
    state = {
		casesCount: undefined,
		loading: false,
		exportSuccess: undefined,
		exportFailure: undefined,
		numExported: undefined
    }
	
	componentDidMount() {
		const { testplan } = this.props
		//Query para contar la cantidad de casos de pruebas a exportar.
		let count = 150
		this.setState({ casesCount: count, exportSuccess: undefined, exportFailure: undefined })
	}
	
	onExportClick() {
		//Llamar al BE para generar el archivo e iniciar la descarga . devuelve el numero exportado
		this.setState({ loading: true })
		setTimeout(()=>this.setState({loading: false, exportSuccess: true, exportFailure: false, numExported: 12}),2000)
		//setTimeout(()=>this.setState({loading: false, exportSuccess: false, exportFailure: true, numExported: -1}),2000)
	}
	
	showExportPreview() {
		const { casesCount, loading, exportSuccess, exportFailure } = this.state
		if(loading)
		{
			return(<>
				<Text> </Text>
				<LoadingOutlined rotate={true} style={{ fontSize:"600%" }}/>
				<Text type="secondary">Generando...</Text>
			</>)			
		}
		if(exportSuccess)
		{
			return (
				<CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize:"500%" }}/>
			)
		}
		if(exportFailure)
		{
			return (
				<WarningTwoTone twoToneColor="#f56751" style={{ fontSize:"500%" }}/>
			)
		}
		return (
			<>
				<Text>Este plan de pruebas tiene</Text>
				<Text style={{ fontSize:"500%" }}>{casesCount}</Text>
				<Text>casos para exportar</Text>
			</>			
		)
	}
	
	showExportOptions() {
		const { casesCount, loading, exportSuccess, exportFailure, numExported } = this.state
		if(loading)
		{
			return(<>
				<Text> </Text>
				<Space>
					<Button type="primary" icon={<DownloadOutlined />} onClick={this.onExportClick} disabled={true}>Exportar</Button>
					<Button disabled={true}>Cancelar</Button>
				</Space>
			</>)			
		}
		if(exportSuccess)
		{
			return (
				<>				
				<Text style={{ fontSize:"120%", color:"#52c41a" }}>¡Exportado con éxito!</Text>				
				<Text style={{ fontSize:"105%" }}>Se exportaron <b>{numExported}</b> casos de prueba</Text>
				<Button onClick={this.props.history.goBack}>Finalizar</Button>
				</>
			)
		}
		if(exportFailure)
		{
			return (
				<>
				<Text style={{ fontSize:"120%", color:"#f56751" }}>Hubo un error al exportar los casos de pruebas</Text>				
				<Text style={{ fontSize:"105%" }}>Intente nuevamente más tarde</Text>
				<Button onClick={this.props.history.goBack}>Finalizar</Button>
				</>
			)
		}
		return (
			<>
				<Text>¿Generar archivo de casos de pruebas?</Text>
				<Space>
					<Button type="primary" icon={<DownloadOutlined />} onClick={this.onExportClick}>Exportar</Button>
					<Button  onClick={this.props.history.goBack}>Cancelar</Button>
				</Space>
			</>			
		)
	}

    render() {
        const { testplan } = this.props
		const { casesCount, loading } = this.state
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        const tailLayout = {
          wrapperCol: { offset: 7, span: 12 },
        }
        return(            
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>                
                <Breadcrumb.Item>{testplan.testplanId.toString()}</Breadcrumb.Item>
                <Breadcrumb.Item>Exportar</Breadcrumb.Item> 
            </Breadcrumb>
            <div className="export-preview-navigation" style={{margin: "50px"}}>
                <Row>
                    <Col>
                        <Tooltip title="Atrás">
                            <LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.goBack()}}/>
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div className="export-preview-container" style={{margin: "50px"}}>
                <Title level={3}>Exportar</Title>
                <Divider dashed></Divider>
				<Row style={{ alignItems: "center", flexFlow: "column", textAlign:"center"}}>
					{ (casesCount) ?
						<>
						<Col flex="1 0 20%" style={{ fontSize:"120%" }}>
							<Space direction="vertical">
								{this.showExportPreview()}
							</Space>
						</Col>
						<Col flex="1 0 20%" style={{ fontSize:"105%" }}>
							<Space direction="vertical" style={{ marginBlockStart: "20%" }}>
								{this.showExportOptions()}
							</Space>
						</Col>
						</>
						:
						<>
							<Col flex="1 0 20%" style={{ fontSize:"120%" }}>
								<Space direction="vertical">
									<WarningTwoTone twoToneColor="#edb54c" style={{ fontSize:"500%" }}/>
								</Space>
							</Col>
							<Col flex="1 0 20%" style={{ fontSize:"105%" }}>
								<Space direction="vertical" style={{ marginBlockStart: "20%" }}>
									<Text style={{ fontSize:"120%", color:"#edb54c" }}>No hay casos de prueba para exportar</Text>
									<Button onClick={this.props.history.goBack}>Atrás</Button>
								</Space>
							</Col>							
						</>
					}
				</Row>
            </div>
            </>
        );
    }
}

export default withRouter(TestplanExport);