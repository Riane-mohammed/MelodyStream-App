import React from 'react'
import './MusicCard.css'
import { useStateProvider } from '../../../utils/StateProvider';

const MusicCard = (props) => {
    const { dispatch } = useStateProvider();

    const handleClick = () => {
        dispatch({ type: "SET_MUSIC_ID", payload: props.songId });
    };

    return (
        <div className="MusicCard" onClick={handleClick}>
            <div className="MusicCard-image">
                <img src={props.image} />
            </div>
            <p className="MusicCard-title">{props.title}</p>
            <p className="MusicCard-body">{props.subtitle}</p>
        </div>
    )
}

export default MusicCard