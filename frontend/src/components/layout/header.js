import './styles.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'react-bootstrap'; // Import Form and Button from react-bootstrap

const Header = ({ isAuthenticated, user }) => {
  const person = user;
  console.log(person);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <img src={logo} alt="Your Logo" width="100" height="30" className="d-inline-block align-top" />
          <div className="col-12 col-md-2 mt-4 mt-md-0 text-center">
            
          </div>
          <div className="col-12 col-md-2 mt-4 mt-md-0 text-center">
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle style={{ alignItems: 'center', height: '40px', padding: '5px' }}>
                  <Image
                    src={'/images/image.png'}
                    roundedCircle
                    style={{ width: '30px', height: '30px', marginRight: '5px', marginLeft: '1px' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/myprofile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/myproduct">My products</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/addproduct">Add products</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/watchlist">Watch List</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="btn" id="login_btn">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
