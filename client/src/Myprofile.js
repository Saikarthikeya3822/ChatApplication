import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import './Nav.css'; // Import the CSS file

const Nav = () => {
    const [token] = useContext(store);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to={token ? '/dashboard' : '/'}>
                        {token ? 'Dashboard' : 'TalkNest'}
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {!token ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                                :
                                null
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
