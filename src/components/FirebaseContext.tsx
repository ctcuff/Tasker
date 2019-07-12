import React from 'react';
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
const wrapWithFirebase = function(Component) {
  return function(props) {
    return (
      <FirebaseContext.Consumer>
        {(firebase: Firebase) => (
          <Component firebaseInstance={firebase} {...props} />
        )}
      </FirebaseContext.Consumer>
    );
  };
};

class Firebase {
  public readonly auth: Auth;

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();

  }

  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return (
      this.auth && this.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.auth && this.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.auth && this.auth.signOut();
  }
}

export { FirebaseContext as default, Firebase, wrapWithFirebase };
