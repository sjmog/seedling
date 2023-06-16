import React from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'

const Feed = React.forwardRef((props, ref) => {
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { dark: props.dark });
    }
    return child
  })

  return(
    <ul
     ref={ref}
     role="list"
     className={classNames(
      "divide-y divide-gray-200",
      props.dark && 'divide-slate-800',
      props.className
     )}>
      { childrenWithProps }
    </ul>
  )
})

Feed.Item = React.forwardRef(({ to, selected, ...props }, ref) => {
  const MaybeLink = to ? Link : 'span'

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { dark: props.dark });
    }
    return child
  })

  return(
    <li
     ref={ref}>
      <MaybeLink
       to={to}
       onMouseOver={props.onMouseOver}
       onClick={props.onClick}
       className={classNames(
         'block relative py-4 px-4 cursor-pointer',
         'bg-white hover:bg-gray-50',
         props.dark && 'bg-slate-700 hover:bg-slate-800',
         selected && 'bg-yellow-50',
         selected && props.dark && 'bg-slate-900',
         props.className
       )}>
        { childrenWithProps }
      </MaybeLink>
    </li>
  )
})

Feed.Item.Header = ({ ...props }) => {
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { dark: props.dark });
    }
    return child
  })

  return(
    <div className={classNames("flex justify-between items-baseline space-x-3", props.className)}>
      { childrenWithProps }
    </div>
  )
}

Feed.Item.Header.Title = ({ ...props }) => {
  return(
    <div
     className={classNames(
      "truncate text-sm font-medium text-gray-900",
      props.dark && 'text-slate-100',
      props.className
     )}>
      { props.children }
    </div>
  )
}

Feed.Item.Header.Meta = ({ ...props }) => {
  return(
    <div
     className={classNames(
      "flex-shrink-0 whitespace-nowrap text-xs text-gray-500",
      props.dark && 'text-slate-300',
      props.className
     )}>
      { props.children }
    </div>
  )
}

Feed.Item.Content = ({ ...props }) => {
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { dark: props.dark });
    }
    return child
  })

  return(
    <div>
      { childrenWithProps }
    </div>
  )
}

Feed.Item.Content.Meta = ({ ...props }) => {
  return(
    <div
     className={classNames(
      "truncate text-sm text-gray-500 mb-1",
      props.dark && 'text-slate-300',
      props.className
     )}>
      { props.children }
    </div>
  )
}

Feed.Item.Content.Content = ({ ...props }) => {
  return(
    <div
     className={classNames(
      "text-sm text-gray-600 line-clamp-2",
      props.dark && 'text-slate-400',
      props.className
     )}>
      { props.children }
    </div>
  )
}

export default Feed
