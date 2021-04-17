import { hot } from 'react-hot-loader';
import React from 'react';
import SignInForm from './signInForm';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { logIn } = this.props;
    return (
      <div>
        <SignInForm 
          logIn = {logIn}
        />
      </div>
    );
  }
}

export default hot(module)(LoginPage);
