import React from 'react';
import { Dropdown } from 'office-ui-fabric-react';

export default class DropdownID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      value: props.value,
      ids: props.ids
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ 
      ids: props.ids,
      value: props.value
     });
  }

  onChange(evt) {
    const name = this.state.name;
    const value = evt.text;
    const error = false;

    this.setState({ value: ''});
    this.props.onChange({ name, value, error });
  }

  render() {
    return (
      <div className="ms-normalize">
        <Dropdown
          value={this.state.value}
          placeHolder={this.props.placeholder}
          label={this.props.label}
          options={this.state.ids.map(function(d, i) {
            return {key: i, text: d};
          })}
          onChanged={(e) => this.onChange(e)}
          dropdownWidth={400}
        />
      </div>
    );
  }
}