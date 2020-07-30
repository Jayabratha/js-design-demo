import React, { useEffect } from 'react';
import Form from './form/form';
import 'firebase/auth';
import { HeaderService } from '../header/header.service';
import { AuthService } from './auth.service';
import { useHistory } from 'react-router';

import './auth.scss';

function Auth() {
  const history = useHistory();

  useEffect(() => {
    const user = AuthService.getSessionUser();
    if (user) {
      history.push('/profile');
    } else {
      HeaderService.setHeaderContent({
        primaryText: 'Let\'s Start',
        secondaryText: 'Continue with your choice of Sign In option',
        isHome: false,
      });
    }
  });

  return (
    <div>
      <div className='login-container'>
        <Form />
      </div>
    </div>
  );
}

export default Auth;
