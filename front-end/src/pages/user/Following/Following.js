import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Following.css';
import FollowingArtistPage from '../../../components/FollowingArtistPage/FollowingArtistPage';

const Following = () => {
    const userid = localStorage.getItem('userId');
    const [followings, setFollowings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedFollowings, setDisplayedFollowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/getFollowings/${userid}`)
                .then(response => {
                    const followings = response.data.followings;
                    setFollowings(followings);
                    setDisplayedFollowings(followings);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching followings:', error);
                    setLoading(false);
                });
        }
    }, [userid]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        const filteredSongs = followings.filter(
            following => following.username.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedFollowings(filteredSongs);
    };

    return (
        <div className='following-page'>
            <h1 className='m-4 fw-bold' style={{ 'color': 'var(--blue)' }}>Following</h1>
                <div className='search ms-3 ms-sm-5 '>
                    <li className="search-box">
                        <i className="bx bx-search icon"></i>
                        <input
                            type="text"
                            placeholder="Search ..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </li>
                </div>
            <div className='following-container d-flex align-items-center mx-5'>
                {displayedFollowings.map((following, index) => (
                    <div
                        className='following-card d-flex flex-column justify-content-center align-items-center'
                        key={index}
                        onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
                    >
                        <div className='following-image'>
                            <img src={`http://localhost:8081/uploads/images/Profiles/${following.profileImage}`} alt={`Profile of ${following.username}`} />
                        </div>
                        <div className='following-name'>
                            <p>{following.username}</p>
                        </div>
                        {index === expandedIndex && (
                            <div className='arrow'></div>
                        )}
                    </div>
                ))}
            </div>
            {expandedIndex !== null && (
                <div className='following-info'>
                    <FollowingArtistPage artistid={followings[expandedIndex]?.id} />
                </div>
            )}
        </div>
    );
};

export default Following;
