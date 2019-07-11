// @flow
import React from 'react';
import { breakpointLg, breakpointSm } from 'components/styles/auth.style';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Firebase } from './FirebaseContext';
import { Link } from 'gatsby';

type FormComponentProps = {
  onAuthButtonClick: () => void,
  onTextChange: (e: any) => void,
  isNewAccount: boolean,
  firebaseInstance: Firebase
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 44%;
  padding: 50px;

  @media screen and (max-width: ${breakpointLg}) {
    width: 100%;
    padding: 0 80px 50px 80px;
  }

  @media screen and (max-width: ${breakpointSm}) {
    width: 100%;
    padding: 0 30px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 36px !important;
`;

const StyledTextField = styled(TextField)`
  &:not([type="email"]) {
    margin-top: 42px !important;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 24px;
  color: #6c63ff;
`;

const AuthForm = ({
  isNewAccount,
  onAuthButtonClick,
  onTextChange
}: FormComponentProps) => {
  return (
    <Container>
      <TextField
        label="Email"
        helperText={isNewAccount ? 'Your email wil never be shared.' : ''}
        type="email"
        autoComplete="current-email"
        margin="normal"
        onChange={onTextChange}
      />
      <StyledTextField
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
        onChange={onTextChange}
      />
      <StyledLink to="/auth" state={{ isNewAccount: !isNewAccount }}>
        {isNewAccount
          ? 'Already registered? Click here'
          : "Don't have an account? Sign up"}
      </StyledLink>
      <StyledButton
        variant="outlined"
        color="primary"
        onClick={onAuthButtonClick}
      >
        {isNewAccount ? 'Create account' : 'Sign in'}
      </StyledButton>
    </Container>
  );
};

export default AuthForm;
