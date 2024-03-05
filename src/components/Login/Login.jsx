import React, { useRef, useEffect, useContext, useState } from 'react'
import styles from './Login.module.css'
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/Axios'
import { Link, useNavigate } from 'react-router-dom';

const LOGIN_URL = '/login'
export const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigateTo('/dashboard');
    }
  }, [auth.isAuthenticated, navigateTo]);

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await axios.post(LOGIN_URL, { username, password });
      if (!response.data.status) {
        setLoginError(response.message ? response.message.join(", ") : 'Login failed');
      } else {
        setAuth({ ...response.data.status, isAuthenticated: true });
        navigateTo('/profile/dashboard');
      }
    } catch (error) {
      setLoginError(response.message ? response.message.join(", ") : 'Login failed');
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>
          {loginError && <div className={styles.error}>{loginError}</div>}
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
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <div>
            <label>
              <input
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>
          <button type='submit' disabled={loading}>
            {loading ? (
              <span>Loading...</span>
            ) : (
              'Login'
            )}
          </button>          <button type='button'><Link to="/signup">Sign Up</Link></button>
          <a href='#forgot-password'>Forgot password?</a>
        </form>
      </div>
    </section>
  );
};
