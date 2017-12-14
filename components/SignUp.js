import React from 'react';
import { Link } from 'react-router';
import Header from './Header';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user_type: '0', // 0: user, 1: expert
      name: '',
      login: '',
      password: '',
      showComponent: false
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  componentDidMount() {
    if (window.currentUser.signedIn == true) {
      this.props.history.push('/' + (window.currentUser.user_type == 1 ? 'expert' : 'participant'));
      return;
    }
    this.setState({
      showComponent: true
    });
  }

  inputOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signUp() {
    console.log("clicked sign up");

    window.dcc.register(this.state.name, this.state.login, this.state.password, {from: web3.eth.coinbase, gas: 1400000}).then(function(data) {
    	console.log(data);
    });
  }

  render() {
    return (
      <div style={{display: (this.state.showComponent) ? 'block' : 'none'}}>
        <Header state={-1}/>

        <div className="container">
          <div className="col-md-6 mx-auto">
            <div className="panel panel-default">
              <div className="panel-body">

                <h1>Регистрация</h1>

                <div>
                  <div className="form-group">
                    <label>Имя</label>
                    <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.inputOnChange}/>
                  </div>
                  <div className="form-group">
                    <label>Логин</label>
                    <input className="form-control" type="text" name="login" value={this.state.login} onChange={this.inputOnChange}/>
                  </div>
                  <div className="form-group">
                    <label>Пароль</label>
                    <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.inputOnChange}/>
                  </div>
                </div>
                <p>Вы будете зарегистрированы как участник.</p>
                <button className="btn btn-primary" onClick={this.signUp.bind(this)}>Регистрация</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
