import React, { Component } from 'react';
import 'styles/index.scss';
import { Link } from 'gatsby';
import Button from 'react-bootstrap/Button';
import { Image, FlexContainer, FlexInner } from 'components/styles/index.style';
import SlidingText from 'components/SlidingText';
import Heading from 'layouts/Heading';
import { wrapWithFirebase } from 'components/FirebaseContext';
import image from 'static/undraw_task.svg';

const ButtonGroup = ({ isLoggedIn, onSignOutClick, onViewTaskClick }) =>
  isLoggedIn ? (
    <div>
      <Link to="/tasks">
        <Button variant="light" onClick={onViewTaskClick}>
          View tasks
        </Button>
      </Link>
      <Button variant="light" onClick={onSignOutClick}>
        Sign out
      </Button>
    </div>
  ) : (
    <div>
      <Link to="/auth" state={{ isNewAccount: true }}>
        <Button className="btn-light" variant="light">Get started</Button>
      </Link>
      <Link to="/auth" state={{ isNewAccount: false }}>
        <Button variant="light">Sign in</Button>
      </Link>
    </div>
  );

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    console.log(this.props);
  }

  componentDidMount() {
    this.listener = this.props.firebaseInstance.auth.onAuthStateChanged(user =>
      this.setState({ user })
    );
  }

  componentWillUnmount() {
    // Calling the listener makes sure there are no
    // memory leaks when this component is unmounted
    if (this.listener) {
      this.listener();
    }
  }

  onViewTasksClick = e => {
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
                onViewTaskClick={this.onViewTasksClick}
              />
            </div>
          </FlexInner>
        </FlexContainer>
      </Heading>
    );
  }
}

export default wrapWithFirebase(Index);
