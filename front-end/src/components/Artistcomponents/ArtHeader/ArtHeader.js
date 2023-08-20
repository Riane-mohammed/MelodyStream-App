import React from 'react'
import './ArtHeader.css'

function ArtHeader(props) {
    return (
        <div className='ArtHeader d-flex align-items-center'>
            <div className='image'>
                <img src={props.image} />
            </div>
            <div className='sideContent ms-5 '>
                <div className='d-flex align-items-center'>
                    <i className={`bx ${props.icon} fs-4 text-primary me-1`}></i>
                    <p className='m-0'>{props.type}</p>
                </div>
                <h1>{props.name}</h1>
                <p>{props.subtitle}</p>
            </div>
        </div>
    )
}

export default ArtHeader