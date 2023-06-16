import React from 'react'
import { duration } from 'utils'

const Timestamp = ({ timestamp }) => <p className="hint">{ duration(timestamp - 1) }</p>

export default Timestamp