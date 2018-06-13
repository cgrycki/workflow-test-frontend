import React from 'react';
import { CompoundButton } from 'office-ui-fabric-react';

export default class SubmitButton extends React.Component {
  render() {
    return (
      <CompoundButton
        disabled={this.props.valid}
        type="submit"
      >Submit</CompoundButton>
    );
  }
}