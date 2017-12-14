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

  signUp() {
    console.log("clicked sign up");
  }

  render() {
    return (
      <div>
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
