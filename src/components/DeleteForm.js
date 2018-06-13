// Dependencies
import React from 'react';

// Components
import TextForm from './TextForm';
import SubmitButton from './SubmitButton';


export default class DeleteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        id: ''
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
    if (!fields.id) return true;
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
    const id = this.state.fields.id;

    // Validate our fields before submitting
    if (this.validate()) return;

    // Make a POST call to our API
    let url = '/events/' + id;
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      }),
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => alert(error));
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm4">
        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <legend>DELETE</legend>
            <TextForm
              placeholder={'Event ID'}
              name={'id'}
              value={this.state.fields.id}
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