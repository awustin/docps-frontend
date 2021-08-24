import { hot } from 'react-hot-loader';
import React from 'react';
import { validateUsername } from '../utils/format';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8 , span: 16 },
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }

  state = {
    usr: '',
    pwd: '',
    isValid: true,
    errorMessage: '',
  };

  onFinish(values){
    if(validateUsername(values.username)) {
      const { logIn } = this.props;
      logIn({ username: values.username, password: values.password })
      this.setState({ usr:values.username, pwd:values.password, errorMessage: '' })
    }
    else 
      this.setState({ isValid: false, errorMessage: 'El usuario solo puede tener caracteres alfanuméricos.' })
  };

  render() {
    const { errorMessage } = this.state 
    return (
      <div>
        <Form
          {...layout}
          name="login"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Nombre de usuario"
            name="username"
            rules={[{ required: true, message: 'Usuario vacío' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Contraseña vacía' }]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary" 
              htmlType="submit"
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
        <div>{errorMessage}</div>
      </div>
    );
  }
}

export default hot(module)(SignInForm);
