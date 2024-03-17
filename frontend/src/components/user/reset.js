import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(`/password/reset/${token}`, { password });
      setMessage(response.data.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reset Token:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter reset token"
              value={token}
              onChange={handleTokenChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
        </form>
        {message && (
          <div className={`alert alert-${success ? 'success' : 'danger'} mt-3`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
