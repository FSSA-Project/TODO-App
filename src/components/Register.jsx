import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import '../App.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    terms: false,
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields
    if (!formData.username && !formData.email && !formData.password) {
      setMessage('Enter the credentials to register');
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      // Password validation rules
      if (formData.password.length < 8 || formData.password.length > 15) {
        newErrors.password = 'Password must be between 8 and 15 characters long';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!/[!@#$%^&*]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms & conditions';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const { email, username, password } = formData;

    setLoading(true);
    try {
      const response = await fetch('https://todo-app-wpbz.onrender.com/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name: username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage('Register successfully');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage(`Register failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Register failed: Network error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className='form-container-all'>
    <div className="form-container">
    {message && <span id="alert-message" className='alert-message'>{message}</span>}
      <h1>Join our task</h1>
      <p>Stay organized effortlessly: Your tasks, your way, every day.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            minLength={3}
            maxLength={12}
            placeholder="Username*"
            value={formData.username}
            onChange={handleChange}
            pattern="^[a-zA-Z0-9._]+$" title="Username should only contain letters, numbers, dots, and underscores."
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group form-group password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="sign-in-password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="grey" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M12 4.5C7.30558 4.5 3.40156 7.65747 1.5 12C3.40156 16.3425 7.30558 19.5 12 19.5C16.6944 19.5 20.5984 16.3425 22.5 12C20.5984 7.65747 16.6944 4.5 12 4.5ZM12 17.5C8.59887 17.5 5.68657 15.1835 4.5 12C5.68657 8.81648 8.59887 6.5 12 6.5C15.4011 6.5 18.3134 8.81648 19.5 12C18.3134 15.1835 15.4011 17.5 12 17.5ZM12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5ZM12 13.5C11.4477 13.5 11 13.0523 11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="grey" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M12 4.5C7.30558 4.5 3.40156 7.65747 1.5 12C3.40156 16.3425 7.30558 19.5 12 19.5C16.6944 19.5 20.5984 16.3425 22.5 12C20.5984 7.65747 16.6944 4.5 12 4.5ZM12 17.5C8.59887 17.5 5.68657 15.1835 4.5 12C5.68657 8.81648 8.59887 6.5 12 6.5C15.4011 6.5 18.3134 8.81648 19.5 12C18.3134 15.1835 15.4011 17.5 12 17.5ZM12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5ZM12 13.5C11.4477 13.5 11 13.0523 11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5ZM2.5 2.5L21.5 21.5L20.5 22.5L1.5 3.5L2.5 2.5Z" />
            </svg>
          )}
        </span>
        {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            I agree to the terms & conditions
          </label>
        </div>
        <button className='register-btn' type="submit" disabled={loading}>{loading ? <div class="loader"></div> : 'Sign Up' }</button>
      </form>
      <div className="separator">
        <span>OR</span>
      </div>
      <div className="social-buttons">
        <button className="social-button google"><span>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="25" width="60" viewBox="0 0 25 60" class="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
          </span>Sign in with Google</button>
      </div>
      <p className="login-link">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
    </div>
  );
};

export default RegisterForm;
