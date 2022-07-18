import React from 'react'
import ListItem from './ListItem'

const List = (props) => {
  return(
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="font-medium text-gray-800">{ props.title }</h3>
      </div>

      <div className="border-t border-gray-200">
        { props
            .items
            .map((item, index) => <ListItem
                                   key={index}
                                   index={index}
                                   {...item} />) }
      </div>
    </div>
  )
}

export default List;