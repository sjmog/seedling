import React from 'react'

// use className animate-ping to flash
const Indicator = (props) => {
  return(
    <div className="w-3 mr-2 relative top-0.5">
      <span className={`absolute h-3 w-3 ${ props.className } inline-flex rounded-full bg-green-400 opacity-75`} />
      <span className="absolute h-3 w-3 inline-flex rounded-full bg-green-400" />
    </div>
  )
}

Indicator.defaultProps = {
  className: ''
}

export default Indicator