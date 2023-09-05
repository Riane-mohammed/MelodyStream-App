import React,{useEffect,useRef,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/user/Home/Home';
import './App.css';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import ArtistPage from './pages/user/ArtistPage/ArtistPage';
import ProfileSection from './pages/user/Profile/profile';
import axios from 'axios';
import Adminsidebar from './components/AdminSidebar/Adminsidebar';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import TopbarDash from './components/topbarDash/topbarDash';
import Users from './pages/admin/users/users';
import Songs from './pages/admin/Songs/Songs';
import PlaylistPage from './pages/user/PlaylistPage/PlaylistPage';
import AllSongs from './pages/user/Songs/Songs';
import Playlists from './pages/user/Playlists/Playlists';
import MyLibrary from './pages/user/MyLibrary/MyLibrary';
import Following from './pages/user/Following/Following';
import Likes from './pages/user/Likes/Likes';
import Artists from './pages/user/Artists/Artists';
import PopularSongs from './pages/user/Popular-Songs/PopularSongs';
import Popularplaylists from './pages/user/Popular-playlists/Popularplaylists';
import PopularArtists from './pages/user/Popular-Artists/PopularArtists';
import LikedSongs from './pages/user/LikedSongs/LikedSongs';
import LikedPlaylists from './pages/user/LikedPlaylists/LikedPlaylists';
import LoginPage from './pages/Login/Login';
import RecentlyPlayed from './pages/user/RecentlyPlayed/RecentlyPlayed';
import Settings from './pages/user/Settings/Settings';
import PlaylistsAdmin from './pages/admin/Playlists/Playlists';
import Orders from './pages/admin/Orders/Orders';
import PlaylistModify from './pages/user/PlaylistModify/PlaylistModify';

function App() {
  const userid = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const navbarRef = useRef(null);

  useEffect(() => {
      if (userid) {
          axios.get(`http://localhost:8081/users/${userid}`)
              .then(response => {
                setUser(response.data);
                setLoading(false);
              })
              .catch(error => {
                console.error('Error fetching user profile:', error);
                setLoading(false);
              });
      }
  }, [userid]);
  const role = loading ? [] : user.Role;

  useEffect(() => {
    function handleResize() {
      setShowNavbar(window.innerWidth > 768);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowNavbar(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>{userid ? ( 
      <Router>
        {role === 1 ?
          <div>
            <header>
              <Adminsidebar />
            </header>
            <section className="content-admin">
              <TopbarDash />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/songs" element={<Songs />} />
                <Route path="/playlists" element={<PlaylistsAdmin />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </section>
          </div>
          : (
          <div>
            <header>
                {window.innerWidth <= 768 ? (
                  <>
                    {showNavbar && <Navbar ref={navbarRef} />}
                    <div className='navbtn' onClick={() => setShowNavbar(!showNavbar)}>
                      <i className='bx bx-menu fs-1'></i>
                    </div>
                  </>
                ) : (
                  <Navbar />
                )}
            </header>
            <section className="content">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Songs" element={<AllSongs />} />
                <Route path="/Playlists" element={<Playlists />} />
                <Route path="/Artists" element={<Artists />} />
                <Route path="/MyLibrary" element={<MyLibrary />} />
                <Route path="/Following" element={<Following />} />
                <Route path="/Likes" element={<Likes />} />
                <Route path="/Popular-Songs" element={<PopularSongs />} />
                <Route path="/Popular-Playlists" element={<Popularplaylists />} />
                <Route path="/Popular-Artists" element={<PopularArtists />} />
                <Route path="/Likes/Liked-Songs" element={<LikedSongs />} />
                <Route path="/Likes/Liked-Playlists" element={<LikedPlaylists />} />
                <Route path="/profile" element={<ProfileSection />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Artist/:artistId" element={<ArtistPage />} />
                <Route path="/Playlist/:playlistid" element={<PlaylistPage />} />
                <Route path="/ModifyPlaylist/:playlistid" element={<PlaylistModify />} />
                <Route path="/Playlist/Recently-Played" element={<RecentlyPlayed />} />
              </Routes>
              <Player />
            </section>
          </div>
        )}
      </Router>
    ) : <LoginPage />}
    </>
  );
}

export default App;