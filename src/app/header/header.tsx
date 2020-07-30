import React from 'react';
import StatusInfo from '../status-info/status-info';
import Menu from '../menu/menu';
import JSLogo from '../../assets/images/js-logo.svg';

import './header.scss';

function Header() {

  return (
    <header className='primary-header'>
      <div className='header-content flex content'>
        <div className='logo-wrapper'>
          <img slot='icon' className='btn-icon' alt='JS logo' src={JSLogo} />
        </div>
      </div>
      <StatusInfo></StatusInfo>
      <Menu></Menu>
    </header>
  );
}

export default Header;
