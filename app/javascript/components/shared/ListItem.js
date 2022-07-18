import React, { useState, useEffect, useContext } from 'react'
import { useChannel } from '@aersoftware/react-use-action-cable'
import AppContext from 'contexts/AppContext'
import { get, destroy } from 'api'
import Spinner from './Spinner'
import Indicator from './Indicator'

// Props
//
// title:string
// loading:boolean DEFAULT false
// className:string DEFAULT ''
// content:string
// extra:string

const ListItem = (props) => {
  const { apiUrl, formToken, actionCable } = useContext(AppContext)
  const { subscribe, unsubscribe, send } = useChannel(actionCable)
  const [isAwaitingConfirm, setIsAwaitingConfirm] = useState(false)
  const [loading, setLoading] = useState(true)

  const listContents = () => {
    if(props.loading) return <Spinner className="w-4 h-4 inline" />

    return(
      <>
        { props.content && <p className="text-xs text-gray-500 relative">
                             { props.content }
                           </p> }

        { props.extra && <span className="text-xs text-gray-600">
                           {props.extra}
                         </span> }
      </>
    )
  }
  
  return(
    <dl>
      <div className={`px-4 py-5 ${ className }`}>
        <div className="CountryHeader flex justify-between h-4">
          <div className="flex">
            <Indicator />
            <p className="font-semibold text-xs text-gray-400 mr-2">
              { props.title }
            </p>
            { listContents() }
          </div>
        </div>
      </div>
    </dl>
  )
}

ListItem.defaultProps = {
  loading: false,
  className: ''
}

export default ListItem