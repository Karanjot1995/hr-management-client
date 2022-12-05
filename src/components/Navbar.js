import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
function Navbar(){
    const navigate = useNavigate();
    const [token, setToken] = useState('')

    const logout = () => {
        localStorage.setItem('token','')
        navigate('/login')
        window.location.reload();
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    },[]);

    return(
        <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
            <h3 className="logo">HR MANAGEMENT</h3>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                
                <ul className="navbar-nav">
                {token?
                    <>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => { if (window.confirm('Are you sure you want to logout?')) logout() } }>Logout</a>
                            {/* <a className="nav-link" onClick={logout}>Logout</a> */}
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/sign-up">Sign Up</a>
                        </li>
                    </>
                }
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