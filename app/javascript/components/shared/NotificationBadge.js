import React, { useState, useContext } from 'react'
import NotificationContext from 'contexts/NotificationContext'
import { DotBadge } from 'components/shared'
import useNotifications from 'hooks/useNotifications'
import { classNames } from 'utils'

const NotificationBadge = ({ notifications, ...props }) => {
  const filteredNotifications = notifications.filter(({ status }) => status === 'unread')

  if(filteredNotifications.length === 0) return null

  return(
    <DotBadge
     className={classNames(props.className)}
     value={filteredNotifications.length} />
  )
}

export default NotificationBadge
