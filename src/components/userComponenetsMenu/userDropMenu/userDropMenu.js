import React, { useState, useEffect, useRef } from 'react';
import SingleUserItem from '../singleUserItem/SingleUserItem';

const UserDropMenu = () => {
    const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleAvatarDropdown = () => {
        setShowAvatarDropdown(!showAvatarDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowAvatarDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`dropdown ${showAvatarDropdown ? 'show' : ''}`}>
            <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" onClick={handleToggleAvatarDropdown} aria-expanded={showAvatarDropdown ? 'true' : 'false'}>
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                />
            </a>
            <ul
                className={`dropdown-menu dropdown-menu-end drop-left ${showAvatarDropdown ? 'show' : ''}`}
                aria-labelledby="navbarDropdownMenuAvatar"
                style={{ backgroundColor: 'var(--sidebar-color)' }}
            >
                <SingleUserItem item='Profile'/>
                <SingleUserItem item='Settings'/>
                <SingleUserItem item='Logout'/>
            </ul>
        </div>
    );
};

export default UserDropMenu;
