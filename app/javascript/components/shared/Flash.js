import React from 'react'
import Alert from './Alert'

// Flashes have the form
// [type:string, message:string]

const Flash = ({ flash }) => {
  return(
    <div className="container max-w-lg pt-4 px-4 mx-auto">
      { flash.map((flash, index) => <Alert
                                     key={index}
                                     type={flash[0]}>
                                     {flash[1]}
                                    </Alert>) }
    </div>
  )
}

export default Flash