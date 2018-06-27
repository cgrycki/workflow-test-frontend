import React from 'react';
import {ActionButton} from 'office-ui-fabric-react';

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { loggedIn: true };

    this.logout = this.logout.bind(this);
  }

  logout() {
    fetch('/auth/logout')
      .then(res => console.log(res))
      .catch(err => alert(err))
      .then(() => this.setState({
        loggedIn: false
      }));
  }

  render() {
    return (
      <ActionButton
        iconProps={{ iconName: 'UserRemove' }}
      >Logout
      </ActionButton>
    );
  }
}