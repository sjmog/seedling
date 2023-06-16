import React from 'react'
import { Hint } from 'components/shared'

// must have exactly three children
// (null or undefined children are OK)
const ThreeColumn = (props) => {
  if(!props.children || props.children.length !== 3) return(
    <Hint>
      Could not render ThreeColumn: requires exactly 3 children, was given { props.children ? props.children.length : 0 }.
    </Hint>
  )

  return(
    <div className="mx-auto w-full flex-grow lg:flex">
      {/* Left sidebar & main wrapper */}
      <div className="min-w-0 flex-1 bg-white xl:flex">
        <div className="border-r border-gray-200 bg-white w-[320px] flex-shrink-0">
          <div className="h-screen overflow-y-auto">
            {/* Start left column area */}
            { props.children[0] }
            {/* End left column area */}
          </div>
        </div>

        <div className="bg-white lg:min-w-0 lg:flex-1">
          <div className="h-screen overflow-y-auto">
            {/* Start main area*/}
            { props.children[1] }
            {/* End main area */}
          </div>
        </div>

        <div className="bg-gray-50 lg:flex-shrink-0 lg:border-l lg:border-gray-200 w-[380px]">
          {/* Start right column area */}
          <div className="relative h-screen overflow-y-auto" style={{ minHeight: '16rem' }}>
            { props.children[2] }
          </div>
          {/* End right column area */}
        </div>
      </div>
    </div>
  )
}

export default ThreeColumn
