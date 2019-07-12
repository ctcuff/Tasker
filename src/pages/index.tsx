import React, { Component } from 'react';
import 'styles/index.scss';
import { Link } from 'gatsby';
import Button from 'react-bootstrap/Button';
import { Image, FlexContainer, FlexInner } from 'components/styles/index.style';
import SlidingText from 'components/SlidingText';
import Heading from 'layouts/Heading';
import { wrapWithFirebase, Firebase } from 'components/FirebaseContext';
import firebase from 'firebase';
import image from 'static/undraw_task.svg';

type FirebaseUser = firebase.User;
type AuthObserver = firebase.Unsubscribe;

interface ButtonProps {
  isLoggedIn: boolean;
  onSignOutClick: () => void;
  onViewTasksClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IndexProps {
  firebaseInstance: Firebase;
}

interface IndexState {
  user: FirebaseUser | null;
}

const ButtonGroup = (props: ButtonProps) =>
  props.isLoggedIn ? (
    <div>
      <Link to="/tasks">
        <Button variant="light" onClick={props.onViewTasksClick}>
          View tasks
        </Button>
      </Link>
      <Button variant="light" onClick={props.onSignOutClick}>
        Sign out
      </Button>
    </div>
  ) : (
    <div>
      <Link to="/auth" state={{ isNewAccount: true }}>
        <Button variant="light">Get started</Button>
      </Link>
      <Link to="/auth" state={{ isNewAccount: false }}>
        <Button variant="light">Sign in</Button>
      </Link>
    </div>
  );

class Index extends Component<IndexProps, IndexState> {
  private authObserver: AuthObserver;

  state = {
    user: null
  };

  componentDidMount() {
    this.authObserver = this.props.firebaseInstance.auth.onAuthStateChanged(
      (user: FirebaseUser) => this.setState({ user })
    );
  }

  componentWillUnmount() {
    // Calling the listener makes sure there are no
    // memory leaks when this component is unmounted
    if (this.authObserver) {
      this.authObserver();
    }
  }

  onViewTasksClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  onSignOutClick = () => {
    this.props.firebaseInstance
      .signOut()
      .then(() => this.setState({ user: null }))
      .catch(err => console.log(err));
  };

  render() {
    const user = this.state.user;

    return (
      <Heading className="index" subtext={user ? user.email : null}>
        <FlexContainer>
          <Image src={image} alt="" />
          <FlexInner>
            <div className="flex-right">
              <SlidingText
                staticText="Tasking made"
                wordList={['simple', 'easy', 'painless']}
              />
              <p className="text-muted">Synced across multiple devices.</p>
            </div>
            <div className="flex-left">
              <ButtonGroup
                isLoggedIn={user !== null}
                onSignOutClick={this.onSignOutClick}
                onViewTasksClick={this.onViewTasksClick}
              />
            </div>
          </FlexInner>
        </FlexContainer>
      </Heading>
    );
  }
}

export default wrapWithFirebase(Index);
