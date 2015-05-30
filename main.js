'use strict'

import React from 'react'
import Dropdown from './component/dropdown.js'

React.render(
  <Dropdown
    items='[{ "name": "Food", "val": "AllFood" },{ "name": "Drinks", "val": "AllDrinks" }]'
    multilabel="Multiple categories"
    placeholder="Select categories"
    inputName="categories[]"
  />,
  document.querySelector('#categories'))

React.render(
  <Dropdown
    items='[{ "name": "Beginner", "val": 1 },{ "name": "Intermediate", "val": 2 }]'
    multilabel="Multiple levels"
    placeholder="Select level"
    inputName="levels[]"
  />,
  document.querySelector('#levels'))
