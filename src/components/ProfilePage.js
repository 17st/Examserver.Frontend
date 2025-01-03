import React, { useState, useEffect } from 'react';
import api from "./api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRollNo, setShowRollNo] = useState(false);

  const indicatorStyle = { display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px' };

  const toggleRollNoVisibility = () => {
    setShowRollNo((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        // Send a GET request with the token in the Authorization header
        const response = await api.get('/users/get-user', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        });
        setUser(response.data); // User details fetched from the backend
      } catch (err) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  // Ensure `user` is not null before rendering
  if (!user) {
    return <div style={{ color: 'red', textAlign: 'center' }}>User details not available.</div>;
  }

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>User Profile</h2>
      <div style={{ lineHeight: '1.6', color: '#333' }}>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Name:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.userMailId}</p>
        <p>
          <strong>Roll No:</strong>
          {showRollNo ? (
            <span> {user.userRollNo}</span>
          ) : (
            <span> *******</span>
          )}
          <button 
            onClick={toggleRollNoVisibility} 
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              padding: '2px 8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: showRollNo ? '#ffdddd' : '#ddffdd', // Red for "Hide", Green for "Show"
            }}
          >
            {showRollNo ? 'Hide' : 'Show'}
          </button>
        </p>       
        <p><strong>School/College:</strong> {user.userSchoolOrCollege}</p>
        <p><strong>Rating:</strong> {user.userRating}</p>
        <p><strong>Rank:</strong> {user.userRank}</p>
        <p><strong>Mob:</strong> {user.userMob}</p>
        <p><strong>City:</strong> {user.userCity}</p>
      <p><strong>Status:</strong> <span style={{ ...indicatorStyle, backgroundColor: user.active ? 'green' : 'red' }}></span> {user.active ? 'Active' : 'Blocked'}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
