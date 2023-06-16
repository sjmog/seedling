import React from 'react'

const Label = ({ children, htmlFor, className }) => {
  return(
    <label
     htmlFor={htmlFor}
     className={`block text-sm font-medium text-gray-700 ${ className }`}>
      { children }
    </label>
  )
}

Label.defaultProps = {
  htmlFor: null,
  className: ''
}

export default Label

