import React from 'react'
import './SingleUserItem.css'

function SingleUserItem(props) {
    return (
        <li>
            <a className="dropdown-item" href="#" style={{color: 'var(--text-color)' }}>
                {props.item}
            </a>
        </li>
    )
}

export default SingleUserItem