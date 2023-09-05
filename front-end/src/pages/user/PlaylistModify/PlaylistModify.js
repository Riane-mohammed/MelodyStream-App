import React, { useState, useEffect } from 'react';
import PlayHeader from '../../../components/Playlistcomponents/PlayHeader/PlayHeader'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import './PlaylistModify.css'


const PlaylistModify = () => {
    const { playlistid } = useParams();
    const [songs, setSongs] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedSongs, setDisplayedSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [allSongsFiltred, setAllSongsFiltred] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/songs`)
            .then(response => response.json())
            .then(data => {
                setAllSongs(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

        const fetchPlaylistData = async () => {
            try {
                const [songsResponse, playlistResponse] = await Promise.all([
                    axios.get(`http://localhost:8081/Songs/${playlistid}`),
                    axios.get(`http://localhost:8081/Playlist/${playlistid}`)
                ]);

                setSongs(songsResponse.data);
                setPlaylist(playlistResponse.data[0]);
                setLoading(false);

                const filteredSongs = allSongs.filter((allSong) =>
                    !songs.some((playlistSong) => playlistSong.song_id === allSong.song_id)
                );
                setAllSongsFiltred(filteredSongs);

            } catch (error) {
                console.error('Error fetching playlist data:', error);
                setLoading(false);
            }
        };

        if (playlistid) {
            fetchPlaylistData();
        }
        
const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === '') {
        setDisplayedSongs([]); 
    } else {
        const filteredSongs = allSongsFiltred.filter(
            (song) => song.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedSongs(filteredSongs);
    }
};



    const deleteSongFromPlay = (songId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this song ?'
        );
        if (confirmDelete) {
            axios
                .delete(`http://localhost:8081/songFromPlay/${songId}/${playlistid}`)
                .then(() => {
                    fetchPlaylistData();
                })
                .catch((error) => {
                    console.error('Error deleting song:', error);
                });
        }
    };

    const AddMusicToPlay = (songid) => {
        axios.post(`http://localhost:8081/addSongToPlay`, {
            playlistId: playlistid,
            songId: songid
        })
            .then(response => {
            })
            .catch(error => {
                console.error('Error save song:', error);
            });
    };

    return (
        <>{!loading ? (
            <div className='artist-content'>
                <PlayHeader image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} date={playlist.created_at.substring(0, 4)} number={songs.length} />
                <div className='ms-3 ms-sm-5 my-5'>
                    <li className="search-box">
                        <i className="bx bx-search icon"></i>
                        <input
                            type="text"
                            placeholder="Search ..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </li>
                    {displayedSongs.map((song) => (
                        <div key={song.song_id} className='row mx-5 mt-2 PlaylistSongInfo' >
                            <div className='col text-start'>
                                <div className='fw-bold'>{song.title}</div>
                                <div className='artist-subs'>{song.username}</div>
                            </div>
                        <div className='col me-2 d-flex align-items-center justify-content-end fw-bold'>
                            <button className='btn btn-primary' onClick={() => AddMusicToPlay(song.song_id)}>
                                <i className='bx bx-plus text-white'></i>
                            </button>
                        </div>
                        </div>
                    ))}
                </div>
                <div className='songsHeader d-flex justify-content-between'>
                    <div className='d-flex firt-part'>
                        <p className='mx-4'>#</p>
                        <p>Title</p>
                    </div>
                    <p className='me-3'>Delete</p>
                </div>
                {songs.map((song, index) => (
                    <div key={song.song_id} className='row mx-5 mt-2 PlaylistSongInfo' >
                        <div className='col-1 d-flex align-items-center justify-content-center fw-bold'>{index + 1}</div>
                        <div className='col text-start'>
                            <div className='fw-bold'>{song.title}</div>
                            <div className='artist-subs'>{song.username}</div>
                        </div>
                        <div className='col me-2 d-flex align-items-center justify-content-end fw-bold'>
                            <button className='btn btn-danger' onClick={() => deleteSongFromPlay(song.song_id)}>
                                <i className='bx bx-trash text-white'></i>
                            </button>
                        </div>
                    </div>
                ))}

                <div className='bottomPage'></div>
            </div >
        ) :
            ''
        }
        </>
    )
};

export default PlaylistModify