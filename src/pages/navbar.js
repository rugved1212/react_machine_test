import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <div>MovieDb</div>
      <ul>
        <li><Link to="/">Popular</Link></li>
        <li><Link to="/upcoming">Upcoming</Link></li>
        <li><Link to="/toprated">Toprated</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;