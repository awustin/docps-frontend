import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';

class ButtonInput extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { handleClick } = this.props;
    handleClick(e);
  }

  render() {
    const { value, enabled } = this.props;
    const disabledFlag = (!enabled) ? 'disabled' : '';

    return (
      <div>
        <input 
          type="submit" 
          value={value} 
          onClick={this.handleChange}
          disabled={disabledFlag} 
        />
      </div>
    );
  }
}

ButtonInput.propTypes = {
  value: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default hot(module)(ButtonInput);
