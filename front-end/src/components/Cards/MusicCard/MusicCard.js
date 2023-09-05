import React from 'react';
import './MusicCard.css';
import { useStateProvider } from '../../../utils/StateProvider';
import axios from 'axios';

const MusicCard = (props) => {
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
        dispatch({ type: 'SET_MUSIC_ID', payload: props.songId });
    };

    return (
        <div className="MusicCard" onClick={handleClick}>
            <div className="MusicCard-image">
                <img src={props.image} alt={props.title} />
            </div>
            <p className="MusicCard-title">{props.title}</p>
            <p className="MusicCard-body">{props.subtitle}</p>
        </div>
    );
};

export default MusicCard;
