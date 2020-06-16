import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import '../App.css';


const NavBar = () => {

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/"><h1 className="navTitle">Book App</h1></Link>
                <Link to='info' className="link">Info</Link>
                <Link to='/about' className="link">About</Link>
            </div>
        </div>
    )
}

export default NavBar;