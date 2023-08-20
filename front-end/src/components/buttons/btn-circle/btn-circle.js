import React from 'react'
import './btn-circle.css'

function BtnCircle(props) {
    return (
        <button className='btn btn-primary rounded-circle m-5 btn-circle'>
            <i className={`bx ${props.icon} text-white fs-1`}></i>
        </button>
    )
}

export default BtnCircle