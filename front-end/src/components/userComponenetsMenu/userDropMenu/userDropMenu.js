import React, { useState, useEffect, useRef } from 'react';
import SingleUserItem from '../singleUserItem/SingleUserItem';
import axios from 'axios';
import { useStateProvider } from '../../../utils/StateProvider';


const UserDropMenu = () => {
    const userid = localStorage.getItem("userId");
    const { dispatch } = useStateProvider();
    const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
    const [user, setUser] = useState([]);
    const dropdownRef = useRef(null);

    const handleToggleAvatarDropdown = () => {
        setShowAvatarDropdown(!showAvatarDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowAvatarDropdown(false);
        }
    };

    const handleLogOut = (event) => {
        localStorage.removeItem("userId");
        dispatch({ type: "SET_ID", payload: 0 });
        window.location.reload();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/users/${userid}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [userid]);

    return (
        <div ref={dropdownRef} className={`dropdown ${showAvatarDropdown ? 'show' : ''}`}>
            <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" onClick={handleToggleAvatarDropdown} aria-expanded={showAvatarDropdown ? 'true' : 'false'}>
                <img
                    src={`http://localhost:8081/uploads/images/profiles/${user.profileImage}`}
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
                <SingleUserItem item='Profile' link='profile'/>
                <SingleUserItem item='Settings'/>
                <li>
                    <button  className="dropdown-item" style={{color: 'var(--text-color)' }} onClick={handleLogOut}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default UserDropMenu;
