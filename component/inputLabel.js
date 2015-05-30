'use strict'

import React from 'react'

var InputLabel = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  handleClick() {
    this.props.onClick()
  },
  render() {
    return (
      <input type="text" readOnly
      className="input_label"
      placeholder={this.props.placeholder}
      onClick={this.handleClick}
      />
    )
  }
})

module.exports = InputLabel
