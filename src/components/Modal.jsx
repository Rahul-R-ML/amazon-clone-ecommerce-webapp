import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ setShowModal, onClose, children, title }) {
  const [modal, setModal] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleCloseClick = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  if (isBrowser) {
    return ReactDOM.createPortal(
      <div
        onClick={(e) => {
          if (e.target.closest('[data-modal]')) {
            // if a closest element with a data-modal attribute
            return;
          }
          setShowModal(false);
        }}
        className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,.4)] z-50'
      >
        <div data-modal className='bg-[#fff] w-[600px]  p-[25px] rounded-md'>
          <div className='flex justify-end text-[25px]'>
            <a
              className='hover:text-red-400 relative right-[20px]'
              href='#'
              onClick={handleCloseClick}
            >
              x
            </a>
          </div>
          <div className='flex flex-col gap-10'>
            {title && (
              <div className='text-green-500 relative  text-2xl after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-[35%] after:mt-4 after:h-[2px] after:bg-[#ff9900]'>
                {title}
              </div>
            )}
            <div>{children}</div>
          </div>
        </div>
      </div>,
      document.querySelector('#modal-root')
    );
  } else {
    return null;
  }
}
