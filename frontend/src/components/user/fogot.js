import React, { useState } from 'react';
import axios from 'axios';
import ResetPassword from './reset';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/password/forgot', { email });
      setMessage(response.data.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setSuccess(false);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div>
        {!showResetPassword && (
          <div className="card p-4">
            <h2 className="text-center mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
          </div>
        )}
        {success && !showResetPassword && (
          <div className="text-center mt-3"> {/* Centering the button */}
            <button className="btn btn-link" onClick={() => setShowResetPassword(true)}>Reset Password</button>
          </div>
        )}
        {showResetPassword && <ResetPassword />}
        {message && (
          <div className={`alert alert-${success ? 'success' : 'danger'} mt-3`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
