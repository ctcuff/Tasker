import React, { Component } from 'react';
import Heading from 'layouts/Heading';
import { wrapWithFirebase } from 'components/FirebaseContext';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebaseInstance.auth.onAuthStateChanged(
      user => this.setState({ user: user })
    );
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener();
    }
  }

  render() {
    console.log(this.state.user === null);
    // const location = this.props.location;
    //
    // if (!this.location.state.isLoggedIn) {
    //   if (typeof window !== 'undefined') {
    //     window.location = '/';
    //     return null;
    //   }
    // }
    return (
      <Heading subtext="Tasks">
        <p>TODO:MAKE THIS PAGE</p>
      </Heading>
    );
  }
}

export default wrapWithFirebase(Tasks);