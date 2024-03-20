import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import Home from './components/Home';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import Login from './components/user/login';
import Profile from './components/user/myprofile';
import Logout from './components/user/logout';
import Register from './components/user/register';
import Dashboard from './components/user/Dashboard';
import ForgotPassword from './components/user/fogot';
import ChangePasswordForm from './components/user/ChangePasswod';
import AddProduct from './components/product/addproduct';
import MyProduct from './components/product/myproducts';
import NotReady from './components/layout/notready';
import EditProduct from './components/product/edit';
import ProductDetails from './components/product/productdetails';
import MyBids from './components/product/bid';
import Watchlist from './components/product/watchlist';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const storedAuth = Cookies.get('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);
  const handleLogin = async () => {
    setIsAuthenticated(true);
    Cookies.set('isAuthenticated', true, { expires: 7 }); 
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('isAuthenticated');
  };
  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated}/>
        <div>
          <ToastContainer></ToastContainer>
          <Routes>
            <Route path='/' element={<Home isAuthenticated={isAuthenticated} />}/>
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
            <Route path='/register' element={<Register></Register>} />
            <Route path='/password/forgot' element={<ForgotPassword/>}/>
            <Route path='/myprofile' element={<Profile/>} />
            <Route path='/Dashboard' element={<Dashboard/>} />
            <Route path="/myprofile/changepassword" element={<ChangePasswordForm/>} />
            <Route path="/addproduct" element={<AddProduct/>} />
            <Route path="/myproduct" element={<MyProduct/>} />
            <Route path="/myprofile/edit" element={<NotReady/>} />
            <Route path="/watchlist" element={<Watchlist/>} />
            <Route path="/productdetails/:id" element={<ProductDetails/>} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
            <Route path="/mybids" element={<MyBids/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
