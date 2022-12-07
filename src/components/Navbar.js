import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// import { useHistory } from 'react-router-dom';
function Navbar(){
    const navigate = useNavigate();
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    const [path, setPath] = useState('')

    const logout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to logout?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result)=>{
            if(result.isConfirmed){
                localStorage.setItem('token','')
                navigate('/login')
                window.location.reload();
            }
        })
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setUser(JSON.parse(localStorage.getItem('user')))
        const pathname = window.location.pathname
        setPath(pathname)
    },[]);

    return(
        <div>
        <h3 className="logo-sm d-md-none d-sm-block">HR MANAGEMENT</h3>
        <nav className="navbar navbar-expand navbar-light bg-light">
            <h3 className="logo d-none d-md-block">HR MANAGEMENT</h3>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                
                <ul className="navbar-nav">
                {token?
                    <>
                        <li className="nav-item active">
                            <a className={path=="/"? `nav-link active-link`:`nav-link`} href="/">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className={path=="/timesheet"? `nav-link active-link`:`nav-link`} href="/timesheet">Timesheet</a>
                        </li>
                        {user.role=='admin'?
                        <>
                            <li className="nav-item active">
                                <a className={path=="/dashboard"? `nav-link active-link`:`nav-link`} href="/dashboard">Dashboard</a>
                            </li>
                            <li className="nav-item active">
                                <a className={path=="/utilization"? `nav-link active-link`:`nav-link`} href="/utilization">Utilization</a>
                            </li>

                        </>
                            :''
                        }

                        <li className="nav-item">
                            <a className="nav-link" onClick={logout}>Logout</a>
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