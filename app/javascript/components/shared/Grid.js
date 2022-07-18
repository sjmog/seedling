import React, { useState, useEffect, useContext } from 'react'
import Loading from './Loading'
import { get } from 'api'
import AppContext from 'contexts/AppContext'

const Grid = (props) => {
  const { apiUrl, formToken, currentUser } = useContext(AppContext)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const fetchData = () => {
    setLoading(true)
    get(`${ apiUrl }${ props.url }`, (data) => {
      setData(data)
      setLoading(false)
    })
  }

  useEffect(fetchData, [])

  return(
    <div className="grid grid-cols-6 grid-rows-6 grid-flow-row-dense gap-5 py-4 px-4">
      { loading || isTransitioning
        ? <Loading
           loading={loading}
           { ...{ setIsTransitioning } } />
        : data.map((item, index) => <div
                                     key={index}>
                                     Item #{index}
                                    </div>) }
    </div>
  )
}

export default Grid