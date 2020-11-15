'use strict';

const e = React.createElement;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    if (this.state.editing) {
      return 'You are editing.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ editing: true }) },
      'Edit'
    );
  }
}

const domContainer = document.querySelector('#editor_container');
ReactDOM.render(e(Editor), domContainer);
