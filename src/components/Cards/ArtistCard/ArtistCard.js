import React from 'react'
import './ArtistCard.css'

const ArtistCard = (props) => {
    return (
        <div className="ArtistCard">
            <div className="ArtistCard-image">
                <img src={props.image} className='rounded-circle' />
            </div>
            <p className="ArtistCard-title">{props.title}</p>
            <p className="ArtistCard-body">Artist</p>
        </div>
    )
}

export default ArtistCard