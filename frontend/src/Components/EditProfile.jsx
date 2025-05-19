import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from './Context/StoreContext';
import './EditProfile.css';

const EditProfile = () => {
  const { url, token, user, setUser } = useContext(StoreContext);
  const [profile, setProfile] = useState(user);
  const [message, setMessage] = useState('');

  // Sync profile state with user context
  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/api/users/profile`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUser(res.data.data); // Update context
      setMessage('Profile updated!');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-edit">
      <h2>Edit Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={profile.firstName || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={profile.lastName || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={profile.phone || ''}
            onChange={handleChange}
          />
        </label>
        {/* Example: Add Address */}
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={profile.address || ''}
            onChange={handleChange}
          />
        </label>
        {/* Add more fields as needed */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;