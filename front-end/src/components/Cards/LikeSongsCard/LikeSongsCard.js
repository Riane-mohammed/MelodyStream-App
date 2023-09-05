import React from 'react'
import './LikeSongsCard.css'
import { Link } from 'react-router-dom'
import img from '../../../assets/images/playlist-covers/liked-songs.png'

const LikeSongsCard = () => {
    return (
        <Link to='Liked-Songs'>
            <div className="LikeSongsCard ms-5">
                <div className="LikeSongsCard-image">
                    <img src={img} />
                </div>
                <p className="LikeSongsCard-title">Liked Songs</p>
            </div>
        </Link>
    )
}

export default LikeSongsCard