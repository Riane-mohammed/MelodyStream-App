import React from 'react'
import './LikePlaylistsCard.css'
import { Link } from 'react-router-dom'
import img from '../../../assets/images/playlist-covers/playlists-like.jpg'

const LikePlaylistsCard = () => {
    return (
        <Link to='Liked-Playlists'>
            <div className="LikePlaylistsCard ms-5">
                <div className="LikePlaylistsCard-image">
                    <img src={img} />
                </div>
                <p className="LikePlaylistsCard-title">Liked Playlist</p>
            </div>
        </Link>
    )
}

export default LikePlaylistsCard