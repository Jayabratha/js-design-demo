import React from 'react';
import StatusInfo from '../status-info/status-info';
import Menu from '../menu/menu';

import './header.scss';

function Header() {

  return (
    <header className='primary-header'>
      <div className='header-content flex content'>
        <div className='logo-wrapper'></div>
      </div>
      <StatusInfo></StatusInfo>
      <Menu></Menu>
    </header>
  );
}

export default Header;
