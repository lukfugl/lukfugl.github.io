'use strict';

const e = React.createElement;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    if (this.state.editing) {
      return (<p>You are editing.</p>);
    }
    return (<button onClick={() => this.setState({ editing: true })}>Edit</button>);
  }
}

const domContainer = document.querySelector('#editor_container');
ReactDOM.render(<Editor />, domContainer);
