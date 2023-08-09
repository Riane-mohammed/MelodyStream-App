import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import './App.css';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import ArtistPage from './pages/ArtistPage/ArtistPage';

function App() {

  return (
    <>
      <Router>
        <div>
          <header>
            <Navbar />
          </header>
          <section className="content">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home/ArtistPage" element={<ArtistPage />} />
              <Route path="/home" element={<Home />} />
            </Routes>
            <Player />
          </section>
        </div>
      </Router>
    </>
  );
}

export default App;