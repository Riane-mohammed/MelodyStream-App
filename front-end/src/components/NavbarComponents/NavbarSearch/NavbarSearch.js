import './NavbarSearch.css';

function NavbarSearch() {
    const handleSearchClick = () => {
        console.log('hi')
    };
    return (
        <li className="search-box" onClick={handleSearchClick}>
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Search..." />
        </li>
    )
}

export default NavbarSearch