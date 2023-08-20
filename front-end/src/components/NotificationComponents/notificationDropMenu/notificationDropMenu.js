import React, { useState, useEffect, useRef } from 'react';
import SingleNotification from '../singleNotification/singleNotification';

const NotificationDropMenu = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`dropdown ${showDropdown ? 'show' : ''}`}>
            <a className="text-reset me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" onClick={handleToggleDropdown} aria-expanded={showDropdown ? 'true' : 'false'}>
                <i className="bx bx-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
            </a>
            <ul className={`dropdown-menu dropdown-menu-end drop-left ${showDropdown ? 'show' : ''}`} style={{ backgroundColor: 'var(--sidebar-color)' }} aria-labelledby="navbarDropdownMenuLink">
                <SingleNotification DropNotification="test1" />
                <SingleNotification DropNotification="test2" />
            </ul>
        </div>
    );
};

export default NotificationDropMenu;
