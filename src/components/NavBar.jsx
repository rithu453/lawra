import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleBackClick = () => {
        const userConfirmed = window.confirm("Do you want to go back to login page?");
        if (userConfirmed) {
            window.location.href = "https://charakan.info/";
        }
    };

    const handleNavToggle = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='top'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#" onClick={handleBackClick}>
                        LAWRA
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        aria-controls="navbarNavDropdown"
                        aria-expanded={!isNavCollapsed}
                        aria-label="Toggle navigation"
                        onClick={handleNavToggle}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={`navbar-collapse ${isNavCollapsed ? 'collapse': 'show'}`}
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AboutUs">About Us</Link>
                            </li>
                            <li
                                className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}
                                onClick={handleDropdownToggle}
                            >
                                <span className="nav-link dropdown-toggle" role="button">
                                    Students
                                </span>
                                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                    <li><Link className="dropdown-item" to="/assist">Research assistant</Link></li>
                                    <li><Link className="dropdown-item" to="/news">News</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chatbot">Chatbot</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
