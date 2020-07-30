import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import AnimateList from '../components/list/list';

import './menu.scss';
import { AuthService } from '../auth/auth.service';

function Menu() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const user = AuthService.getSessionUser();

  function toggleShowMenu() {
    if (showMenu) {
      setShowMenu(!showMenu);
      setTimeout(() => {
        setActiveMenu(!showMenu);
      }, 300);
    } else {
      setActiveMenu(!showMenu);
      setTimeout(() => {
        setShowMenu(!showMenu);
      }, 100);
    }
  }

  function logOut() {
    toggleShowMenu();
    AuthService.setAuth(null);
    firebase.auth().signOut();
  }

  return (
    <div className={`menu ${showMenu ? 'open' : ''}`}>
      <div className='content'>
        <div className='background'></div>
        <button className={`menu-icon-btn ${activeMenu ? 'active' : ''} ${showMenu ? 'close' : ''}`}
          onClick={toggleShowMenu}>
          <div className='menu-icon-background'></div>
          <div className='menu-icon'>
            <div className='menu-bar top'>
              <div className='dot'></div>
              <div className='dot'></div>
            </div>
            <div className='menu-bar bottom'>
              <div className='dot'></div>
              <div className='dot'></div>
            </div>
          </div>
        </button>
        <AnimateList animate={showMenu} interval='600'>
          <nav key='first' className='main-content list-item' >
            <ul className='menu-list'>
              <AnimateList animate={showMenu} interval='200'>
                <li key='first' className='list-item bold'>Profiles</li>
                <li key='second' className='list-item bold'>Find Jobs</li>
                <li key='third' className='list-item bold'>Learn</li>
                <li key='fourth' className='list-item bold'>Share</li>
              </AnimateList>
            </ul>
          </nav>
          <div key='second' className='footer-content list-item'>
            {user &&
              <div className='logout'>
                <div>Privacy Policy</div>
                <div>Settings</div>
                <div onClick={logOut}>Logout</div>
              </div>
            }
            <div>Developed and Designed with <span className='heart'>&hearts;</span> by</div>
            <div><a href='https://jayabratha.com'>Jayabratha</a> &amp; Venky</div>
          </div>
        </AnimateList>
      </div>
    </div>
  );
}

export default Menu;
