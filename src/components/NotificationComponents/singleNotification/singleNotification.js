import React from 'react'
import './SingleNotification.css'

const SingleNotification = (props) => {
  return (
    <li>
        <p className="dropdown-item" style={{color: 'var(--text-color)' }}>
        {props.DropNotification}
        </p>
    </li>
  )
}

export default SingleNotification