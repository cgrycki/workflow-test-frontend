// Dependencies
import React from 'react';
import FormData from 'form-data';

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

  async onFormSubmit(evt) {
    /**
     * Use multipart form data with fetch
     */
    evt.preventDefault();
    if (this.validate()) return;

    let url = process.env.REACT_APP_REDIRECT_URI + '/events';
    let form = new FormData();
    form.append('textField', this.state.fields.textField);
    form.append('userEmail', this.state.fields.userEmail);

    let options = {
      method     : 'POST',
      credentials: 'include',
      body       : form
    };

    await fetch(url, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => alert(err))
      .then(() => this.setState({
        fields: {
          textField: '',
          userEmail: ''
      }}))
      .then(() => this.props.onSubmit());
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm4 ms-normalize">
        <form 
          onSubmit={this.onFormSubmit}
          encType="multipart/form-data"
        >
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