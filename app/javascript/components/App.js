import React, { useState } from 'react'
import AppContext from 'contexts/AppContext'
import { useActionCable } from '@aersoftware/react-use-action-cable'
import { Flash, Grid, Navigation } from './shared'

const App = (props) => {
  const { actionCable } = useActionCable(`${props.apiUrl.replace(/^(http|https)/, "ws")}cable`)

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

      <div className="min-h-full">
        <Navigation />

        { props.flash?.length > 0
          && <Flash flash={props.flash} /> }
          
        <main>
          <Grid url="" />
        </main>
      </div>

    </AppContext.Provider>
  )
}

export default App
