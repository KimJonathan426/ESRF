import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import ErrorModal from '../ErrorModal';
import './Auth.css';

const LoginForm = () => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));

    if (data) {
      setValidationErrors(data);
      setShowErrorModal(true);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='page-outer-black'>
      <div className='login-left-side'>
        <div className='login-image-container'>
          <img className='login-image' src='https://g.espncdn.com/lm-static/fba/images/fans-cheering.png'></img>
          <div className='left-side-text'><span>&nbsp; Welcome to Entert</span>ainment and Sports <span>Recreation</span>al Fantasy!</div>
          <div className='right-side-text top-text'>Compete against friends with ESRF Fantasy League Manager!</div>
          <div className='right-side-text mid-text' >Create a league with your family and friends!</div>
          <div className='right-side-text bottom-text'>Make fantasy a reality where you can be your own player!</div>
        </div>
      </div>
      <div className='login-right-side'></div>
      <div className='login-container'>
        <form className='login-form-container' onSubmit={onLogin}>
          <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
          <div className='login-input-container login-email-container'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-input-container login-password-container'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='login-btn-container'>
            <button className='login-btn-resize login-btn' type='submit'>Login</button>
            <div>
              Don't have an account?
              <Link to='/sign-up'> Register Here</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
