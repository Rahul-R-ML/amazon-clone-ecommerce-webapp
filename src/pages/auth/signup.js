import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { getUsers, validateEmail } from '../../utils/auth';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

function signUp() {
  const [signUpDetails, setSignUpDetails] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    checkLogin: false,
  });
  const [error, setError] = useState({
    usernameError: null,
    passwordError: null,
    confirmPasswordError: null,
    emailError: null,
    phoneError: null,
  });
  const [globalError, setGlobalError] = useState(null);
  const { signup, login } = useContext(AuthContext);
  const router = useRouter();

  const handleSignUp = (signUpDetails) => {
    if (
      signUpDetails.username === '' ||
      signUpDetails.password === '' ||
      signUpDetails.confirmPassword === '' ||
      signUpDetails.email === '' ||
      signUpDetails.phone === ''
    ) {
      setError({
        usernameError:
          signUpDetails.username === '' ? 'Username is required' : null,
        passwordError:
          signUpDetails.password === '' ? 'Password is required' : null,
        confirmPasswordError:
          signUpDetails.confirmPassword === ''
            ? 'Confirm Password is required'
            : null,
        emailError: signUpDetails.email === '' ? 'Email is required' : null,
        phoneError: signUpDetails.phone === '' ? 'Phone is required' : null,
      });

      return;
    }
    if (signUpDetails.password !== signUpDetails.confirmPassword) {
      setError({
        confirmPasswordError: 'Password and Confirm Password should match',
      });
      return;
    }
    if (!validateEmail(signUpDetails.email)) {
      setError({
        emailError: 'Invalid Email',
      });
      return;
    }
    const users = getUsers();
    const user = users.find((user) => {
      return (
        user.username === signUpDetails.username ||
        user.email === signUpDetails.email
      );
    });
    if (user) {
      setGlobalError('Username or Email already exists');
      return;
    }
    signup({
      username: signUpDetails.username,
      password: signUpDetails.password,
      email: signUpDetails.email,
      phone: signUpDetails.phone,
    });
    if (signUpDetails.checkLogin) {
      login(signUpDetails.username, signUpDetails.password);
      router.push('/');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <>
      <Header />
      <div className='min-h-[100vh] flex justify-center shadow-xl'>
        <div className='login flex flex-col w-[400px] m-auto  gap-6  rounded-md p-3 shadow-sm'>
          <div className='login__username flex gap-2 flex-col'>
            <label htmlFor='username'>Username:</label>
            <input
              className='ring-2 ring-[#ff9900] rounded-md p-2'
              id='username'
              type='text'
              onChange={(e) => {
                if (error.usernameError)
                  setError({ ...error, usernameError: null });
                if (globalError) setGlobalError(null);
                setSignUpDetails({
                  ...signUpDetails,
                  username: e.target.value,
                });
              }}
              value={signUpDetails.username}
            ></input>
            {error.usernameError && (
              <p className='text-red-400'>{error.usernameError}</p>
            )}
          </div>
          <div className='flex gap-2 flex-col'>
            <label htmlFor='email'>Email:</label>
            <input
              className='ring-2 ring-[#ff9900] rounded-md p-2'
              id='username'
              type='text'
              onChange={(e) => {
                if (error.emailError) setError({ ...error, emailError: null });
                if (globalError) setGlobalError(null);

                setSignUpDetails({
                  ...signUpDetails,
                  email: e.target.value,
                });
              }}
              value={signUpDetails.email}
            ></input>
            {error.emailError && (
              <p className='text-red-400'>{error.emailError}</p>
            )}
          </div>
          <div className='flex gap-2 flex-col'>
            <label htmlFor='phone'>Phone no:</label>
            <input
              className='ring-2 ring-[#ff9900] rounded-md p-2'
              id='username'
              type='text'
              onChange={(e) => {
                if (error.phoneError) setError({ ...error, phoneError: null });
                if (globalError) setGlobalError(null);

                setSignUpDetails({
                  ...signUpDetails,
                  phone: e.target.value,
                });
              }}
              value={signUpDetails.phone}
            ></input>
            {error.phoneError && (
              <p className='text-red-400'>{error.phoneError}</p>
            )}
          </div>
          <div className='login__password flex gap-2 flex-col'>
            <label htmlFor='password'>Password:</label>
            <input
              className='ring-2 ring-[#ff9900] rounded-md p-2'
              id='password'
              type='password'
              onChange={(e) => {
                if (error.passwordError)
                  setError({ ...error, passwordError: null });
                if (globalError) setGlobalError(null);
                setSignUpDetails({
                  ...signUpDetails,
                  password: e.target.value,
                });
              }}
              value={signUpDetails.password}
            ></input>
            {error.passwordError && (
              <p className='text-red-400'>{error.passwordError}</p>
            )}
          </div>
          <div className='login__password flex gap-2 flex-col'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input
              className='ring-2 ring-[#ff9900]  rounded-md p-2'
              id='password'
              type='password'
              onChange={(e) => {
                if (error.confirmPasswordError)
                  setError({ ...error, confirmPasswordError: null });
                if (globalError) setGlobalError(null);
                setSignUpDetails({
                  ...signUpDetails,
                  confirmPassword: e.target.value,
                });
              }}
              value={signUpDetails.confirmPassword}
            ></input>
            {error.confirmPasswordError && (
              <p className='text-red-400'>{error.confirmPasswordError}</p>
            )}
          </div>
          {globalError && (
            <p className='text-red-400 text-center'>{globalError}</p>
          )}
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <input
                type={'checkbox'}
                onClick={() =>
                  setSignUpDetails({
                    ...signUpDetails,
                    checkLogin: !signUpDetails.checkLogin,
                  })
                }
              />
              <label>Login</label>
            </div>
            <div>
              have an account?
              <a className='link ml-2' href='/auth/login'>
                login
              </a>
            </div>
          </div>
          <div className='flex'>
            <button
              type='submit'
              className='btn'
              onClick={() => handleSignUp(signUpDetails)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default signUp;
