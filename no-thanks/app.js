'use strict';

const server = 'http://67.2.26.52:8080/';

function serverRequest(body) {
  return firebase.auth().signInAnonymously().then(cred => {
    const { uid } = cred.user;
    return fetch(server, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, uid })
    });
  });
}

class Launcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      slug: "",
      disabled: false,
      error: "",
    };
  }

  redirectToGame(slug) {
    window.location.href = `./${slug}`;
  }

  changeName(name) {
    this.setState({ name });
  }
  
  changeSlug(slug) {
    this.setState({ slug });
  }

  joinGame() {
    const { name, slug } = this.state;
    if (!name) {
      this.setState({ error: "Name is required!" });
      return;
    }
    if (!slug) {
      this.setState({ error: "Game ID is required to join game!" });
      return;
    }
    this.setState({ disabled: true });
    serverRequest({ JoinGame: { UserID: "", PlayerName: name, Slug: slug } }).then(() => {
      this.redirectToGame(slug);
    }).catch(err => {
      console.error(err);
      this.setState({
        error: "Error joining game :(",
        disabled: false,
      });
    });
  }

  createGame() {
    const { name } = this.state;
    if (!name) {
      this.toastError("Name is required!");
      return;
    }
    this.setState({ active: true });
    serverRequest({ CreateGame: { HostUserID: "", PlayerName: name } }).then(resp => {
      const { slug } = resp.json();
      this.redirectToGame(slug);
    }).catch(err => {
      console.error(err);
      this.setState({
        error: "Error creating game :(",
        disabled: false,
      });
    });
  }
  
  render() {
    const { name, slug, disabled, error } = this.state;
    return (
      <div>
        {!!error ? (<div>{error}</div>) : ""}

        <h1>Join Game</h1>
        <form onSubmit={() => this.joinGame()}>
          <label>
            Name:
            <input type="text" value={name} onChange={e => this.changeName(e.target.value)} />
          </label>
          <label>
            Game:
            <input type="text" value={slug} onChange={e => this.changeSlug(e.target.value)} />
          </label>
          <input type="submit" value="Join Game" disabled={disabled} />
        </form>

        <h1>Create Game</h1>
        <form onSubmit={() => this.createGame()}>
          <label>
            Name:
            <input type="text" value={name} onChange={e => this.changeName(e.target.value)} />
          </label>
          <input type="submit" value="Create Game" disabled={disabled} />
        </form>
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<Launcher />, domContainer);
