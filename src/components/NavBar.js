import React from 'react';
import {ActionButton} from 'office-ui-fabric-react';

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { loggedIn: false };

    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  async checkLogin() {
    /* Checks if we're logged in and authenticated to our application. */
    let url = process.env.REACT_APP_REDIRECT_URI + '/auth/validate';
    let options = {
      credentials: 'include',
      method: 'GET',
      mode: 'no-cors'
    };
    
    try {
      await fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .then(res => this.setState({ loggedIn: res.loggedIn })); 
    } catch (err) {
      console.log(err, err.stack);
    }
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