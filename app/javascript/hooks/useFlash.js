import React, { useContext } from 'react'
import FlashContext from 'contexts/FlashContext'

const useFlash = () => {
  const {
    setShow,
    setHeader,
    setMessage,
    setType
  } = useContext(FlashContext)

  const showFlash = (header, message, { type = 'notification' }) => {
    setHeader(header)
    setMessage(message)
    setType(type)
    setShow(true)
  }

  const noticeFlash = (message) => showFlash("Notification", message, { type: 'notice' })
  const alertFlash = (message) => showFlash("There was an error", message, { type: 'alert' })
  const warningFlash = (message) => showFlash("Warning", message, { type: 'warning' })
  const successFlash = (message) => showFlash("Success", message, { type: 'success' })

  // aliases
  const notificationFlash = noticeFlash
  const errorFlash = alertFlash

  return {
    showFlash,
    noticeFlash,
    alertFlash,
    warningFlash,
    successFlash,
    notificationFlash,
    errorFlash
  }
}

export default useFlash
