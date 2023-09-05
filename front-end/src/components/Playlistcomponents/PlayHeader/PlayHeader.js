import React from 'react'
import './PlayHeader.css'

const PlayHeader = (props) => {
    return (
        <div className='playHeader d-flex align-items-center'>
            <div className='imagePlay'>
                <img src={props.image} />
            </div>
            <div className='sideContent ms-5 '>
                <div className='d-flex align-items-center'>
                    <p>Album</p>
                </div>
                <h1>{props.title}</h1>
                <div className='d-flex align-items-center subs'>
                    {props.imageProfile ? (
                    <div className='imageProfilePlay'>
                        <img src={props.imageProfile} />
                    </div>
                    ) :''}
                    <p> {props.username} </p>
                    {props.date ? (
                    <>
                        <span> . </span>
                        <p> {props.date} </p>
                    </>
                    ) :''}
                    <span> . </span>
                    <p>{props.number} songs</p>
                </div>
            </div>
        </div>
    )
}

export default PlayHeader