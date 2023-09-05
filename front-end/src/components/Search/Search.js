import React, { useState } from 'react';
import './Search.css';

function Search({ onSearch, onSearchClick }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <li className="search-box">
            <i className="bx bx-search icon" onClick={() => onSearchClick(searchQuery)}></i>
            <input
                type="text"
                placeholder="Search ..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </li>
    );
}

export default Search;
