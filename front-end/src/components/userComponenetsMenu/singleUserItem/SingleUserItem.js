import React from 'react'
import './SingleUserItem.css'
import { Link } from 'react-router-dom'

function SingleUserItem(props) {
    return (
        <li>
            <Link to={props.link} className="dropdown-item" style={{color: 'var(--text-color)' }}>
                {props.item}
            </Link>
        </li>
    )
}

export default SingleUserItem