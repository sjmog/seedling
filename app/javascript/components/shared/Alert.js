import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { InformationCircleIcon,
         CheckCircleIcon,
         XCircleIcon,
         ExclamationCircleIcon,
         LightBulbIcon,
         SparklesIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Spinner } from 'components/shared'
import { classNames } from 'utils'

const Alert = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(true)

  if(!show) return null

  const TYPES_TO_PROSE_COLORS = {
    notice: 'prose-blue',
    alert: 'prose-red',
    warning: 'prose-yellow',
    success: 'prose-green',
    idea: 'prose-blue',
    bot: 'prose-blue',
  }

  const TYPES_TO_TEXT_COLORS = {
    notice: 'text-blue-700',
    alert: 'text-red-700',
    warning: 'text-yellow-700',
    success: 'text-green-700',
    idea: 'text-blue-700',
    bot: 'text-blue-700',
  }

  const TYPES_TO_ICON_COLORS = {
    notice: 'text-blue-400',
    alert: 'text-red-400',
    warning: 'text-yellow-400',
    success: 'text-green-400',
    idea: 'text-blue-400',
    bot: 'text-blue-400',
  }

  const TYPES_TO_BG = {
    notice: 'bg-blue-50',
    alert: 'bg-red-50',
    warning: 'bg-yellow-50',
    success: 'bg-green-50',
    idea: 'bg-blue-50',
    bot: 'bg-blue-50',
  }

  const TYPES_TO_ICONS = {
    notice: InformationCircleIcon,
    alert: XCircleIcon,
    warning: ExclamationCircleIcon,
    success: CheckCircleIcon,
    idea: LightBulbIcon,
    bot: SparklesIcon,
  }

  const proseColor = TYPES_TO_PROSE_COLORS[props.type] || TYPES_TO_PROSE_COLORS.notice
  const textColor = TYPES_TO_TEXT_COLORS[props.type] || TYPES_TO_TEXT_COLORS.notice
  const iconColor = TYPES_TO_ICON_COLORS[props.type] || TYPES_TO_ICON_COLORS.notice
  const bg = TYPES_TO_BG[props.type] || TYPES_TO_BG.notice
  const Icon = TYPES_TO_ICONS[props.type] || TYPES_TO_ICONS.notice

  const handleDismiss = () => {
    setShow(false)
    if(props.onDismiss) props.onDismiss()
  }

  return (
    <div ref={ref} className={classNames("rounded-md p-4", bg, props.className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          {
            props.type === 'loading'
            ? <Spinner className={classNames(iconColor)} />
            : <Icon className={classNames("h-5 w-5", iconColor)} aria-hidden="true" />
          }
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <div className={classNames("prose text-sm max-w-none", proseColor, textColor)}>
            { props.children }
          </div>

          {
            props.action &&
            <div className="mt-3 text-sm md:mt-0 md:ml-6">
              { props.action }
            </div>
          }

          {
            props.dismissible &&
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleDismiss}>
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
})

Alert.defaultProps = {
  type: 'notice',
  dismissible: false
}

export default Alert
