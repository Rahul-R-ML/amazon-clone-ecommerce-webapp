import React, { useEffect } from 'react';
import styles from './styles/Dropdown.module.css';

export default function Dropdown({ show, setShow, content }) {
  useEffect(() => {
    const clickHandler = (e) => {
      if (
        e.target.classList.contains(styles.item) ||
        e.target.closest(`.${styles.item}`) !== null
      ) {
        setShow(true);
        return;
      }
      setShow(false);
    };
    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, []);
  return (
    <div className={styles.dropdown}>
      <div
        className={[styles.dropdown_menu, show ? styles.active : ''].join(' ')}
      >
        {content.map((item, index) => {
          return (
            <div onClick={item.onClick} className={[styles.item, ''].join(' ')}>
              <p>{item.heading}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
