import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MySongs.css';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/esm/Button';

const MySongs = (props) => {
    const userid = localStorage.getItem("userId");
    const [displayedSongs, setDisplayedSongs] = useState([]);
    const [artist, setArtist] = useState(userid);
    const [songs, setSongs] = useState(null);
    const [loadingsongs, setLoadingsongs] = useState(true);
    const [centredModal, setCentredModal] = useState(false);
    const [songToEdit, setSongToEdit] = useState(null);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [addSongModal, setAddSongModal] = useState(false); // Add new song modal state

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/allsongs/${userid}`)
                .then(response => {
                    setSongs(response.data);
                    setDisplayedSongs(response.data);
                    setLoadingsongs(false);
                })
                .catch(error => {
                    console.error('Error fetching songs:', error);
                    setLoadingsongs(false);
                });
        }
    }, [userid]);

    useEffect(() => {
        if (songs) {
            const filteredSongs = songs.filter(
                song => song.title.toLowerCase().includes(props.query.toLowerCase())
            );
            setDisplayedSongs(filteredSongs);
        }
    }, [songs, props.query]);


    const addNewSong = () => {
        setAddSongModal(true);
    };
    const handleNewSongTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleNewSongDurationChange = (event) => {
        setDuration(event.target.value);
    };

    const handleNewSongAudioChange = (event) => {
        setAudioFile(event.target.files[0]);
    };

    const handleNewSongImageChange = (event) => {
        setCoverImage(event.target.files[0]);
    };

    const submitNewSong = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('duration', duration);
        formData.append('audio', audioFile);
        formData.append('image', coverImage);

        axios.post(`http://localhost:8081/addSongs`, formData)
            .then(() => {
                setAddSongModal(false);
            })
            .catch(error => {
                console.error('Error adding new song:', error);
            });
    };

    const deleteSong = (songId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this song?');

        if (confirmDelete) {
            axios.delete(`http://localhost:8081/songs/${songId}`)
                .then(() => {
                    setSongs(songs.filter(song => song.song_id !== songId));
                })
                .catch(error => {
                    console.error('Error deleting song:', error);
                });
        }
    };

    return (
        <>
            {!loadingsongs ? (
                <>
                    <Button variant="primary" onClick={addNewSong}>
                        Add New Song
                    </Button>
                    <table>
                        <thead>
                            <tr>
                                <td>Cover</td>
                                <td className='text-start'>Title</td>
                                <td className='text-center'>views</td>
                                <td className='text-center'>Date</td>
                                <td className='text-center'>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayedSongs.map((song) =>
                                    <tr key={song.song_id}>
                                        <td><img src={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} alt={song.title} /></td>
                                        <td className='text-start'>{song.title}</td>
                                        <td className='text-center'>{song.views_count}</td>
                                        <td className='text-center'>25 juillet</td>
                                        <td className='d-flex justify-content-center'>
                                            <button className='btn btn-info me-3'>
                                                <i className='bx bx-edit-alt text-white'></i>
                                            </button>
                                            <button className='btn btn-danger' onClick={() => deleteSong(song.song_id)}>
                                                <i className='bx bx-trash text-white'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </>
            ) : ''}

            {/* Add New Song Modal */}
            <MDBModal tabIndex='-1' show={addSongModal} setShow={setAddSongModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add New Song</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setAddSongModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {/* Form for adding a new song */}
                            <div className='grid grid-cols-12 gap-4 gap-y-3'>
                                <div className="col-span-12 sm:col-span-12 ">
                                    <label htmlFor="TitleInput" className="form-label">Title</label>
                                    <input
                                        id="TitleInput"
                                        type="text"
                                        name="Title"
                                        value={title}
                                        onChange={handleNewSongTitleChange}
                                        className="form-control mb-3 "
                                        placeholder="Title"
                                        required
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-12">
                                    <label htmlFor="DurationInput" className="form-label">Duration</label>
                                    <input
                                        id="DurationInput"
                                        type="text"
                                        name="Duration"
                                        value={duration}
                                        onChange={handleNewSongDurationChange}
                                        className="form-control mb-3"
                                        placeholder="Duration"
                                        required
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-12">
                                    <label htmlFor="AudioInput" className="form-label">Audio</label>
                                    <input
                                        type="file"
                                        id="audioInput"
                                        accept="audio/*"
                                        onChange={handleNewSongAudioChange}
                                        className='mt-3 mb-5'
                                    />
                                </div>
                                <div className='image mx-auto'>
                                    <input
                                        type="file"
                                        id="imageInput"
                                        accept="image/*"
                                        onChange={handleNewSongImageChange}
                                        className='mt-3 mb-5'
                                    />
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className='btn btn-secondary' color='secondary' onClick={() => setAddSongModal(false)}>
                                Close
                            </button>
                            <button className='btn btn-primary' onClick={submitNewSong}>Add Song</button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default MySongs;
