'use strict'

import React from 'react'
import Dropdown from './component/dropdown.js'

React.render(
  <Dropdown
    items='[{ "name": "Yo", "val": 5 },{ "name": "Yolo", "val": 15 }]'
    multilabel="Multiple categories"
    placeholder="Select categories"
    inputName="categories[]"
  />,
  document.querySelector('#dropdown'))
