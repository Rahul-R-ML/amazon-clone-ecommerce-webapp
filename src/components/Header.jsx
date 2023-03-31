import Image from 'next/image';
import Sidebar from './Sidebar';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
// import { useSession, signIn, signOut } from 'next-auth/react';

import { AuthContext } from '../contexts/authContext';
import Dropdown from './Dropdown';

function Header(props) {
  const router = useRouter();
  const { session, loading, logout } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const items = useSelector(selectItems);
  if (loading) return null;

  return (
    <>
      <header className='sticky top-0 z-50'>
        {/* Top Nav */}
        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
          <div className='mr-5 mt-2 flex items-center flex-grow sm:flex-grow-0'>
            <Image
              src='https://links.papareact.com/f90'
              onClick={() => router.push('/')}
              width={150}
              height={40}
              alt='Amazon-mock-Logo'
              objectFit='contain'
              className='cursor-pointer active:transform active:scale-90'
            />
          </div>

          {/* Custom search bar */}
          <div className='hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer'>
            <input
              type='text'
              className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none'
              placeholder={
                router.route === '/'
                  ? '🔎 Search in products listed below…'
                  : ''
              }
              onInput={(event) =>
                router.route === '/' && props.onSearchValue(event.target.value)
              }
            />
            <SearchIcon className='h-12 p-4' />
          </div>

          {/* Right */}
          <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
            <div className='link' onClick={() => router.push('/orders')}>
              <p>Returns</p>
              <p className='font-extrabold md:text-sm'>& Orders</p>
            </div>
            <div
              onClick={() => router.push('/checkout')}
              className='relative link flex items-center'
            >
              <span
                className={`absolute top-0 right-0 md:right-10 h-4 ${
                  items.length >= 10 ? 'w-6' : 'w-4'
                } bg-yellow-400 text-center rounded-full text-black font-bold`}
              >
                {items.length}
              </span>
              <ShoppingCartIcon className='h-10' />

              <p className='hidden md:inline font-extrabold md:text-sm mt-2'>
                Basket
              </p>
            </div>
            <div
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              className='hover:text-[#ff9900] cursor-pointer flex justify-center items-center flex-col'
            >
              <p>{session ? `Hello, ${session.username}` : ''}</p>
              <p className='font-extrabold md:text-sm'>
                {session?.username ? 'Account' : 'Login'}
              </p>
              {showMenu && (
                <Dropdown
                  content={
                    session
                      ? [
                          { heading: 'settings', onClick: () => {} },
                          { heading: 'logout', onClick: logout },
                        ]
                      : [
                          {
                            heading: 'Sign In',
                            onClick: () => router.push('/auth/login'),
                          },
                          {
                            heading: 'Sign Up',
                            onClick: () => router.push('/auth/signup'),
                          },
                        ]
                  }
                  show={showMenu}
                  setShow={setShowMenu}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
          <p
            className='link flex items-center'
            onClick={() => (sidebar ? setSidebar(false) : setSidebar(true))}
          >
            <MenuIcon className='h-6 mr-1' />
            All
          </p>
          <p className='link'>Prime Video</p>
          <p className='link'>Amazon-mock Business</p>
          <p className='link'>Today's Deals</p>
          <p className='link hidden lg:inline-flex'>Electronics</p>
          <p className='link hidden lg:inline-flex'>Foods & Grocery</p>
          <p className='link hidden lg:inline-flex'>Prime</p>
          <p className='link hidden lg:inline-flex'>Buy Again</p>
        </div>
      </header>

      {sidebar ? <Sidebar /> : null}
    </>
  );
}

export default Header;
