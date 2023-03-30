import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import Header from '../../components/Header';

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    usernameError: null,
    passwordError: null,
  });
  const [globalError, setGlobalError] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const handleAuthentication = (loginDetails) => {
    if (loginDetails.username === '' || loginDetails.password === '') {
      setError({
        usernameError:
          loginDetails.username === '' ? 'Username is required' : null,
        passwordError:
          loginDetails.password === '' ? 'Password is required' : null,
      });

      return;
    }
    // const validusers = [
    //   {
    //     username: 'iamrahulrnair',
    //     password: 'iamrahulrnair',
    //   },
    //   {
    //     username: 'rahulr',
    //     password: 'rahulr',
    //   },
    //   { username: 'admin', password: 'admin' },
    // ];
    // const user = validusers.find(
    //   (user) => loginDetails.username === user.username
    // );
    // if (!user) {
    //   setGlobalError('Invalid Username or Password');
    //   return;
    // }
    // if (user.password !== loginDetails.password) {
    //   setGlobalError('Invalid Username or Password');
    //   return;
    // }

    const user = login(loginDetails.username, loginDetails.password);
    console.log(user);
    if (!user) {
      setGlobalError('Invalid Username or Password');
      return;
    } else {
      toast('Login Successful', { type: 'success' });
      router.push('/');
    }
  };
  return (
    <>
      <Header />
      <div className='h-[100vh] flex justify-center shadow-xl'>
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

                setLoginDetails({ ...loginDetails, username: e.target.value });
              }}
              value={loginDetails.username}
            ></input>
            {error.usernameError && (
              <p className='text-red-400'>{error.usernameError}</p>
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
                setLoginDetails({ ...loginDetails, password: e.target.value });
              }}
              value={loginDetails.password}
            ></input>
            {error.passwordError && (
              <p className='text-red-400'>{error.passwordError}</p>
            )}
          </div>
          {globalError && (
            <p className='text-red-400 text-center'>{globalError}</p>
          )}
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <input type={'checkbox'} />
              <label>Remember me</label>
            </div>
            <div>
              Don't have an account?
              <a className='link ml-2' href='/auth/signup'>
                Sign Up
              </a>
            </div>
          </div>
          <div className='flex'>
            <button
              type='submit'
              className='btn'
              onClick={() => handleAuthentication(loginDetails)}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
