import React from 'react'
import { classNames } from 'utils'

export const H1 = (props) => (
  <h1
   className={classNames(
    "text-3xl font-medium text-gray-700",
    props.className
   )}>{ props.children }</h1>
)

export const H2 = (props) => (
  <h2
   className={classNames(
    "text-2xl font-medium text-gray-700",
    props.className
   )}>{ props.children }</h2>
)

export const H3 = (props) => (
  <h3
   className={classNames(
    "text-xl font-medium text-gray-700",
    props.className
   )}>{ props.children }</h3>
)

export const P = (props) => (
  <p
   className={classNames(
   'text-gray-700',
   (props.sm || props.small) && 'text-sm',
   props.xs && 'text-xs',
   props.className
  )}>{props.children}</p>
)

export const Hint = ({ children, className, center, big, small, tiny }) => {
  return(
    <div
     className={classNames(
      "text-sm text-gray-400 font-normal",
      center && 'text-center',
      tiny || small && 'text-xs',
      big && 'text-base',
      className)}>
      {children}
    </div>
  )
}
