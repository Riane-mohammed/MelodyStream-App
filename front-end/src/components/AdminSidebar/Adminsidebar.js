import { useStateProvider } from '../../utils/StateProvider';
import { NavHeaderAdmin, NavbarLink , NavFooter} from './index'
import './Navbar.css';

const Adminsidebar = () => {
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
                <div className="menu">
                    <ul className="menu-links ps-0">
                        <NavbarLink link='' name='Dashbord' icon='bx-home-alt'/>
                        <NavbarLink link='users' name='Users' icon='bx-user' />
                        <NavbarLink link='songs' name='Songs' icon='bx-music' />
                        <NavbarLink link='playlists' name='Playlists' icon='bxs-playlist' />
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
