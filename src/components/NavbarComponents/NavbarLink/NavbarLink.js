function NavbarLink(props) {
    return (
        <li className="nav-link">
            <a href="#">
                <i className={`bx ${props.icon} icon`} ></i>
                <span className="text nav-text">{props.link}</span>
            </a>
        </li>
)}

export default NavbarLink