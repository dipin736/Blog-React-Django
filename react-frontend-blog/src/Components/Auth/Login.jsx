import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Form from 'react-bootstrap/Form';
import './login.css'

function Login() {
  useEffect
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the user is already authenticated, redirect them to the home page
    if (user) {
      navigate('/Home');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = 'http://127.0.0.1:8000/api/login/';

    try {
      const response = await axios.post(apiUrl, { username, password });

      // Assuming the server responds with user data on successful login
      const userData = response.data;

      // Set the user in the AuthContext
      login(userData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Incorrect username or password
        console.error('Login failed: Incorrect username or password');
        alert('Incorrect username or password');
      } else if (error.response && error.response.status === 400) {
        // Invalid credentials
        console.error('Login failed: Invalid credentials');
        alert('Invalid credentials');
      } else {
        // Other types of errors
        console.error('Login failed:', error);
        alert('An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
     <section className="vh-200 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <Form onSubmit={handleLogin}>
                    <Form.Group className="form-outline form-white mb-4">
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <Form.Label className="form-label">Username</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-outline form-white mb-4">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Label className="form-label">Password</Form.Label>
                    </Form.Group>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </Form>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to={'/register'} className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Login;
