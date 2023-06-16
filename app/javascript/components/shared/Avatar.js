import React, { Fragment, useState, useRef } from "react"
import DefaultAvatar from 'images/default-avatar.svg'
import { classNames } from 'utils'
import { pure } from 'recompose'

const Avatar = ({ type, id, name, src, avatar, size, ...props }) => {
  const target = useRef(null)

  const link = src || avatar

  const handleMouseOver = () => {
    if(props.onMouseOver) props.onMouseOver(id)
  }

  const handleMouseLeave = () => {
    if(props.onMouseLeave) props.onMouseLeave(id)
  }

  const avatarSrc = () => {
    if(!link) return DefaultAvatar

    const splitLink = link.split('/')

    if(splitLink[1] === 'media-exp1.licdn.com') return DefaultAvatar

    if(splitLink[2] === 'res.cloudinary.com') {
      const transformation = 'c_crop,g_custom'
      splitLink.splice(6, 0, transformation)
    }

    return splitLink.join('/')
  }

  const setDefaultSrc = (e) => {
    e.target.src = DefaultAvatar
    e.target.className += ' bg-gray-200 p-1.5'
  }

  const SIZE_TO_CLASSES = {
    tiny: 'h-6 w-6',
    xs: 'h-6 w-6',
    small: 'h-8 w-8',
    sm: 'h-8 w-8',
    medium: 'h-10 w-10',
    md: 'h-10 w-10',
    large: 'h-12 w-12',
    lg: 'h-12 w-12',
    xlarge: 'h-14 w-14',
    xl: 'h-14 w-14',
    xml: 'h-20 w-20',
    xxl: 'h-24 w-24'
  }

  const Wrapper = props.tooltip ? Tooltip : 'span'

  return (
    <Wrapper text={props.tooltipText}>
      {
        type === 'avatar'
        ? <img 
           alt={`${name}'s avatar`} 
           className={classNames(
            'inline-block rounded-full flex-shrink-0',
            SIZE_TO_CLASSES[size],
            link ? '' : 'bg-gray-500',
            props.className
           )} 
           src={avatarSrc()}
           onError={setDefaultSrc}
           ref={target}
           onMouseOver={handleMouseOver}
           onMouseLeave={handleMouseLeave}
           onClick={props.onClick} />
        : type === 'text' ?
          <div
           className={classNames(
            'inline-block rounded-full',
            SIZE_TO_CLASSES[size],
            'bg-indigo-600 text-white/90 font-bold text-xs tracking-tighter',
            props.className
           )}
           ref={target}
           onMouseOver={handleMouseOver}
           onMouseLeave={handleMouseLeave}
           onClick={props.onClick}>
           <div className="inline-flex items-center justify-center w-full h-full">
            { props.text }
           </div>
          </div>
        : type === 'icon' ?
          <div
           className={classNames(
            'inline-block rounded-full inline-flex items-center justify-center',
            SIZE_TO_CLASSES[size],
            'bg-indigo-600 text-white',
            props.className
           )}
           ref={target}
           onMouseOver={handleMouseOver}
           onMouseLeave={handleMouseLeave}
           onClick={props.onClick}>
           { <props.Icon className={SIZES_TO_CLASSES[size]} /> }
          </div>
        : null
      }
    </Wrapper>
  )
}

Avatar.defaultProps = {
  type: 'avatar',
  size: 'md'
}

export default pure(Avatar)
