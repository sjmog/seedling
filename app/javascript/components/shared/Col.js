import React from 'react'

const Col = ({ basis, children, className }) => {
  return(
    <div className={`basis-${basis} ${ className }`}>
      { children }
    </div>
  )
}

Col.defaultProps = {
  className: ''
}

export default Col
