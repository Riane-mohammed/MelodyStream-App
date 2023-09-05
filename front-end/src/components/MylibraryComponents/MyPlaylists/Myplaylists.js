import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Myplaylists = (props) => {
    const userid = localStorage.getItem('userId');
    const [displayedPlaylists, setDisplayedPlaylists] = useState([]);
    const [myplaylists, setMyPlaylists] = useState([]);
    const [loadingMyplaylists, setLoadingMyplaylists] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlaylistData, setNewPlaylistData] = useState({
        title: '',
        coverImage: null,
    });

    useEffect(() => {
        if (userid) {
            fetch(`http://localhost:8081/allplaylists/${userid}`)
                .then((response) => response.json())
                .then((data) => {
                    setMyPlaylists(data);
                    setDisplayedPlaylists(data);
                })
                .catch((error) => console.error('Error fetching data:', error));
            setLoadingMyplaylists(false);
        }
    }, [userid]);

    useEffect(() => {
        if (myplaylists) {
            const filteredPlaylists = myplaylists.filter(
                (playlist) =>
                    playlist.title.toLowerCase().includes(props.query.toLowerCase())
            );
            setDisplayedPlaylists(filteredPlaylists);
        }
    }, [myplaylists, props.query]);

    const deletePlaylist = (playlistId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this playlist ?'
        );

        if (confirmDelete) {
            axios
                .delete(`http://localhost:8081/playlists/${playlistId}`)
                .then(() => {
                    setMyPlaylists(
                        myplaylists.filter(
                            (playlist) => playlist.playlist_id !== playlistId
                        )
                    );
                })
                .catch((error) => {
                    console.error('Error deleting song:', error);
                });
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewPlaylistData({
            title: '',
            coverImage: null,
        });
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNewPlaylistData({
            ...newPlaylistData,
            [name]: name === 'coverImage' ? files[0] : value,
        });
    };

    const createNewPlaylist = () => {
        const formData = new FormData();
        formData.append('title', newPlaylistData.title);
        formData.append('coverImage', newPlaylistData.coverImage);
        formData.append('created_by', userid);

        axios
            .post('http://localhost:8081/AddMyplaylists', formData)
            .then((response) => {
                closeModal();
            })
            .catch((error) => {
                console.error('Error creating playlist:', error);
            });
    };

    return (
        <>
            {!loadingMyplaylists ? (
                <>
                    <Button variant="primary" onClick={openModal}>
                        Add New Playlist
                    </Button>
                    <table>
                        {/* Table header */}
                        <thead>
                            <tr>
                                <td>Cover</td>
                                <td className="text-start">Title</td>
                                <td className="text-center">Likes</td>
                                <td className="text-center">Date</td>
                                <td className="text-center">Actions</td>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody>
                            {displayedPlaylists.map((playlist) => (
                                <tr key={playlist.playlist_id}>
                                    <td>
                                        <img
                                            src={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`}
                                            alt={playlist.name}
                                        />
                                    </td>
                                    <td className="text-start">
                                        {playlist.title}
                                    </td>
                                    <td className="text-center">likes</td>
                                    <td className="text-center">25 juillet</td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <Link to={`/ModifyPlaylist/${playlist.playlist_id}`} className="btn btn-info me-3">
                                            <i className="bx bx-edit-alt text-white"></i>
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deletePlaylist(
                                                    playlist.playlist_id
                                                )
                                            }
                                        >
                                            <i className="bx bx-trash text-white"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                ''
            )}

            {/* Modal */}
            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={newPlaylistData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cover Image:</label>
                            <input
                                type="file"
                                name="coverImage"
                                accept="image/*"
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createNewPlaylist}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Myplaylists;
