import React from 'react';
import {ActionButton} from 'office-ui-fabric-react';

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { loggedIn: true };

    this.logout = this.logout.bind(this);
  }

  logout() {
    let url = process.env.REACT_APP_REDIRECT_URI + '/auth/logout';
    fetch(url)
      .then(res => console.log(res))
      .catch(err => alert(err))
      .then(() => this.setState({
        loggedIn: false
      }));
  }

  render() {
    return (
      <ActionButton
        disabled={!this.state.loggedIn}
        iconProps={{ iconName: 'UserRemove' }}
        onClick={() => this.logout()}
      >Logout
      </ActionButton>
    );
  }
}