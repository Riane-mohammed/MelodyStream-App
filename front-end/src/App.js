import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/user/Home/Home';
import './App.css';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import ArtistPage from './pages/user/ArtistPage/ArtistPage';
import ProfileSection from './pages/user/Profile/profile';
import Login from './pages/Login/Login';
import AddMusic from './addmusic';
import axios from 'axios';
import Adminsidebar from './components/AdminSidebar/Adminsidebar';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import TopbarDash from './components/topbarDash/topbarDash';
import Users from './pages/admin/users/users';
import Songs from './pages/admin/Songs/Songs';

function App() {
  const userid = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
                <Route path="/playlists" element={<Users />} />
              </Routes>
            </section>
          </div>
          : (
          <div>
            <header>
              <Navbar />
            </header>
            <section className="content">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ArtistPage" element={<ArtistPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<ProfileSection />} />
                <Route path="/add" element={<AddMusic />} />
              </Routes>
              <Player />
            </section>
          </div>
        )}
      </Router>
    ) : <Login />}
    </>
  );
}

export default App;