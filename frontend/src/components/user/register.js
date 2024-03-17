import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password and confirm password do not match.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('/register',{name,email,password});
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message || 'An error occurred during registration.');
            console.log(error)
        }
    }
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3 text-center register-heading">Register</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="name_field">Name<span className="required">*</span></label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email<span className="required">*</span></label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_field">Password<span className="required">*</span></label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password<span className="required">*</span></label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'REGISTER'}
                    </button>

                    <div className="text-center mt-4">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
