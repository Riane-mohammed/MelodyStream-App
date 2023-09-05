import React from 'react'
import logo from '../../../assets/images/logo.png';
import './NavHeader.css'

function NavHeader() {
    return (
        <header>
            <div className="image-text">
                <span className="imageuser">
                    <img src={logo} />
                </span>
            </div>
        </header>
    )
}

export default NavHeader