import { hot } from 'react-hot-loader';
import React from 'react';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { user } = this.props;
    return (
      <div>
        Welcome {user}!
        <div>
            Log out.
        </div>
      </div>
    );
  }
}

export default hot(module)(AppLayout);