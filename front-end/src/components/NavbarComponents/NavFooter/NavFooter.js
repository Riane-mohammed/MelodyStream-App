import React, { useState, useEffect } from 'react';
import './NavFooter.css'

function NavFooter() {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode((prevState) => !prevState);
    };

    useEffect(() => {
            if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        }, [isDarkMode]);

    return (
        <div className="bottom-content">
            <li className="mode" onClick={toggleDarkMode}>
                <div className="sun-moon">
                    <i className={`bx ${!isDarkMode ? 'bx-sun' : 'bx-moon'} icon`} />
                </div>
                <span className="mode-text text">{!isDarkMode ? 'Light mode' : 'Dark mode'}</span>

                <div className="toggle-switch">
                    <span className={`switch ${!isDarkMode ? 'dark' : ''}`} />
                </div>
            </li>
        </div>
    )
}

export default NavFooter