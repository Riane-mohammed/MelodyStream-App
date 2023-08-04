import React from 'react'
import './musicInfo.css'

function MusicInfo(props) {
    return (
        <div className='row mb-3 music-info'>
            <div className='col-1 d-flex align-items-center justify-content-end'>{props.index + 1}</div>
            <div className='col-2 song-img' ><img src={props.image} /></div>
            <div className='col text-start d-flex align-items-center'>{props.name}</div>
            <div className='col text-start d-flex align-items-center'>{props.PlayNumber}</div>
            <div className='col d-flex align-items-center justify-content-center'>{props.duration}</div>
        </div>
    )
}

export default MusicInfo