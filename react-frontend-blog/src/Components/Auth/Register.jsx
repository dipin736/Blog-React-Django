import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Form from 'react-bootstrap/Form';
import './register.css';  // Import your custom styling for the registration form

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = 'http://127.0.0.1:8000/api/register/';  // Adjust the API endpoint accordingly

    axios
      .post(apiUrl, { username, email, password })
      .then((response) => {
        console.log('Registration successful:', response.data);
        // Optionally, you may want to automatically log in the user after registration
        // login(response.data);
        navigate('/');
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle validation errors or other specific registration failures
          console.error('Registration failed:', error.response.data);
          alert('Registration failed. Please check your inputs.');
        } else {
          // Other types of errors
          console.error('Registration failed:', error);
          alert('An error occurred during registration');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="vh-150 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <Form onSubmit={handleRegistration}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in{' '}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{' '}
                      <Link to={'/'} href="#!" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
