import React, { Component } from 'react';
import Heading from 'layouts/Heading';
import AuthForm from 'components/AuthForm';
import { Firebase, wrapWithFirebase } from 'components/FirebaseContext';
import styled from 'styled-components';
import { breakpointLg, breakpointSm } from 'components/styles/auth.style';
import firebase from 'firebase';
import createAccountImg from 'static/undraw_auth_create_account.svg';
import signinImg from 'static/undraw_auth_sign_in.svg';
import LoadingOverlay from 'components/LoadingOverlay';

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

interface AuthState {
  email: string;
  password: string;
  isAuthInProgress: boolean;
}

interface AuthProps {
  firebaseInstance: Firebase;
  location: {
    state: {
      isNewAccount: boolean;
    };
  };
}

interface FirebaseAuthError {
  code: string;
  message: string;
}

type UserCredential = firebase.auth.UserCredential;

class Auth extends Component<AuthProps, AuthState> {
  state = {
    email: '',
    password: '',
    isAuthInProgress: false
  };

  onTextChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const { type, value } = e.currentTarget;

    this.setState({ [type]: value } as Pick<AuthState, keyof AuthState>);
  };

  onAuthButtonClick = (): void => {
    const location = this.props.location.state;
    const firebaseInstance = this.props.firebaseInstance;
    const isNewAccount = (location && location.isNewAccount) || false;
    const { email, password } = this.state;

    if (!email || !password) {
      return;
    }

    this.setState({ isAuthInProgress: true });

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
    this.setState({ isAuthInProgress: false });

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
      case 'auth/email-already-in-use':
        alert('This email address is already in use by another account');
        break;
      case 'auth/too-many-requests':
        // TODO: Throttle requests???
        alert(message);
        break;
      default:
        alert('An unknown error occurred, please try again');
        console.log(code, message);
        break;
    }
  };

  handleUserCreation = (auth: UserCredential): void => {
    auth.user
      .sendEmailVerification()
      .then(() => alert(`Email sent to ${this.state.email}`))
      .catch(this.handleAuthError)
      .finally(() => this.setState({ isAuthInProgress: false }));
  };

  handleUserSignIn = (auth: UserCredential): void => {
    alert(`Logged in as ${this.state.email}`);
    console.log(auth);
    window.location.href = '/';
  };

  render() {
    const { location, firebaseInstance } = this.props;

    // window isn't available during SSR
    if (typeof window === 'undefined') {
      return null;
    }

    // location.state will be null if the "/auth" route was
    // visited manually
    const isNewAccount =
      (location.state && location.state.isNewAccount) || false;

    return (
      <Heading subtext={isNewAccount ? 'Create account' : 'Sign in'}>
        <LoadingOverlay show={this.state.isAuthInProgress} />
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
