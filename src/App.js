// Dependencies
import React from 'react';

// Components
import TextForm from './components/TextForm';
import SubmitButton from './components/SubmitButton';
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

    // Update f(x) needs to be bound to the component or else child will render
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit  = this.onFormSubmit.bind(this);
  };

  componentWillMount() {
    // Use our API's GET to fetch a list of all 'events'
    fetch("/events")
      .then(res => res.json())
      .then(events => this.setState({ events: events }));
  }

  validate() {
    // Gather fields
    const fields = this.state.fields;
    const errors = this.state.errors;
    const errMsg = Object.keys(errors).filter(k => errors[k]);

    // Check each field
    if (!fields.textField) return true;
    if (!fields.userEmail) return true;
    if (errMsg.length) return true;

    return false;
  }

  onInputChange({ name, value, error }) {
    // Gather our current state
    const fields = this.state.fields;
    const errors = this.state.errors;

    // Update the input field's value + error
    fields[name] = value;
    errors[name] = error;

    // Update our component to reflect state change
    this.setState({ fields, errors });
  }

  onFormSubmit(evt) {
    // Prevent leaving the page
    evt.preventDefault();

    // Gather information from our form
    const textField = this.state.fields.textField;
    const userEmail = this.state.fields.userEmail;

    // Validate our fields before submitting
    if (this.validate()) return;

    // Make a POST call to our API
    fetch('/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        textField: textField,
        userEmail: userEmail
      }),
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => alert(error));
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
              <form onSubmit={this.onFormSubmit}>
                <TextForm
                  placeholder={'Textual Form Field'}
                  name={'textField'}
                  value={this.state.fields.textField}
                  onChange={this.onInputChange}
                />
                <TextForm
                  placeholder={'User Email'}
                  name={'userEmail'}
                  value={this.state.fields.userEmail}
                  onChange={this.onInputChange}
                />

                <SubmitButton
                  valid={this.validate()}
                />
              </form>
            </div>
          </div>
        </div>

        <br/>
        <br/>

        <div className="ms-Grid-row">
          {this.state.events.length > 0 && <EventList events={this.state.events} />}
        </div>
      </div>
    );
  }
}

export default App;