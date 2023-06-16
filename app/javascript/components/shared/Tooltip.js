import React, { Fragment, useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import { classNames } from 'utils'

const Tooltip = ({ text, panel, placement = 'top', on = 'hover', ...props }) => {
  let [referenceElement, setReferenceElement] = useState(null)
  let [popperElement, setPopperElement] = useState(null)
  let [arrowElement, setArrowElement] = useState(null)
  const [hidingTimeout, setHidingTimeout] = useState(false)
  const [updatingInterval, setUpdatingInterval] = useState(false)
  let { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: placement,
    modifiers: [
      {
        name: 'arrow',
        options: { element: arrowElement }
      },
      {
        name: 'offset',
        options: { offset: [0, 10] }
      }
    ]
  })

  const [show, setShow] = useState(false)

  const handleShow = async () => {
    if(hidingTimeout) clearTimeout(hidingTimeout)

    setUpdatingInterval(setInterval(() => update && update(), 1))
    setShow(true)
  }

  const handleHide = () => { 
    if(updatingInterval) clearInterval(updatingInterval)

    setHidingTimeout(setTimeout(() => setShow(false), props.delay))
  }

  const toggleShow = (e) => {
    e.preventDefault()
    e.stopPropagation()

    show ? handleHide() : handleShow()
  }

  return (
    <span
     onMouseOver={ () => on === 'hover' && handleShow() }
     onMouseLeave={ () => on === 'hover' && handleHide() }
     onClick={ (e) => on === 'click' && toggleShow(e) }>
      <div
       ref={setReferenceElement}
       className={props.className}>
        { props.children }
      </div>

      {
        show &&
        <div
         className={classNames(
          'z-50 ring-1 ring-slate-700 ring-opacity-5 rounded-md',
         )}
         ref={setPopperElement}
         style={ styles.popper }
         { ...attributes.popper }>
          <div
           onMouseEnter={ () => on === 'hover' && handleShow() }
           onMouseLeave={ () => on === 'hover' && handleHide() }
           className={classNames(
            "bg-slate-700 relative z-50 rounded-md",
            props.white && 'bg-white'
           )}>
            {
              panel
              ? panel
              : text
              ? <div className='text-xs text-white px-2 py-2 text-center'>{text}</div>
              : null
            }
          </div>
          <div
           id='arrow'
           ref={setArrowElement}
           className={classNames(
            "bg-slate-700 shadow-sm ring-1 ring-black",
            props.white && 'bg-white'
           )}
           style={styles.arrow} />
        </div>
      }
        
    </span>
  )
}

export default Tooltip