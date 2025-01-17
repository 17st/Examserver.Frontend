// GoogleLoginComponent.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = ({ onSuccess, onFailure }) => {
  const clientId = '196206181599-pgheg8o4nr2tkm0am8u6hh11kg0sgm11.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="google-login-container">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          size="large"
          theme="outline"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
