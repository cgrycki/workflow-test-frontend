// Dependencies
import React from 'react';

// Components
import PostForm from './components/PostForm';
import PatchForm from './components/PatchForm';
import DeleteForm from './components/DeleteForm';
import EventList from './components/EventList';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        userEmail: '',
        textField: ''
      },
      errors: {},
      events: []
    };

    this.apiSync = this.apiSync.bind(this);
  };

  componentWillMount() {
    this.apiSync();
  }

  async apiSync() {
    // Use our API's GET to fetch a list of all 'events'
    fetch("/events")
      .then(res => res.json())
      .then(events => this.setState({ events: events }));
  }

  render() {
    return (
      <div className="App ms-normalize ms-Grid">
        <div className="ms-Grid-row">
          <div className="App-Form ms-Grid-col ms-sm12">

            <div className="ms-Grid-row">
                <h3 className="ms-font-xl ms-fontWeight-regular">Workflow Test</h3>
            </div>

            <div className="ms-Grid-row">
              <PostForm onSubmit={() => this.apiSync()}/>
              <PatchForm onSubmit={() => this.apiSync()}/>
              <DeleteForm onSubmit={() => this.apiSync()}/>
            </div>
          </div>
        </div>

        <br/>
        <br/>

        <div className="ms-Grid-row">
          <EventList events={this.state.events} />
        </div>        
      </div>
    );
  }
}

export default App;