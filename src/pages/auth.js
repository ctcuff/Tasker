// @flow
import React, { Component } from 'react';
import Heading from 'layouts/Heading';
import AuthForm from 'components/AuthForm';
import { Firebase, wrapWithFirebase } from 'components/FirebaseContext';
import styled from 'styled-components';
import createAccountImg from 'static/undraw_auth_create_account.svg';
import signinImg from 'static/undraw_auth_sign_in.svg';
import app from 'firebase/app';
import { breakpointLg, breakpointSm } from '../components/styles/auth.style';

type AuthState = {
  email: string,
  password: string
};

type AuthProps = {
  firebaseInstance: Firebase
}

type FirebaseUserCredential = app.auth.UserCredential;

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

class Auth extends Component<AuthProps, AuthState> {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onTextChange = ({ target }: any) => {
    const { type, value } = target;

    // type comes from <input type=""/> and will either
    // be "email" or "password"
    this.setState({ [type]: value });
  };

  onAuthButtonClick = (): void => {
    const location = this.props.location.state;
    const firebaseInstance = this.props.firebaseInstance;
    const newAccount = (location && location.newAccount) || false;
    const { email, password } = this.state;

    if (!email || !password) {
      return;
    }

    if (newAccount) {
      firebaseInstance
        .createUserWithEmailAndPassword(email, password)
        .then((auth: FirebaseUserCredential) => {
          auth.user.sendEmailVerification()
            .then(() => alert(`Email sent to ${email}`))
            .catch(this.handleAuthError);
        })
        .catch(this.handleAuthError);
    } else {
      firebaseInstance
        .signInWithEmailAndPassword(email, password)
        .then((auth: FirebaseUserCredential) => {
          alert(`Logged in as ${email}`);
          console.log(auth);
        })
        .catch(this.handleAuthError);
    }
  };

  handleAuthError = ({code, message}) => {
    console.log(code, message);
    switch(code) {
      case 'auth/invalid-email':
        alert('This email is invalid');
        break;
      case 'auth/weak-password':
        alert(message);
        break;
      case 'auth/network-request-failed':
        alert("Please check your internet connection and try again");
        break;
      default:
        alert('An unknown error occurred, please try again');
        break;
    }
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
