import React from 'react'
import logo from '../../../assets/images/logo.png';
import './NavHeader.css'

function NavHeader() {
    return (
        <header>
            <div className="image-text">
            <span className="image">
                <img src={logo} />
            </span>

            <div className="text logo-text">
                <span className="name">MelodyStream</span>
                <span className="comment">RMR Platform</span>
            </div>
            </div>
        </header>
    )
}

export default NavHeader