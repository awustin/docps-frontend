import { hot } from 'react-hot-loader';
import React from 'react';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
        username: "",
        password: ""
    };
    this.usernameInput = this.usernameInput.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
  }

  componentDidMount() {
  }
  
  usernameInput(event) {
    this.setState({username: event.target.value});
  }

  passwordInput(event) {
    this.setState({password: event.target.value});
  }
  
  render() {
    return (
      <div>
        <input id="username-input" value={this.state.username} onChange={this.usernameInput} placeholder="Enter username..."/>
        <input id="password-input" value={this.state.password} onChange={this.passwordInput}placeholder="Enter password..."/>
        <input id="send-credentials-bttn" type="submit" value="Log In!"/>
        <a>Back</a>
      </div>
    );
  }
}

export default hot(module)(LoginPage);