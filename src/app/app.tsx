import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home';
import Auth from './auth/auth';
import Header from './header/header';
import Profile from './profile/profile';
import * as firebase from 'firebase/app';
import { AuthService } from './auth/auth.service';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

const firebaseConfig = {
  apiKey: 'AIzaSyCvOl89ZyF5e8PLY1taIB26z9XxBJ2lY4I',
  authDomain: 'frontend-app-41dcf.firebaseapp.com',
  databaseURL: 'https://frontend-app-41dcf.firebaseio.com',
  projectId: 'frontend-app-41dcf',
  storageBucket: '',
  messagingSenderId: '618980611373',
  appId: '1:618980611373:web:aefa75ff5cfd5c20596fa4',
  measurementId: 'G-JRCKQJW2B5',
};

firebase.initializeApp(firebaseConfig);

function App() {
  const sessionUser: User | null = AuthService.getSessionUser();
  const [user, setUser] = useState(sessionUser);

  useEffect(() => {
    const authSubscription: Subscription = AuthService.getAuth().subscribe((authUser) => {
      setUser(authUser);
    });

    return function cleanup() {
      authSubscription.unsubscribe();
    };
  }, []);

  return (
    <div className='App'>
      <Header></Header>
      <main className='content'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
          <ProtectedRoute user={user} path='/profile' exact component={Profile} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
