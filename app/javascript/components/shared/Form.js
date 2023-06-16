import React from 'react'

const Form = ({ className, onSubmit, children, params, inline }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    for (let [key, value] of formData.entries()) {
      if(key.slice(-2) === '[]') {
        // array param
        const existingArray = params[key] || []
        params = { ...params, [key]: [...existingArray, value] }
      } else {
        params = { ...params, [key]: value }
      }
    }

    onSubmit(params)
  }

  return(
    <form className={`Form ${ inline ? 'Form--inline' : '' } ${ className }`} onSubmit={handleSubmit}>
      { children }
    </form>
  )
}

Form.defaultProps = {
  params: {},
  inline: false,
  className: ''
}

export default Form