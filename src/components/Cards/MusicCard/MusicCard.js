import React from 'react'
import './MusicCard.css'

const MusicCard = (props) => {
    return (
        <div className="MusicCard">
            <div className="MusicCard-image">
                <img src={props.image} />
            </div>
            <p className="MusicCard-title">{props.title}</p>
            <p className="MusicCard-body">{props.subtitle}</p>
        </div>
    )
}

export default MusicCard 