import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/login', { email, password });
            setLoading(false);
            onLogin();
            navigate('/')
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message || 'An error occurred during login.');
        }
    }
    return (
        <Fragment>
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form onSubmit={submitHandler} className="shadow-lg">
                            <h1 className="mb-3 text-center">Login</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'LOGIN'}
                            </button>

                            <div className="text-center mt-4">
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                            </div>
                        </form>
                        <div className="text-center mt-4">
                        <p>Or login with:</p>
                        <div>
                            <button className="btn btn-primary mx-1 hover-effect"><FontAwesomeIcon icon={faGoogle} /></button>
                            <button className="btn btn-primary mx-1 hover-effect"><FontAwesomeIcon icon={faLinkedin} /></button>
                            <button className="btn btn-primary mx-1 hover-effect"><FontAwesomeIcon icon={faGithub} /></button>
                        </div>
                    </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Login;
