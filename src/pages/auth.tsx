import React, { Component } from 'react';
import Heading from 'layouts/Heading';
import AuthForm from 'components/AuthForm';
import { Firebase, wrapWithFirebase } from 'components/FirebaseContext';
import styled from 'styled-components';
import { breakpointLg, breakpointSm } from 'components/styles/auth.style';
import firebase from 'firebase';

const createAccountImg = require('static/undraw_auth_create_account.svg');
const signinImg = require('static/undraw_auth_sign_in.svg');

const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${breakpointLg}) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  height: 450px;
  width: 50%;
  align-self: center;

  @media screen and (max-width: ${breakpointLg}) {
    width: 80%;
  }

  @media screen and (max-width: ${breakpointSm}) {
    height: 100%;
    margin-top: 28px;
  }
`;

type AuthState = {
  email: string;
  password: string;
};

type AuthProps = {
  firebaseInstance: Firebase;
  location: any;
}

type FirebaseAuthError = {
  code: string;
  message: string;
};

type UserCredential = firebase.auth.UserCredential;

class Auth extends Component<AuthProps, AuthState> {

  state = {
    email: '',
    password: ''
  };

  onTextChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const { type, value } = e.currentTarget;

    this.setState(
      { [type]: value } as Pick<AuthState, keyof AuthState>
    );
  };

  onAuthButtonClick = (): void => {
    const location = this.props.location.state;
    const firebaseInstance = this.props.firebaseInstance;
    const isNewAccount = (location && location.isNewAccount) || false;
    const { email, password } = this.state;

    if (!email || !password) {
      return;
    }

    if (isNewAccount) {
      firebaseInstance
        .createUserWithEmailAndPassword(email, password)
        .then(this.handleUserCreation)
        .catch(this.handleAuthError);
    } else {
      firebaseInstance
        .signInWithEmailAndPassword(email, password)
        .then(this.handleUserSignIn)
        .catch(this.handleAuthError);
    }
  };

  handleAuthError = ({ code, message }: FirebaseAuthError): void => {
    switch (code) {
      case 'auth/invalid-email':
        alert('This email is invalid');
        break;
      case 'auth/weak-password':
        alert(message);
        break;
      case 'auth/network-request-failed':
        alert('Check your internet connection and try again');
        break;
      case 'auth/wrong-password':
        alert(message);
        break;
      case 'auth/user-not-found':
        alert(message);
        break;
      default:
        alert('An unknown error occurred, please try again');
        console.log(code, message);
        break;
    }
  };

  handleUserCreation = (auth: UserCredential): void => {
    auth.user.sendEmailVerification()
      .then(() => alert(`Email sent to ${this.state.email}`))
      .catch(this.handleAuthError);
  };

  handleUserSignIn = (auth: UserCredential): void => {
    alert(`Logged in as ${this.state.email}`);
    console.log(auth);
  };

  render() {
    const { location, firebaseInstance } = this.props;

    // window isn't available during SSR
    if (typeof window === 'undefined') {
      return null;
    }

    // location.state will be null if the "/auth" route was
    // visited manually
    const isNewAccount = (location.state && location.state.isNewAccount) || false;

    return (
      <Heading subtext={isNewAccount ? 'Create account' : 'Sign in'}>
        <Container>
          <AuthForm
            onAuthButtonClick={this.onAuthButtonClick}
            isNewAccount={isNewAccount}
            firebaseInstance={firebaseInstance}
            onTextChange={this.onTextChange}
          />
          <Image src={isNewAccount ? createAccountImg : signinImg} />
        </Container>
      </Heading>
    );
  }
}

export default wrapWithFirebase(Auth);
