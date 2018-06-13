import React from 'react';
import { DetailsList } from 'office-ui-fabric-react';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events 
    };
  }

  componentWillReceiveProps(props) {
    // Update the events
    this.setState({ events: props.events });
  }

  render() {
    return (
      <div>
        <DetailsList
          items={this.state.events}
        />
      </div>
    );
  }
}