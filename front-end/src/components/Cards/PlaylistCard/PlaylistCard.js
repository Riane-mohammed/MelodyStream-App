import React from 'react'
import './PlaylistCard.css'
import { Link } from 'react-router-dom'

const PlaylistCard = (props) => {

    return (
        <Link to={`/Playlist/${props.playlistid}`}>
            <div className="PlaylistCard">
                <div className="PlaylistCard-image">
                    <img src={props.image} />
                </div>
                <p className="PlaylistCard-title">{props.title}</p>
                <p className="PlaylistCard-body">{props.subtitle}</p>
            </div>
        </Link>
    )
}

export default PlaylistCard