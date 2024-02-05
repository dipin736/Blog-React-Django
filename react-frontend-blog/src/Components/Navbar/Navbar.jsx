import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const navbarStyle = {
    background: 'linear-gradient(to right, #141e30, #243b55)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <>
      <BootstrapNavbar style={navbarStyle}>
        <Container>
          <BootstrapNavbar.Brand as={Link} to={'/Home'}  style={{ color: 'white' }}>
            Blog
          </BootstrapNavbar.Brand>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/add/" style={{ color: 'white' }}>
                  Add Post
                </Nav.Link>
                <Nav.Link onClick={logout} style={{ color: 'white' }}>
                  Logout
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }}>{user.username}</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/Home" style={{ color: 'white' }}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/' style={{ color: 'white' }}>
                  About
                </Nav.Link>
                <Nav.Link as={Link} to='/' style={{ color: 'white' }}>
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to='/' style={{ color: 'white' }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/register/' style={{ color: 'white' }}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
