import React from 'react';
import { Link, browserHistory } from 'react-router';
import Header from './Header';

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      authError: false
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  componentDidMount() {
    if (window.currentUser.signedIn == true) {
      this.props.history.push('/' + (window.currentUser.user_type == 1 ? 'expert' : 'participant'));
    }
  }

  inputOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signIn() {
    console.log("clicked sign in");
    let t = this;

    window.dcc.login(this.state.login, this.state.password, {from: web3.eth.coinbase, gas: 1400000}).then(function(data) {
    	console.log(data);
      if (data == true) {
        window.setCookie("login", t.state.login);
        window.setCookie("password", t.state.password);
        window.dcc.isExpert(window.web3.eth.coinbase).then(function(is_expert) {
  				if (is_expert == true) {
  					window.currentUser = {
  						type: 1,
  						signedIn: true
  					};
  					browserHistory.push('/expert');
  				} else {
  					window.currentUser = {
  						type: 0,
  						signedIn: true
  					};
  					browserHistory.push('/participant');
  				}
  			});
      } else {
        t.setState({authError: true});
      }
    });
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

                <div className="alert alert-danger" role="alert" style={{display: (this.state.authError) ? 'block' : 'none'}}>
                  Неверные логин или пароль
                </div>

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
