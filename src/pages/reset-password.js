import React, { Component } from 'react';
import Heading from 'layouts/Heading';
import { wrapWithFirebase } from 'components/FirebaseContext';


const ResetPassword = ({ firebaseInstance }) => (
  <Heading subtext="Password reset">
    <p>TODO: Make this page!!!</p>
  </Heading>
);

export default wrapWithFirebase(ResetPassword);
