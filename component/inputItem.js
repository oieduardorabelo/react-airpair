'use strict'

import React from 'react'

var InputItem = React.createClass({
  propTypes: {
    inputName: React.PropTypes.string.isRequired,
    itemName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired
  },
  handleChange() {
    this.props.onChange(React.findDOMNode(this), this.props.itemName)
  },
  render() {
    return (
      <input type="checkbox"
        onChange={this.handleChange}
        name={this.props.inputName}
        value={this.props.value}
        checked={this.props.checked}
      />
    )
  }
})

module.exports = InputItem
