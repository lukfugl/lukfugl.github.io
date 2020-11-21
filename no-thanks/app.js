'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "Loading..." };
    fetch('http://67.2.26.52:8080/')
      .then(response => response.text())
      .then(text => this.setState({ text }));
  }

  render() {
    return (<div>{this.state.text}</div>);
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
