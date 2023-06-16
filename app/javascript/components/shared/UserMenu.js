import React, { Fragment } from 'react'
import { Logout } from 'components/shared'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { classNames } from 'utils'

const UserMenu = React.forwardRef((props, ref) => {
  const menu = [
    // {
    //   name: 'Account settings',
    //   href: '/settings'
    // },
    {
      name: 'Support',
      href: 'mailto:sam@whatever.xyz'
    }
  ]

  return (
    <Menu as="div" ref={ref} {...props} className="">
      <Menu.Items static className="w-56 rounded-md bg-slate-700 focus:outline-none">
        <div>
          {
            menu.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={classNames(
                      'text-white block px-4 py-2 text-sm',
                      active && 'bg-slate-800',
                      index === 0 && 'rounded-t-md',
                    )}
                  >
                    { item.name }
                  </a>
                )}
              </Menu.Item>
            ))
          }
          <Menu.Item key={'sign-out'}>
            {({ active }) => (
              <Logout
               className={classNames(
                   'text-white block w-full text-left px-4 py-2 text-sm cursor-pointer',
                   active && 'bg-slate-800',
                   'rounded-b-md',
               )} />
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  )
})

export default UserMenu
