// Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../../styles/profilesidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSession } from '../../hooks/useSession'
const ProfileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { logOut } = useSession()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setExpanded(false);
  };

  const handleRolesClick = () => {
    setExpanded(!expanded); // Toggle the expanded state for Roles
  };

  return (
    <>
      <button onClick={toggleSidebar} className="burger-btn">
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="close-btn">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Opciones</h2>
        <ul>
          <li onClick={handleRolesClick} className="menu-item">
            Roles
            {expanded && (
              <ul className="sub-menu">
                <li>Admin</li>
                <li>Editor</li>
                <li>Viewer</li>
              </ul>
            )}
          </li>
          <hr/>
          <li>
            <Link to="/" className="linkCerrarSesion" onClick={logOut}>
              Cerrar Sesión{' '}
            </Link>
            </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileSideBar;
