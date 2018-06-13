import React from 'react';
import { TextField } from 'office-ui-fabric-react';

export default class TextForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    // Initialize this form with the props passed down
    this.state = {
      name: props.name,
      value: props.value,
      error: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We only check if the value is different,
    // because the name attribute is set in our constructor,
    // and we set our own errors in this.onChange()
    return nextProps.value !== this.state.value;
  }

  componentWillReceiveProps(props) {
    // Set our field's new state.
    this.setState({ value: props.value });
  }

  onChange(evt) {
    // Gather attributes that we'll need for our parent Component
    const name  = this.state.name;
    const value = evt;
    const error = this.props.validate ? this.props.validate(value) : false;

    // Set our field's state before passing it back up to the parent form.
    this.setState({ value, error });
    this.props.onChange({ name, value, error });
  }

  render() {
    return (
      <div className="ms-normalize">
        <TextField
          placeholder={this.props.placeholder}
          value={this.state.value}
          label={this.state.name}
          onChanged={(e) => this.onChange(e)}
          errorMessage={this.state.error}
        />
      </div>
    );
  }
}