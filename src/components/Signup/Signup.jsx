// SignUp.js
import React, { useState } from 'react';
import axios from '../../api/Axios';
import styles from './SignUp.module.css';
import { Link, useNavigate } from 'react-router-dom';

const SIGNUP_URL = '/register';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/;
  const phoneRegex = /^\+?1?\d{10}$/;
  const navigateTo = useNavigate();

  const validatePhoneNumber = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsChecked) newErrors.termsChecked = 'You must agree to the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        SIGNUP_URL,
        { username, email, password, confirmPassword, termsChecked },
      );
      if (!response.data.status) {
        setSignupMessage(response.data.message.join(", "));
      } else {
        navigateTo('/login');
      }
    } catch (error) {
      if (error.response.data.message) {
        setSignupError(error.response.data.message.join(", "));
      } else {
        setSignupError('Signup failed');
      }
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {signupError && <div className={styles.error}>{signupError}</div>}
          <div>
            <input
              type='text'
              id='username'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className={styles.error}>{errors.username}</div>}
          </div>
          <div>
            <input
              type='text'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <div>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              Agree to terms and conditions
            </label>
            {errors.termsChecked && <div className={styles.error}>{errors.termsChecked}</div>}
          </div>
          <button type='submit' disabled={loading}>
            {loading ? (
              <span>Loading...</span>
            ) : (
              'Sign Up'
            )}
          </button>
          <div>
            <Link to='/login'>Already have an account? </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
