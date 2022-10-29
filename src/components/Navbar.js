function Navbar(){
    return(
        <div>
        <nav className="navbar navbar-expand navbar-light bg-light">

            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/sign-in">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/sign-up">Sign Up</a>
                </li>
                {/* <li className="nav-item dropdown">
                    <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    >
                    Dropdown link
                    </a>
                    <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                    >
                    <a className="dropdown-item" href="#">
                        Action
                    </a>
                    <a className="dropdown-item" href="#">
                        Another action
                    </a>
                    <a className="dropdown-item" href="#">
                        Something else here
                    </a>
                    </div>
                </li> */}
                </ul>
            </div>
        </nav>
        </div>
    )
}

export default Navbar