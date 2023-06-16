import React, { Fragment } from 'react'

const Highlighted = ({ text, words }) => {
  const splitText = text.split(' ')

  return(
    <>
      {
        splitText.map((word, index) => (
          words.map(w => w.toLowerCase()).includes(word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
          ? <span key={index}>
              <span className="bg-yellow-50">{word}</span>
              { index !== splitText.length - 1 && <span> </span> }
            </span>
          : <span key={index}>
              <span>{word}</span>
              { index !== splitText.length - 1 && <span> </span> }
            </span>
        ))
      }
    </>
  )
}

export default Highlighted