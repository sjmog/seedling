import React, { useContext } from 'react'
import AppContext from 'contexts/AppContext'
import { useHistory } from 'react-router-dom'
import { destroy } from 'api'
import { classNames } from 'utils'

const Logout = React.forwardRef((props, ref) => {
  const { rootUrl, formToken } = useContext(AppContext)
  const history = useHistory()
  const Wrapper = props.as ? props.as : 'span'

  const afterLogout = () => {
    history.push('/')
  }

  const logout = (e) => {
    e.preventDefault()

    destroy(
      `${rootUrl}/users/sign_out`,
      { formToken },
      afterLogout,
      afterLogout
    )
  }


  return(
    <Wrapper
     ref={ref}
     className={classNames('relative', props.className)}>
      <a
       href="/users/sign_out"
       data-method="delete"
       rel="nofollow"
       className='block'>
        Sign out
      </a>
    </Wrapper>
  )
})

export default Logout
