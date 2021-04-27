import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class ButtonStyleOne extends React.Component {
  constructor(props) {
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
      <Button
        type="primary"
        onClick={this.handleChange}
        disabled={disabledFlag}
      >
      {value}
      </Button>
    );
  }
}

ButtonStyleOne.propTypes = {
  value: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
};
ButtonStyleOne.defaultProps = { handleClick: undefined };

export default hot(module)(ButtonStyleOne);
