import React, { Component } from 'react';
import app from 'firebase/app';
import firebaseConfig from 'components/config';
import 'firebase/auth';

type Auth = app.auth.Auth;
type UserCredential = app.auth.UserCredential;

// Allows access to <FirebaseContext.Consumer> which gives access
// to an instance of the Firebase class
const FirebaseContext = React.createContext(null);

// Injects an instance of the Firebase class into
// a component
const wrapWithFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {(firebase: Firebase) => (
      <Component firebaseInstance={firebase} {...props} />
    )}
  </FirebaseContext.Consumer>
);

class Firebase {
  public readonly auth: Auth;

  constructor() {
    if (typeof window !== 'undefined') {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
    }
  }

  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return (
      this.auth && this.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.auth && this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.auth && this.auth.signOut();
  }
}

export { FirebaseContext as default, Firebase, wrapWithFirebase };
