'use strict'

import React from 'react'
import InputLabel from './inputLabel.js'
import InputItem from './inputItem.js'
import shouldBeJSON from './shouldBeJSON.js'

var Dropdown = React.createClass({
  propTypes: {
    items: shouldBeJSON,
    multilabel: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    inputName: React.PropTypes.string.isRequired
  },
  mixins: [
    require('react-onclickoutside')
  ],
  getDefaultProps: function() {
    return {
      items: []
    }
  },
  getInitialState: function() {
    return {
      openList: false,
      selectedItems: 0
    }
  },
  handleClickOutside: function() {
    this.setState({ openList: false })
  },
  handleClickLabel: function() {
    this.setState({ openList: !this.state.openList })
  },
  holaJovem: function(checkbox) {
    var state = this.state
    var $label = React.findDOMNode(this.refs.listLabel)
    var $target = checkbox

    if ($target.checked) {
      this.setState({ selectedItems: ++state.selectedItems })
      $target.parentNode.setAttribute('aria-selected', true)
    } else {
      this.setState({ selectedItems: --state.selectedItems })
      $target.parentNode.setAttribute('aria-selected', false)
    }

    switch (state.selectedItems) {
      case 0:
        $label.value = ''
        break
      case 1:
        $label.value = $target.value
        break
      default:
        $label.value = this.props.multilabel
        break
    }
  },
  getItems: function() {
    return JSON.parse(this.props.items)
    .map(function(item, index){
      var itemRef = 'jovem' + index
      return (
        <li key={index}>
        <label> {item.name}
          <InputItem
            inputName={this.props.inputName}
            onChange={this.holaJovem}
            value={item.name}
            ref={itemRef}
          /></label>
        </li>
      )
    }.bind(this))
  },
  render: function() {
    var listStyle = {
      display: this.state.openList ? 'block' : 'none'
    }
    var divAria = this.state.openList ? 'true' : 'false'
    var items = this.getItems()

    return (
      <div aria-busy={divAria}>
        <InputLabel
          onClick={this.handleClickLabel}
          placeholder={this.props.placeholder}
          ref='listLabel'
          />
        <ul style={listStyle}>{items}</ul>
      </div>
    )
  }
})

module.exports = Dropdown
