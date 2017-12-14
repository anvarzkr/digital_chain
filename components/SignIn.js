import React from 'react';
import { Link } from 'react-router';
import Header from './Header';

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  componentDidMount() {
    if (signedIn) {
      this.props.history.push('/' + (currentUser.user_type == 1 ? 'expert' : 'participant'));
    }
  }

  inputOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signIn() {
    console.log("clicked sign in");
  }

  render() {
    return (
      <div>
        <Header state={-1} navItemIndex={1}/>

        <div className="container">
          <div className="col-md-6 mx-auto">
            <div className="panel panel-default">
              <div className="panel-body">

                <h1>Вход</h1>

                <div>
                  <div className="form-group">
                    <label>Логин</label>
                    <input className="form-control" type="text" name="login" value={this.state.login} onChange={this.inputOnChange}/>
                  </div>
                  <div className="form-group">
                    <label>Пароль</label>
                    <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.inputOnChange}/>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={this.signIn.bind(this)}>Войти</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
