import React from 'react'

import { categoryTitles } from 'utils'

const AllocationNote = ({ allocation, prefix, suffix }) => {
  if(!allocation) return null

  return(
    <span className="AllocationNote">
      {prefix} <strong>{allocation.entity.title}</strong> to <strong>{categoryTitles(allocation.categories)}</strong>{suffix}
    </span>
  )
}

export default AllocationNote