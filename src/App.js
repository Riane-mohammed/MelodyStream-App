import React from 'react';
import Navbar from './components/Navbar/Navbar';
// import Home from './pages/Home/Home';
import './App.css'
import Header from './components/Header/Header';
import Player from './components/Player/Player';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className="content">
        <Header />
        {/* <Home /> */}
        <Player />
      </section>
    </>
  );
}

export default App;

