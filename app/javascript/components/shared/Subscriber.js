import React, { useState, useEffect, useContext } from 'react'
import { useChannel } from '@aersoftware/react-use-action-cable'
import AppContext from 'contexts/AppContext'

// Use like
//
// <Subscriber channel="channelName">
//   { data => <p>{data}</p> }
// </Subscriber>
//
// Props
//
// channel:string
// selectData:function(data:Object) DEFAULT (data) => data
// onReceive:function(data:string, callback:function) DEFAULT (data, callback) => callback()

const Subscriber = ({ props }) => {
  const { apiUrl, formToken, actionCable } = useContext(AppContext)
  const { subscribe, unsubscribe, send } = useChannel(actionCable)
  const [isAwaitingConfirm, setIsAwaitingConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isReceiving, setIsReceiving] = useState(false)
  const [data, setData] = useState(null)

  const handleReceive = (data) => {
    setIsReceiving(true)
    setData(props.selectData(data))
    props.onReceive(data, () => setIsReceiving(false))
  }

  useEffect(() => {
    subscribe({
      channel: props.channel
    }, {
      received: handleReceive,
      initialized: (e) => {console.log("initialized websocket")},
      connected: (e) => {console.log("connected to websocket")},
      disconnected: (e) => {console.log("disconnected from websocket")}
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
  return props.children(data)
}

Subscriber.defaultProps = {
  selectData: (data) => data,
  onReceive: (data, callback) => callback()
}

export default Subscriber