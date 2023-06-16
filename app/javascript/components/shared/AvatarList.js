import React from 'react'
import { Avatar } from 'components/shared'
import { classNames } from 'utils'

const AvatarList = ({ users, size, ...props }) => {
  const SIZE_TO_AVATAR_SIZES = {
    sm: 'tiny',
    md: 'small',
    lg: 'medium'
  }

  const SIZE_TO_SPACING = {
    sm: '-space-x-1',
    md: '-space-x-2',
    lg: '-space-x-2'
  }

  const limitedUsers = props.limit ? users.slice(0, props.limit) : users

  return (
      <div
       className={classNames(
        'flex overflow-hidden',
        SIZE_TO_SPACING[size]
       )}>
        {
          limitedUsers.map(user => (
            <Avatar
             key={user.id}
             className="ring-2 ring-white"
             src={user.avatar}
             size={SIZE_TO_AVATAR_SIZES[size]}
             { ...props } />
          )
        )}
        {
          props.limit && users.length > props.limit &&
          <Avatar
           key='last'
           type='text'
           text={`+${ users.length - props.limit }`}
           className="ring-2 ring-white"
           size={SIZE_TO_AVATAR_SIZES[size]}
           { ...props } />
        }
      </div>
  )
}

AvatarList.defaultProps = {
  size: 'md'
}

export default AvatarList
