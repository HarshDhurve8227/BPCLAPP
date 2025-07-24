import axios from 'axios';
import React, { useState } from 'react';
import './Signup.css';
import logo from './images/1723176521233.png';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');

  const correctSecurityCode = process.env.REACT_APP_SECURITY_CODE
  ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (securityCode !== correctSecurityCode) {
      setError('Invalid security code');
      return;
    }
    try {
      const { data } = await axios.post(
        'https://bpcl2024-a36b07a626d7.herokuapp.com/api/auth/register',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(data);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      alert('Error registering user');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <img src={logo} alt="BPCL Logo" className="signup-logo" />
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="text"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            placeholder="Security Code"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
          <p className="login-link">
            Already have an account? <a href="/">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
