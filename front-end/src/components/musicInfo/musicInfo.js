import React from 'react'
import './musicInfo.css'
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';

function MusicInfo(props) {
    const userid = localStorage.getItem('userId');
    const { dispatch } = useStateProvider();
    
    const handleClick = () => {
        const songId = props.songId;

        axios.post(`http://localhost:8081/saveUserSong`, {
            userId: userid,
            songId: songId
        })
            .then(response => {
            })
            .catch(error => {
                console.error('Error save song:', error);
            });
        dispatch({ type: "SET_MUSIC_ID", payload: props.songId });
    };

    return (
        <div className='row mb-3 mx-5 music-info' onClick={handleClick}>
            <div className='col-1 d-flex align-items-center justify-content-end'>{props.index + 1}</div>
            <div className='col-2 song-img' ><img src={props.image} /></div>
            <div className='col text-start d-flex align-items-center'>{props.name}</div>
            <div className='col text-start d-flex align-items-center'>{props.PlayNumber}</div>
            <div className='col d-flex align-items-center justify-content-center'>{props.duration}</div>
        </div>
    )
}

export default MusicInfo