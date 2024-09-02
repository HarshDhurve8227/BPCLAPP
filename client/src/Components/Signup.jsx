import axios from 'axios';
import React, { useState } from 'react';
import './Product.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState(''); // State for the security code
  const [error, setError] = useState(''); // State for error message

  // Define the correct security code
  const correctSecurityCode = '12345'; // Replace with your actual security code

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (securityCode !== correctSecurityCode) {
      setError('Invalid security code');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/register', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(data); // Log the response data if needed
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      alert('Error registering user');
    }
  };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5 custom-table-body">Create an account</h2>

                  <form onSubmit={handleSubmit}>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    {/* Security Code Input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                        placeholder="Security Code"
                        required
                      />
                      <label className="form-label" htmlFor="form3Example5cg">Security Code</label>
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>} {/* Display error message */}

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3cg">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/" className="fw-bold text-body"><u>Login here</u></a></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
