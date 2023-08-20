import { Link } from "react-router-dom"

function NavbarLink(props) {
    return (
        <li className="nav-link">
            <Link to={props.link}>
                <i className={`bx ${props.icon} icon`} ></i>
                <span className="text nav-text">{props.name}</span>
            </Link>
        </li>
)}

export default NavbarLink