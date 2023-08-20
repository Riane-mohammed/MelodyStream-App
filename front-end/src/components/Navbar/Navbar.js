import { NavHeader, NavbarSearch , NavbarLink , NavFooter} from './index'
import './Navbar.css';

const Navbar = () => {

    return (
        <nav className='sidebar'>
            <NavHeader />
            <div className="menu-bar">
                <div className="menu">
                    <NavbarSearch />
                    <ul className="menu-links ps-0">
                        <NavbarLink link='' name='Home' icon='bx-home-alt'/>
                        <NavbarLink link='tracks' name='tracks' icon='bx-time-five'/>
                        <NavbarLink link='Recommendations' name='Recommendations' icon='bx-headphone'/>
                        <NavbarLink link='My Playlists' name='My Playlists' icon='bxs-playlist'/>
                        <NavbarLink link='Following' name='Following' icon='bx-user'/>
                        <NavbarLink link='Likes' name='Likes' icon='bx-heart'/>
                    </ul>
                </div>
                <NavFooter />
        </div>
        </nav>
    );
};

export default Navbar;
