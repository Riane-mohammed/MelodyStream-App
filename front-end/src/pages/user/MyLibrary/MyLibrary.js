import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyLibrary.css';
import Search from '../../../components/Search/Search';
import Myplaylists from '../../../components/MylibraryComponents/MyPlaylists/Myplaylists';
import Mysongslist from '../../../components/MylibraryComponents/MySongs/MySongs';

const MyLibrary = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const userid = localStorage.getItem("userId");
    const [artist, setArtist] = useState();
    const [loadingArtist, setLoadingArtist] = useState(true);
    const [showMySongs, setShowMySongs] = useState(true);
    const [activeSection, setActiveSection] = useState('My Songs');
    const [showAddSongModal, setShowAddSongModal] = useState(false); // State to control the display of the add song modal
    const [newSongData, setNewSongData] = useState({
        title: '',
        album: '',
        genre: '',
        audioFile: null,
        imageFile: null,
    });

    const handleAddSongClick = () => {
        setShowAddSongModal(true);
    };

    const handleAddSongClose = () => {
        setShowAddSongModal(false);
        setNewSongData({
            title: '',
            album: '',
            genre: '',
            audioFile: null,
            imageFile: null,
        });
    };

    const handleNewSongInputChange = (event) => {
        const { name, value } = event.target;
        setNewSongData({
            ...newSongData,
            [name]: value,
        });
    };

    const handleNewSongAudioFileChange = (event) => {
        const file = event.target.files[0];
        setNewSongData({
            ...newSongData,
            audioFile: file,
        });
    };

    const handleNewSongImageFileChange = (event) => {
        const file = event.target.files[0];
        setNewSongData({
            ...newSongData,
            imageFile: file,
        });
    };

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/users/${userid}`)
                .then(response => {
                    setArtist(response.data);
                    setLoadingArtist(false);
                })
                .catch(error => {
                    console.error('Error fetching artists:', error);
                    setLoadingArtist(false);
                });
        }
    }, [userid]);

    const toggleSection = (sectionName) => {
        setShowMySongs(!showMySongs);
        setActiveSection(sectionName);
    };

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleAddSongSubmit = () => {
        const formData = new FormData();
        formData.append('title', newSongData.title);
        formData.append('album', newSongData.album);
        formData.append('genre', newSongData.genre);
        formData.append('audio', newSongData.audioFile);
        formData.append('image', newSongData.imageFile);

        axios.post(`http://localhost:8081/add-songs`, formData)
            .then((response) => {
                console.log('Song added successfully', response.data);
                handleAddSongClose();
            })
            .catch((error) => {
                console.error('Error adding song:', error);
            });
    };

    return (
        <>
            {!loadingArtist ? (
                <>
                    <div className="MyLibrary m-5">
                        <div className="cardHeader">
                            <ul className='d-flex'>
                                <li onClick={() => toggleSection('My Songs')}>
                                    <h3 className={activeSection === 'My Songs' ? 'active-section' : ''}>My Songs</h3>
                                </li>
                                <li onClick={() => toggleSection('My Playlists')}>
                                    <h3 className={activeSection === 'My Playlists' ? 'active-section' : ''}>My Playlists</h3>
                                </li>
                            </ul>
                        </div>
                        <div className='search ms-5'>
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
                        <div className={showMySongs ? 'mySongs' : 'mySongs d-none'}>
                            <Mysongslist query={searchQuery} />
                        </div>
                        <div className={showMySongs ? 'myPlaylists d-none' : 'myPlaylists'}>
                            <Myplaylists query={searchQuery} />
                        </div>
                    </div>
                    <div className='bottomPage'></div>
                </>
            ) : ''}
        </>
    )

};

export default MyLibrary;
