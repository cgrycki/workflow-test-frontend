// Dependencies
import React from 'react';

// Components
import TextForm from './TextForm';
import SubmitButton from './SubmitButton';


export default class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        userEmail: '',
        textField: ''
      },
      errors: {}
    };

    // Update f(x) needs to be bound to the component or else child will render
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit  = this.onFormSubmit.bind(this);
  };

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
    let url = process.env.REACT_APP_REDIRECT_URI + '/events';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        textField: textField,
        userEmail: userEmail
      }),
      credentials: 'include',
      mode: 'cors'
    })
    // These are valid because the server actually sends a message
    .then(response => response.json())
    // Likewise, theres a tangible response with the json
    .then(response => console.log(response))
    .catch(error => alert(error));

    // Set form to empty
    this.setState({ fields: {
      textField: '',
      userEmail: ''
    }});

    // Update top level app
    this.props.onSubmit();
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm4 ms-normalize">
        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <legend>POST</legend>
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
          </fieldset>
        </form>
      </div>
    );
  }
};