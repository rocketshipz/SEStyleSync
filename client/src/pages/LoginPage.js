import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/styles.css';
import '../css/signup.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'password123') {
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      {/* NAVBAR (copy from your HTML) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            <img src="assets/images/baner-right-image-03.jpg" alt="Logo" style={{ height: '100%', width: '150px' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* LOGIN FORM */}
      <div className="center-section">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className='bx bxs-user-circle'></i>
            </div>

            <div className="input-box">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                id="togglePassword"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              ></i>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn">Login</button>

            <div className="register-link">
              <p>Don't have an account? <Link to="/signup">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
