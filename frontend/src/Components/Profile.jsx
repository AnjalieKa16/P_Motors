import React, { useContext } from 'react';
import { StoreContext } from './Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();

  if (!user) return <div>Profile not found.</div>;

  return (
    <div className="profile-edit">
      <h2>My Profile</h2>
      <div className="profile-edit-form">
        <div className="profile-photo-section">
          <img
            src={user.photoUrl || '/default-profile.png'}
            alt="Profile"
            className="profile-photo"
          />
        </div>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;