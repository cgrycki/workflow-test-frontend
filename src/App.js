import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      textField: ''
    };

  };

  onInputChange({ name, value, error }) {
    const fields = this.state;
    fields[name] = value;
    this.setState({ fields });
  }

  render() {
    return (
      <div className="App">
        <div>Test?</div>
      </div>
    );
  }
}

export default App;