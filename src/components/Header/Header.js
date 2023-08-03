import React, { useState } from 'react';
import './Header.css';
import NotificationDropMenu from '../NotificationComponents/notificationDropMenu/notificationDropMenu';
import UserDropMenu from '../userComponenetsMenu/userDropMenu/userDropMenu';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleDropdown}
            aria-label="Toggle navigation"
            >
            <i className={showDropdown ? 'bx bx-x' : 'bx bx-menu'}></i>
            </button>

            <div className={`collapse navbar-collapse ${showDropdown ? 'show' : ''}`} id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="#" style={{color: 'var(--text-color)' }}>
                            Create Playlist +
                        </a>
                    </li>
                </ul>
            </div>

            <div className="d-flex align-items-center">
                <NotificationDropMenu />
                <UserDropMenu />
            </div>
        </div>
        </nav>
    );
    };

export default Header;
