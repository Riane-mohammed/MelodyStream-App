import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import './App.css';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import ArtistPage from './pages/ArtistPage/ArtistPage';
import ProfileSection from './pages/Profile/profile';
import Login from './pages/Login/Login';
import AddMusic from './addmusic';

function App() {
  const userid = localStorage.getItem("userId");
  console.log(`this is ${userid}`)


  return (
    <>{userid ? (
      <Router>
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
      </Router>
    ) : <Login />}
    </>
  );
}

export default App;