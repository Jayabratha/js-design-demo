import React, { useState } from 'react';
import GoogleLogo from '../../../assets/images/google.svg';
import LinkedinLogo from '../../../assets/images/linkedin.png';
import { HeaderService } from '../../header/header.service';
import { Formik, FormikValues, FormikActions } from 'formik';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import AnimateList from '../../components/list/list';
import '@jsdesign/jsd-input';
import '@jsdesign/jsd-button';
import 'firebase/auth';
import './form.scss';

function Form() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [submitText, setSubmitText] = useState('Continue');

  function validateForm(values: FormikValues) {
    const errors: any = {};
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (values.email) {
      if (emailPattern.test(values.email)) {
        if (showLogin) {
          if (!values.password) {
            errors.password = 'Please enter your password.';
          }
        } else if (showSignUp) {
          if (values.password) {
            if (values.confirmPassword) {
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'The passwords doesn\'t match.';
              }
            } else {
              errors.confirmPassword = 'The re-enter your password to confirm.';
            }
          } else {
            errors.password = 'Please enter your password.';
          }
        }
      } else {
        errors.email = 'Invalid email address.';
      }
    } else {
      errors.email = 'Please enter your email.';
    }

    return errors;
  }

  function continueToLogin() {
    setShowLogin(true);
    setSubmitText('Sign In');
    HeaderService.setHeaderContent({
      primaryText: 'Welcome back Jay',
      secondaryText: 'Please enter your password to proceed',
      isHome: false,
    });
  }

  function continueToSignUp() {
    setShowSignUp(true);
    setSubmitText('Sign Up');
    HeaderService.setHeaderContent({
      primaryText: 'Let\'s create your account',
      secondaryText: 'Please set a password for your account',
      isHome: false,
    });
  }

  function signInWithGoogle() {
    console.log('Google Sign In');
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((response: any) => {
      console.log(response);
      AuthService.setAuth(response.user);
    }).catch((error) => {
      console.log(error);
    });
  }

  function handleSubmit(values: FormikValues, actions: FormikActions<FormikValues>) {
    if (showLogin) {
      firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        .then((response) => {
          AuthService.setAuth(response.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (showSignUp) {
      firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      firebase.auth().fetchSignInMethodsForEmail(values.email).then((response) => {
        if (response.length) {
          if (response.length === 1 && response[0] === 'google.com') {
            signInWithGoogle();
          } else {
            continueToLogin();
          }
        } else {
          continueToSignUp();
        }
      }, (error) => {
        continueToSignUp();
      });
    }
    actions.setSubmitting(false);
  }

  return (
    <div className='login-form'>
      <AnimateList animate='true' interval='300' delay='200' disable={showLogin || showSignUp}>
        <div key='first'
          className={`signin-option-wrapper flex form-item list-item ${(showLogin || showSignUp) ? 'hide' : ''}`}>
          <jsd-button btn-style='secondary' icon='true' label='Google' full-width='true' onClick={signInWithGoogle}>
            <img slot='icon' className='btn-icon' alt='Google logo' src={GoogleLogo} />
          </jsd-button>
          <jsd-button btn-style='secondary' icon='true' full-width='true' label='Linkedin'>
            <img slot='icon' className='btn-icon' alt='Linkedin logo' src={LinkedinLogo} />
          </jsd-button>
        </div>
        <div key='second' className={`form-item list-item ${(showLogin || showSignUp) ? 'up' : ''}`}>
          {!(showLogin || showSignUp) && <div className='divider flex'><span>OR</span></div>}
          <Formik
            validateOnBlur={true}
            validateOnChange={false}
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <form id='authform' onSubmit={formik.handleSubmit}>
                  <jsd-input
                    type='email'
                    name='email'
                    placeholder='Please enter your email'
                    onInput={formik.handleChange}
                    value={formik.values.email}
                    label='email'
                    id='email'
                    formId='authform'
                    error-msg={formik.errors.email}
                    full-width='true'
                    required='true'
                    autofocus='true'
                  ></jsd-input>
                  {(showLogin || showSignUp) &&
                    <jsd-input className={`form-item ${(showLogin || showSignUp) ? 'show' : ''}`}
                      type='password'
                      name='password'
                      placeholder={showSignUp ? 'Set your password' : 'Please enter your password'}
                      onInput={formik.handleChange}
                      value={formik.values.password}
                      label='password'
                      id='password'
                      formId='authform'
                      full-width='true'
                      error-msg={formik.errors.password}
                    ></jsd-input>}
                  {showSignUp &&
                    <jsd-input className={`form-item ${showSignUp ? 'show' : ''}`}
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm your password'
                      onInput={formik.handleChange}
                      value={formik.values.confirmPassword}
                      label='confirm password'
                      id='confirm-password'
                      formId='authform'
                      full-width='true'
                      error-msg={formik.errors.confirmPassword}
                    ></jsd-input>}
                  <div style={{paddingTop: '15px'}}>
                    <jsd-button formId='authform' type='submit' full-width='true' label={submitText}></jsd-button>
                  </div>
                </form>
              );
            }}
          </Formik>
          {showLogin && <jsd-button tertiary label='Forgot you password?'></jsd-button>}
        </div>
      </AnimateList>
    </div>
  );
}

export default Form;
