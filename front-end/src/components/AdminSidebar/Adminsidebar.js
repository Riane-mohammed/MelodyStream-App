import { useStateProvider } from '../../utils/StateProvider';
import { NavHeaderAdmin, NavbarLink , NavFooter} from './index'
import './Navbar.css';
import { useLocation } from 'react-router-dom';

const Adminsidebar = () => {
    const location = useLocation();
    const { dispatch } = useStateProvider();

    const handleLogOut = (event) => {
        localStorage.removeItem("userId");
        dispatch({ type: "SET_ID", payload: 0 });
        window.location.reload();
    };

    return (
        <nav className='sidebar'>
            <NavHeaderAdmin />
            <div className="menu-bar">
                <div className="menuAdmin">
                    <ul className="menu-links ps-0">
                        <NavbarLink link='' name='Dashbord' icon='bx-home-alt' currentPath={location.pathname}/>
                        <NavbarLink link='users' name='Users' icon='bx-user' currentPath={location.pathname}/>
                        <NavbarLink link='songs' name='Songs' icon='bx-music' currentPath={location.pathname}/>
                        <NavbarLink link='playlists' name='Playlists' icon='bxs-playlist' currentPath={location.pathname}/>
                        <NavbarLink link='orders' name='Orders' icon='bx-task' currentPath={location.pathname}/>
                        <li className="nav-link" style={{cursor : 'pointer'}} onClick={handleLogOut}>
                            <a>
                                <i class='bx bx-log-out icon'></i>
                                <span className="text nav-text">Log out</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <NavFooter />
        </div>
        </nav>
    );
};

export default Adminsidebar;
