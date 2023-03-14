import { useState } from 'react';
import { login } from '../../utils/auth';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();
  return (
    <div>
      <h1>Sign In</h1>
      <div className='login flex flex-col gap-3'>
        <div className='login__username flex gap-2 '>
          <label htmlFor='username'>Username:</label>
          <input
            className='ring-1 ring-blue-500 rounded-md'
            id='username'
            type='text'
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, username: e.target.value });
            }}
            value={loginDetails.username}
          ></input>
        </div>
        <div className='login__password flex gap-2'>
          <label htmlFor='password'>Password:</label>
          <input
            className='ring-1 ring-blue-500 rounded-md'
            id='password'
            type='password'
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
            value={loginDetails.password}
          ></input>
        </div>
        <div>
          <button
            className='bg-blue-500 '
            onClick={() => {
              login(loginDetails.username, loginDetails.password);
              router.push('/');
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
