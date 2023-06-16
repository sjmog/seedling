import React, { useState } from 'react'
import AppContext from 'contexts/AppContext'
import FlashContext from 'contexts/FlashContext'
import { useActionCable } from '@aersoftware/react-use-action-cable'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'

const Root = (props) => <Router><App {...props} /></Router>

const App = (props) => {
  const { actionCable } = useActionCable(`${props.apiUrl.replace(/^(http|https)/, "ws")}cable`)
  const [flashShow, setFlashShow] = useState(false)
  const [flashHeader, setFlashHeader] = useState(null)
  const [flashMessage, setFlashMessage] = useState(null)
  const [flashType, setFlashType] = useState(null)

  return(
    <AppContext.Provider
     value={
            {
              formToken: props.formToken,
              apiUrl: props.apiUrl,
              currentUser: props.currentUser,
              actionCable: actionCable
            }
          }>

      <FlashContext.Provider
       value={
        { 
          show: flashShow,
          setShow: setFlashShow,
          header: flashHeader,
          setHeader: setFlashHeader,
          message: flashMessage,
          setMessage: setFlashMessage,
          type: flashType,
          setType: setFlashType
        }
      }>
        <Main flash={props.flash} />
      </FlashContext.Provider>
    </AppContext.Provider>
  )
}

export default Root
