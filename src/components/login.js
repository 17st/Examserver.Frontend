import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; // To navigate to other pages
import axios from 'axios';  // Axios for API calls
import './login.css';  // Include your CSS

function Login() {
  const [formData, setFormData] = useState({
    userNameOrEmail: '',
    userPass: '',
  });

  const [errorMessage, setErrorMessage] = useState('');  // To display error message
  const navigate = useNavigate();  // React Router hook to navigate

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  // Log the form data in JSON format

    try {
      // Make API call to backend login endpoint
      const response = await axios.get('http://localhost:8808/api/users/login_user', formData);

      if (response.data.success) {
        // If login is successful, navigate to the dashboard or home page
        console.log('Login successful');
        navigate('E:\React course\youtube_courses\src\components\Home.js');  // Redirect to home 
      } else {
        // If login failed, show error message
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // Navigate to the register page
  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Login"
          />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='google' />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          {/* Login Form Inputs */}
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="userNameOrEmail address"
              id="formControlLg"
              type="userNameOrEmail"
              name="userNameOrEmail"
              size="lg"
              value={formData.userNameOrEmail}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="userPass"
              id="formControlLg"
              type="userPass"
              name="userPass"
              size="lg"
              value={formData.userPass}
              onChange={handleChange}
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot userPass?</a>
            </div>

            {/* Display Error Message */}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" size="lg" type="submit">Login</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{' '}
                <a href="#!" onClick={goToRegister} className="link-danger">Register</a>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">Copyright © 2020. All rights reserved.</div>
        <div>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md" />
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="md" />
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="md" />
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='linkedin-in' size="md" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default Login;

