import { hot } from 'react-hot-loader';
import React from 'react';
import { Box } from 'rebass';
import TextInput from '../common/textInput';
import ButtonInput from '../common/buttonInput';
import { validateUsername } from '../utils/validate';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.childSetUsername = this.childSetUsername.bind(this);
    this.childSetPassword = this.childSetPassword.bind(this);
    this.userLogIn = this.userLogIn.bind(this);
  }

  state = {
    usr: '',
    pwd: '',
    isValid: true,
    errorMessage: '',
  };

  userLogIn() {
    const { usr, pwd } = this.state;
    const { logIn } = this.props;
    logIn({ username: usr, password: pwd });
  }

  childSetUsername(childValue) {
    const isValid = validateUsername(childValue);
    let errorMessage;

    if (!isValid) {
      errorMessage = 'Invalid username !';
    }
    this.setState({ usr: childValue, isValid, errorMessage });
  }

  childSetPassword(childValue) {
    this.setState({ pwd: childValue });
  }

  render() {
    const { isValid, errorMessage } = this.state;
    return (      
      <div>
        <Box
          p={1}
          sx={{
            color: 'bluish'
          }}
        >
          <TextInput
            type="text"
            placeholder="Nombre de usuario"
            handleTextIn={this.childSetUsername}
          />
          <TextInput
            type="password"
            placeholder="Contraseña"
            handleTextIn={this.childSetPassword}
          />
        </Box>
        <div>
          <ButtonInput
            enabled={isValid}
            value="Log in!"
            handleClick={this.userLogIn}
          />
        </div>
        <div>
          {errorMessage}
        </div>
      </div>
    );
  }
}

export default hot(module)(SignInForm);
