import React from 'react'
import './btn-square.css'

function BtnSquare(props) {
    return (
        <button className='btnSquare'>
            {props.btnContent}
        </button>
    )
}

export default BtnSquare