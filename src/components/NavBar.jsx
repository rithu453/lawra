import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleBackClick = () => {
        const userConfirmed = window.confirm("Do you want to go back to login page?");
        if (userConfirmed) {
            window.location.href = "https://www.charakan.info/";
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='top'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#" onClick={handleBackClick}>LAWRA</Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        onClick={toggleNavbar}
                        aria-controls="navbarNavDropdown" 
                        aria-expanded={isOpen ? "true": "false"} 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AboutUs">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/assist">Research assistant</Link>
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
}

export default NavBar;
