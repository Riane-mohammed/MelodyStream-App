import { NavHeader , NavbarLink, NavFooter } from './index';
import './Navbar.css';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className='sidebar'>
            <NavHeader />
            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links ps-0">
                        <NavbarLink link='' name='Home' icon='bx-home-alt' currentPath={location.pathname} />
                        <NavbarLink link='Songs' name='Songs' icon='bx-music' currentPath={location.pathname} />
                        <NavbarLink link='Playlists' name='Playlists' icon='bxs-playlist' currentPath={location.pathname} />
                        <NavbarLink link='Artists' name='Artists' icon='bx-user-check' currentPath={location.pathname} />
                        <NavbarLink link='MyLibrary' name='My Library' icon='bx-library' currentPath={location.pathname} />
                        <NavbarLink link='Following' name='Following' icon='bx-user' currentPath={location.pathname} />
                        <NavbarLink link='Likes' name='Likes' icon='bx-heart' currentPath={location.pathname} />
                    </ul>
                </div>
                <NavFooter />
            </div>
        </nav>
    );
};

export default Navbar;
