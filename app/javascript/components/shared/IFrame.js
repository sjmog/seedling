import React from 'react'

// Props
//
// src:string

const IFrame = (props) => {
  return(
    <iframe
     className="bg-white shadow overflow-hidden rounded-lg"
     src={ props.src }
     style={ { 
                width: "100%",
                height: "90%" 
              } } />
  )
}

export default IFrame