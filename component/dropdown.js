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
      selectedItems: 0,
	    currentItem: 0,
	    label: ''
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
    var currentItem = this.state.currentItem;
    return this.props.items
      .map((item, index) => {
        var itemRef = 'listItem' + index,
  		    className = currentItem == index ? 'highlight' : '';
          
        return (
          <li key={index}>
            <label className={className} aria-selected={item.checked}> {item.name}
              <input type="checkbox"
                  onChange={this.handleChangeItemCheckbox}
                  name={this.props.inputName}
                  value={item.value}
                  checked={item.checked}
                />
            </label>
          </li>
        )
      });
  },
  handleKeyUp(evt) {
    var handler = this[`handle${evt.key}`];
	
	  handler && handler();
  },
	handleArrowUp() {
   	var currentItem = this.state.currentItem;

		return this.setState({ currentItem: currentItem == 0 ? this.props.items.length - 1 : --currentItem});
	},
	handleArrowDown() {
		var currentItem = this.state.currentItem,
			  itemLen = this.props.items.length - 1;

		return this.setState({ currentItem: currentItem == itemLen ? 0 : ++currentItem});
	},
	handleEnter() {
	  var { state, props } = this
		var item = props.items[state.currentItem];
		item.checked = !item.checked;
		
		var selectedItems = state.selectedItems;
		
		if (item.checked) ++selectedItems;
		else --selectedItems;
		
		var label;
		
    if (selectedItems == 1 && !item.checked) label = props.items.filter(function (item) { return item.checked; })[0].name;
    else if (selectedItems == 1) label = item.name;
    else if (selectedItems > 1) label = props.multilabel
    else label = '';
    

		this.setState({label: label, selectedItems: selectedItems});
		this.setProps({items: this.props.items});
	},
  render() {
    var { state } = this
    var listStyle = {
      display: state.openList ? 'block' : 'none'
    }
    var divAria = state.openList ? 'true' : 'false'
    var items = this.getItems()

    return (
	<div>
	    <input type="text" onFocus={this.handleClickLabel} onKeyUp={this.handleKeyUp} placeholder={this.state.label || this.props.placeholder} />
      <div aria-busy={divAria}>
        <ul style={listStyle}>{items}</ul>
      </div>
  </div>
    )
  }
})

/*
eventBus = (function () {
  var events = {};
  
  on = events[topic].push(fn)
  off
})

this.on(next, handleArrowDown)
this.on(prev, handleArrowUp)
this.on(select, handleEnter)

this.trigger(next)
this.trigger(prev)*/
/*

<ExternalControlDropdown>
  handleClickLabel() {
    this.setState({isOpen: true});
  }
 <input type="text" onFocus={this.handleClickLabel} onKeyUp={this.handleKeyUp}/>
 <Dropdown isOpen={this.state.isOpen}/>
</ExternalControlDropdown>

*/

module.exports = Dropdown
