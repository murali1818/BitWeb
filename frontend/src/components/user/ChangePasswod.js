import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords don't match");
      return;
    }
    try {
      const response = await axios.post('/changepassword', { oldpassword: oldPassword, password: newPassword });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/myprofile'); 
      }, 2000);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="card p-4">
        <h2 className="text-center mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Old Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Change Password</button>
        </form>
        {message && (
          <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordForm;
