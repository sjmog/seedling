import React, { Fragment, useContext, useState } from 'react'
import AppContext from 'contexts/AppContext'
import { Dialog, Transition } from '@headlessui/react'
import Logo from 'images/techmap-logo.png'
import { useLocation, Link } from 'react-router-dom'
import {
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  HomeIcon,
  UsersIcon,
  BellIcon,
  XMarkIcon,
  DocumentTextIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'

import { Tooltip, Avatar, NotificationBadge } from 'components/shared'
import UserMenu from 'components/navigation/UserMenu'
import NotificationsMenu from 'components/navigation/NotificationsMenu'

const Navigation = (props) => {
  const { currentUser } = useContext(AppContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userNavigationOpen, setUserNavigationOpen] = useState(false)

  const location = useLocation()
  if(props.hideOn.includes(location.pathname.split('/')[1])) return null

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, canAccess: true },
    { name: 'Discussions', href: '/discussions', icon: ChatBubbleLeftRightIcon, canAccess: true },
    { name: 'Coaching', href: '/coaching', icon: AcademicCapIcon, canAccess: currentUser.isTrainer },
    { name: 'Transcripts', href: '/transcripts', icon: DocumentTextIcon, canAccess: currentUser.isTrainer },
    { name: 'Directory', href: '/directory', icon: UsersIcon, canAccess: true },
    { name: 'Certification', href: '/certification', icon: CheckBadgeIcon, canAccess: true }
  ]

  return(
    <>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-4">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="pt-5 pb-4">
                  <Link to="/" className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src={Logo}
                      alt="TechMap"
                    />
                  </Link>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-center rounded-md p-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          {item.name}
                          {item.extra}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
                <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                  <div onClick={() => setUserNavigationOpen(true)} className="group block flex-shrink-0">
                    <div className="flex items-center">
                      <div>
                        <img className="inline-block h-10 w-10 rounded-full" src={currentUser.avatar} alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{currentUser.name}</p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          Account Settings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="relative z-30 hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-20 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-indigo-600">
            <div className="flex-1">
              <Link to={'/'} className="flex items-center justify-center bg-indigo-700 py-4">
                <img
                  className="h-8 w-auto"
                  src={Logo}
                  alt="TechMap"
                />
              </Link>
              <nav aria-label="Sidebar" className="flex flex-col items-center space-y-3 py-6">
                {navigation.map((item) => (
                  item.canAccess &&
                  <Tooltip key={item.name} placement='right' text={item.name}>
                    <Link
                      to={item.href}
                      className="flex items-center rounded-lg p-4 text-indigo-200 hover:bg-indigo-700 relative">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">{item.name}</span>
                      {item.extra}
                    </Link>
                  </Tooltip>
                ))}
              </nav>
            </div>
            <div className="flex flex-col items-center pb-3">
              <Tooltip
               placement='right'
               delay={200}
               panel={
                <NotificationsMenu
                 notifications={props.notifications}
                 setNotificationRead={props.setNotificationRead} />
               }>
                <Link
                 to='/notifications'
                 className="block flex items-center rounded-lg p-4 text-indigo-200 hover:bg-indigo-700 relative cursor-pointer">
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Notifications</span>
                  <NotificationBadge notifications={props.notifications} className="top-1 right-1" />
                </Link>
              </Tooltip>
            </div>
            <div className="flex flex-shrink-0 pb-[5.5rem]">
              <div className="w-full flex-shrink-0">
                <Tooltip
                 placement='right'
                 delay={200}
                 panel={<UserMenu />}>
                   <Avatar className="block mx-auto" { ...currentUser } />
                   <div className="sr-only">
                     <p>{currentUser.name}</p>
                     <p>Account settings</p>
                   </div>
                </Tooltip>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile top navigation */}
      <div className="relative z-10 lg:hidden w-full">
        <div className="flex items-center justify-between bg-indigo-600 py-2 px-4 sm:px-6 lg:px-8">
          <div>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
              alt="Your Company"
            />
          </div>
          <div>
            <button
              type="button"
              className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

Navigation.defaultProps = {
  hideOn: []
}

export default Navigation