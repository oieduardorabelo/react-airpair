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
  getDefaultProps() {
    return {
      items: []
    }
  },
  getInitialState() {
    return {
      openList: false,
      selectedItems: 0
    }
  },
  handleClickOutside() {
    this.setState({ openList: false })
  },
  handleClickLabel() {
    this.setState({ openList: !this.state.openList })
  },
  handleChangeItemCheckbox(checkbox, itemName) {
    var { state, refs, props } = this
    var $label = React.findDOMNode(refs.listLabel)
    var $target = checkbox
    var targetLabel = itemName

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
        $label.value = targetLabel
        break
      default:
        $label.value = props.multilabel
        break
    }
  },
  getItems() {
    return JSON.parse(this.props.items)
    .map((item, index) => {
      var itemRef = 'listItem' + index
      return (
        <li key={index}>
        <label> {item.name}
          <InputItem
            onChange={this.handleChangeItemCheckbox}
            inputName={this.props.inputName}
            itemName={item.name}
            value={item.val}
            ref={itemRef}
          /></label>
        </li>
      )
    })
  },
  render() {
    var { state } = this
    var listStyle = {
      display: state.openList ? 'block' : 'none'
    }
    var divAria = state.openList ? 'true' : 'false'
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
