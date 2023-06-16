import React from 'react'
import { Hint } from 'components/shared'

// must have exactly two children
// (null or undefined children are OK)
const TwoColumn = (props) => {
  if(!props.children || props.children.length !== 2) return(
    <Hint>
      Could not render TwoColumn: requires exactly 2 children, was given { props.children ? props.children.length : 0 }.
    </Hint>
  )

  return(
    <div className="flex w-full">
    {/* Primary column */}
      <aside
       className="w-96 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-100">
        { props.children[0] }
      </aside>

      {/* Secondary column (hidden on smaller screens) */}
      <section>
        { props.children[1] }
      </section>
    </div>
  )
}

export default TwoColumn
