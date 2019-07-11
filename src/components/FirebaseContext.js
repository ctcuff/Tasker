// @flow
import React, { Component } from 'react';
import app from 'firebase/app';
import firebaseConfig from 'components/config';
import 'firebase/auth';

// Allows access to<FirebaseContext.Consumer> which gives access
// to an instance of the Firebase class
const FirebaseContext = React.createContext(null);

// Injects an instance of the Firebase class into
// a component
const wrapWithFirebase = Component => {
  return class extends React.Component {
    render() {
      return (
        <FirebaseContext.Consumer>
          {firebase => (
            <Component firebaseInstance={firebase} {...this.props} />
          )}
        </FirebaseContext.Consumer>
      );
    }
  };
};

class Firebase {
  constructor() {
    if (typeof window !== 'undefined') {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
    }
  }

  createUserWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise => {
    return (
      this.auth && this.auth.createUserWithEmailAndPassword(email, password)
    );
  };

  signInWithEmailAndPassword = (email: string, password: string): Promise => {
    return this.auth && this.auth.signInWithEmailAndPassword(email, password);
  };

  signOut: Promise = () => this.auth && this.auth.signOut();

  // prettier-ignore
  getCurrentUser = (): (app.User | null) => this.auth.currentUser;
}

export { FirebaseContext as default, Firebase, wrapWithFirebase };
