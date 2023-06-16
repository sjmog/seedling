import React, { useState } from 'react'
import AppContext from 'contexts/AppContext'
import FlashContext from 'contexts/FlashContext'
import { useActionCable } from '@aersoftware/react-use-action-cable'
import { Flash, Grid, Navigation } from './shared'

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
        <div className="min-h-full">
          <Navigation />

          { props.flash?.length > 0
            && <Flash flash={props.flash} /> }
            
          <main>
            Your app here!
          </main>
        </div>
      </FlashContext.Provider>
    </AppContext.Provider>
  )
}

export default App
