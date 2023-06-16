import React, { useEffect } from'react'
import useFlash from 'hooks/useFlash'
import { Flash, Navigation } from './shared'
import { pure } from 'recompose'

const Main = (props) => {
  const { showFlash } = useFlash()

  useEffect(() => {
    if(props.flash) {
      Object
        .keys(props.flash)
        .forEach((key) => showFlash(
          null,
          props.flash[key],
          { type: key }
        ))
    }
  }, [props.flash])

  return(
    <div className="flex h-screen">
      <Navigation />

      { props.flash?.length > 0
        && <Flash flash={props.flash} /> }
        
      <main className="flex-1 overflow-hidden">
        Your app here!
      </main>
    </div>
  )
}

export default pure(Main)
