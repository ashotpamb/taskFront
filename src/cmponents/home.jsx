import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from "../api/api"


const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');

    if (cleaned.length > 0) {
      let formattedValue = '';

      if (cleaned.length < 4) {
        formattedValue = `(${cleaned}`;
      } else if (cleaned.length < 7) {
        formattedValue = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      } else {
        formattedValue = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }

      setFormData({ ...formData, phoneNumber: formattedValue });
    } else {
      setFormData({ ...formData, phoneNumber: '' });
    }
  };

  const handlePhoneChange = (e) => {
    formatPhoneNumber(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber.replace(/[-()]/g, ''),
          address: formData.address
      };
      console.log(JSON.stringify(formattedData));      

      const response = await register(formattedData);

    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          minLength={3}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          minLength={3}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          className="form-control"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input  
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">Sign In</button>
      <Link to="/login" className="btn btn-secondary mr-2">Go to Login</Link>

    </form>
  );
};

export default UserForm;
