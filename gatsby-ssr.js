import React from 'react';
import 'styles/global.scss';
import FirebaseContext, { Firebase } from 'components/FirebaseContext';

export const wrapRootElement = ({ element }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {element}
    </FirebaseContext.Provider>
  );
};
