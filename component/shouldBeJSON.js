'use strict'

import warning from 'react/lib/warning'

module.exports = function(props, propName, componentName) {
  var items
  if (props[propName]) {
    try {
      items = JSON.parse(props[propName])
    } catch(err) {
      items = null
    }
  }
  warning(
    items,
    `Failed propType: Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected an JSON with array of objects.`
  )
}
