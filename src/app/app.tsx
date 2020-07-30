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
  apiKey: "AIzaSyCjF7fglP-ginVpANzcqnO9JH1becWRsGw",
  authDomain: "js-design-demo.firebaseapp.com",
  databaseURL: "https://js-design-demo.firebaseio.com",
  projectId: "js-design-demo",
  storageBucket: "js-design-demo.appspot.com",
  messagingSenderId: "1017411908622",
  appId: "1:1017411908622:web:798af4887d9507ebf6785f",
  measurementId: "G-2VNFYGM1XZ"
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
