import React, { useState } from 'react';
import './Header.css';
import NotificationDropMenu from '../NotificationComponents/notificationDropMenu/notificationDropMenu';
import UserDropMenu from '../userComponenetsMenu/userDropMenu/userDropMenu';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <div></div>

            <div className="d-flex align-items-center">
                <NotificationDropMenu />
                <UserDropMenu />
            </div>
        </div>
        </nav>
    );
    };

export default Header;
