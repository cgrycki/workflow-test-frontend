// Dependencies
import React from 'react';

// Components
import TextForm from './TextForm';
import SubmitButton from './SubmitButton';
import DropdownID from './DropdownID';


export default class PatchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        id: '',
        packageId: ''
      },
      errors: {},
      ids: props.ids
    };

    // Update f(x) needs to be bound to the component or else child will render
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit  = this.onFormSubmit.bind(this);
  };

  componentWillReceiveProps(props) {
    this.setState({ 
      ids: props.ids
    });
  }

  validate() {
    // Gather fields
    const fields = this.state.fields;
    const errors = this.state.errors;
    const errMsg = Object.keys(errors).filter(k => errors[k]);

    // Check each field
    if (!fields.id) return true;
    if (!fields.packageId) return true;
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

  async onFormSubmit(evt) {
    // Prevent leaving the page
    evt.preventDefault();

    // Gather information from our form
    const id = this.state.fields.id;
    const pid = this.state.fields.packageId;

    // Validate our fields before submitting
    if (this.validate()) return;

    // Make a POST call to our API
    let url = '/events/' + id + '/' + pid;
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        packageId: pid
      }),
    })
    //.then(response => response.json())
    .then(response => console.log(response))
    .catch(error => alert(error))
    .then(() => this.setState({ 
      fields: {
        id: '', 
        packageId: ''
      }}))
    .then(() => this.props.onSubmit());
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm4">
        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <legend>PATCH</legend>

            <DropdownID
              placeholder={'Select an ID from dropdown'}
              label={'Event ID'}
              name={'id'}
              value={this.state.fields.id}
              ids={this.state.ids}
              onChange={this.onInputChange}
            />

            <TextForm
              placeholder={'Package ID'}
              name={'packageId'}
              value={this.state.fields.packageId}
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