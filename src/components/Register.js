import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';  // To navigate to other pages
import axios from 'axios';  // To make HTTP requests

import './login.css';  // Include your CSS

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',  // Add a confirm password field
  });

  const navigate = useNavigate();  // React Router hook to navigate

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (Register)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Send POST request to Spring Boot backend for registration
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      console.log('Registration successful:', response.data);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Register"
          />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Register</p>
          </div>

          {/* Registration Form Inputs */}
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              name="email"
              size="lg"
              value={formData.email}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              name="password"
              size="lg"
              value={formData.password}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              id="formControlLg"
              type="password"
              name="confirmPassword"
              size="lg"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" size="lg" type="submit">Register</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Already have an account?{' '}
                <a href="#!" onClick={() => navigate('/Login')} className="link-danger">Login</a>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">Copyright © 2020. All rights reserved.</div>
      </div>
    </MDBContainer>
  );
}

export default Register;



