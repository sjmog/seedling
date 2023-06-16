import React from 'react'
import GenericEmbed from 'react-embed'

import { getUrlExtension } from 'utils'

const Embed = ({ url, className }) => {
  const embedComponent = (url) => {
    return <GenericEmbed {...{url}} />
  }

  return <div className={`Embed ${className}`}>
           { embedComponent(url) }
         </div>
}

Embed.defaultProps = {
  className: null
}

export default Embed