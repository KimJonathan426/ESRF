import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import ErrorModal from '../ErrorModal';
import './Auth.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoEmail = 'demo@email.com';
  const demoPassword = 'password';

  const demoLogin = async (e) => {
    await dispatch(login(demoEmail, demoPassword))
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, confirmedPassword));

    if (data) {
      setValidationErrors(data);
      setShowErrorModal(true);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='page-outer-white'>
      <div className='signup-left-side'>
        <div className='login-image-container'>
          <img className='login-image' src='https://g.espncdn.com/lm-static/fba/images/fans-cheering.png' alt='espn fantasy design'></img>
          <div className='left-side-text-switch'><span>&nbsp; Welcome to Entert</span>ainment and Sports <span>Recreation</span>al Fantasy!</div>
          <div className='right-side-text-switch top-text'>Compete against friends with ESRF Fantasy League Manager!</div>
          <div className='right-side-text-switch mid-text' >Create a league with your family and friends!</div>
          <div className='right-side-text-switch bottom-text'>Make fantasy a reality where you can be your own player!</div>
        </div>
      </div>
      <div className='login-right-side'></div>
      <div className='login-container'>
        <form className='login-form-container' onSubmit={onSignUp}>
          <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
          <div className='login-input-container signup-username-input'>
            <label>Username</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              placeholder='Username (Required)'
              value={username}
              maxLength='20'/>
          </div>
          <div className='login-input-container'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              placeholder='Email (Required)'
              value={email} />
          </div>
          <div className='login-input-container'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              placeholder='Password (Required)'
              value={password} />
          </div>
          <div className='login-input-container'>
            <label>Confirmed Password</label>
            <input
              type='password'
              name='confirmed_password'
              onChange={updateConfirmedPassword}
              placeholder='Confirmed Password (Required)'
              value={confirmedPassword} />
          </div>
          <div className='login-btn-container'>
            <button className='login-btn-resize' type='submit'>Sign Up</button>
            <div className='login-signup'>
              <div className='demo-login' onClick={demoLogin}>Demo Login</div>
              Already have an account?
              <Link to='/login'> Log-in Here</Link>
            </div>
          </div>
        </form>
      </div>
    </div >
  );
};

export default SignUpForm;
