import React from 'react'
import './ArtistCard.css'
import { Link } from 'react-router-dom'

const ArtistCard = (props) => {
    return (
        <Link to='ArtistPage'>
            <div className="ArtistCard">
                <div className="ArtistCard-image">
                    <img src={props.image} className='rounded-circle' />
                </div>
                <p className="ArtistCard-title">{props.title}</p>
                <p className="ArtistCard-body">Artist</p>
            </div>
        </Link>
    )
}

export default ArtistCard