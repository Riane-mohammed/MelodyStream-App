import React from 'react'
import './SongsHeader.css'

const SongsHeader = () => {
    return (
        <div className='songsHeader d-flex justify-content-between'>
            <div className='d-flex firt-part'>
                <p className='mx-4'>#</p>
                <p>Title</p>
            </div>
            <i className='bx bx-time fs-4 me-4'></i>
        </div>
    )
}

export default SongsHeader