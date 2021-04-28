import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: '',
  };

  handleChange(e) {
    const { handleTextIn } = this.props;

    this.setState({ value: e.target.value });
    handleTextIn(e.target.value);
  }

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <div>
        <label>{placeholder}</label>
        <Input.Password
          placeholder={placeholder}
          onChange={this.handleChange}
          value={value}
        />
      </div>
    );
  }
}

PasswordInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleTextIn: PropTypes.func.isRequired,
};

export default hot(module)(PasswordInput);
