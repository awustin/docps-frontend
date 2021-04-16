import { hot } from 'react-hot-loader';
import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
    var initialState = {
      usersList: 'Loading ...',
      color: 'turquoise'
    };
    this.state = initialState;
  }

  componentDidMount() {
    fetch('http://localhost:3000/fetch')
      .then((response) => response.json())
      .then((data) => this.buildUsersList(data))
      .catch(() => this.setState({usersList: 'There was an error!'}))
      ; 
  }

  buildUsersList(data){
    var array = [];
    if(data.length > 0){
      data.forEach(element => {
        var item = <h3>{element.nombre} {element.apellido}: {element.fecha_alta}</h3>
        array.push(item);
      });
      this.setState({usersList: array});
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ color: this.state.color }}>These are the users: </h1>
        <h3>{this.state.usersList}</h3>
      </div>
    );
  }
}

export default hot(module)(Users);
