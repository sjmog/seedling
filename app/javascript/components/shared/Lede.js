import React from 'react'

const Lede = (props) => {
  return(
    <p className={`text-lg mb-8 ${ props.className }`}>
      { props.content }
    </p>
  )
}

export default Lede;