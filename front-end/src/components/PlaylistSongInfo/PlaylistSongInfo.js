import React from 'react'
import './PlaylistSongInfo.css'
import { useStateProvider } from '../../utils/StateProvider';

const PlaylistSongInfo = (props) => {
    const { dispatch } = useStateProvider();
    
    const handleClick = () => {
        dispatch({ type: "SET_MUSIC_ID", payload: props.songId });
    };

    return (
        <div className='row mx-5 mt-2 PlaylistSongInfo' onClick={handleClick}>
            <div className='col-1 d-flex align-items-center justify-content-center fw-bold'>{props.index}</div>
            <div className='col text-start'>
                <div className='fw-bold'>{props.title}</div>
                <div className='artist-subs'>{props.artist}</div>
            </div>
            <div className='col me-2 d-flex align-items-center justify-content-end fw-bold'>{props.duration}</div>
        </div>
    )
}

export default PlaylistSongInfo