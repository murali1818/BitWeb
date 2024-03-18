import './styles.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import {  Dropdown, Image, Form  } from 'react-bootstrap';
const allowedCategories = ['select catogery','Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books','vehicles'];
const Header = ({ isAuthenticated, user }) => {
  const person = user;
  console.log(person);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <img src={logo} alt="Your Logo" width="100" height="30" className="d-inline-block align-top" />
          <div >
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <Form.Select className="form-control me-2" style={{width: '300px',height: '40px ', fontSize: '1rem' ,color:'black',padding: '10px',marginRight:'10'}}>
                {allowedCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Form.Select>
                <form className="me-2 d-flex ">
                  <input className="form-control me-2" type="search" placeholder="Search" style={{ height: '40px', fontSize: '1.2rem' ,color:'black'}} />
                  <button className="btn" style={{width: '100px', padding: '5px',marginRight:'100px' }} type="submit">Search</button>
                </form>
                <Dropdown>
                  <Dropdown.Toggle style={{ height: '40px', padding: '5px' }}>
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
              </div>
            ) : (
              <div className="d-flex align-items-center">
                  <Link to="/login" className="btn" id="login_btn">Login to accces all features</Link>
              </div>
              
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
