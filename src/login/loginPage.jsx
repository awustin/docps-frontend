import { hot } from 'react-hot-loader';
import React from 'react';
import SignInForm from './signInForm';
import * as d from '../AppConsts.json';

class LoginPage extends React.Component {
  informLoginError() {
    const { errorCode } = this.props;
    if (errorCode != undefined) {
      return <div>{d.errorCodes[errorCode]}</div>;
    }
  }

  render() {
    const { logIn } = this.props;
    return (
      <div>
        <SignInForm
          logIn={logIn}
        />
        {this.informLoginError()}
      </div>
    );
  }
}

export default hot(module)(LoginPage);
