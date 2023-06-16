import React, { Fragment, useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'

const Tabs = (props) => {
  const children = props.children.filter(c => c)

  let defaultSelectedIndex

  if(Array.isArray(children)) {
    defaultSelectedIndex = children.findIndex(({ props }) => props.selected)
  }

  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex)

  useEffect(() => {
    setSelectedIndex(defaultSelectedIndex)
  }, [defaultSelectedIndex])

  const handleChange = (tabIndex) => {
    if(children[tabIndex].props.link) return false

    setSelectedIndex(tabIndex)
  }

  return(
    <Tab.Group selectedIndex={selectedIndex} onChange={handleChange}>
     <Tab.List className="mt-4 border-b border-gray-200">
       {
        Array.isArray(children)
        ? <>
            {
              children.map((child, index) => (
                <Tabs.Header
                 key={index}
                 className={child.props.headerClassName}
                 disabled={child.props.disabled}
                 link={child.props.link}>
                 {child.props.header}
                </Tabs.Header>
              ))
            }
          </>
        : <Tabs.Header
           className={children.props.headerClassName}
           disabled={children.props.disabled}>
           {children.props.header}
          </Tabs.Header> 
       }
     </Tab.List>
     <Tab.Panels>
        {
          Array.isArray(children)
          ? <>
              {
                children.map((child, index) =>
                  <Tab.Panel
                   key={index}>
                   {child}
                  </Tab.Panel>)
              }
            </>
          : <Tab.Panel>
              { children }
            </Tab.Panel>
        }
     </Tab.Panels>
   </Tab.Group>
  )
}

Tabs.Tab = (props) => {
  return(
    <div className={classNames(props.className)}>
      { props.children }
    </div>
  )
}

Tabs.Header = (props) => {
  const MaybeLink = props.link ? Link : 'div'

  return(
      <Tab
       as={Fragment}
       disabled={props.disabled}>
        {({ selected }) => (
          <MaybeLink
           to={props.link}
           className={classNames(
             "ml-8 @xs:ml-6 whitespace-nowrap pb-2 text-sm mb-0 inline-block cursor-pointer text-gray-600 hover:text-gray-900",
             selected && "border-indigo-500 text-indigo-600 border-b-2 font-medium",
             props.disabled && "cursor-default text-gray-600 hover:text-gray-600",
             props.className
           )}>
           { props.children }
          </MaybeLink>
        )}
      </Tab>
    )
}

export default Tabs
