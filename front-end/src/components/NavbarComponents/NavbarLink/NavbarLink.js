import { Link } from "react-router-dom";

function NavbarLink(props) {
    const formattedCurrentPath = props.currentPath.startsWith('/') ? props.currentPath.slice(1) : props.currentPath;
    const isActive = formattedCurrentPath === props.link;

    return (
        <li className='nav-link'>
            <Link to={props.link} className={`${isActive ? 'active-link' : ''}`}>
                <i className={`bx ${props.icon} icon`} ></i>
                <span className="text nav-text">{props.name}</span>
            </Link>
        </li>
    );
}

export default NavbarLink;
