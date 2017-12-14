import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  promoteExpertHandler(e) {
    alert("Логика для становления экспертом")
  }

  createEventHandler(e) {
    browserHistory.push('/create_event');
  }

  render() {
    return (
      <header id="header">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          { this.props.state == 0 &&
            <Link to="/participant" className="navbar-brand">Digital Chain</Link>
          }
          { this.props.state == 1 &&
            <Link to="/expert" className="navbar-brand">Digital Chain</Link>
          }
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className={"nav-item" + (this.props.navItemIndex == 0 || this.props.navItemIndex == undefined ? ' active' : '')}>
                { this.props.state == -1 &&
                  <Link to="/" className="nav-link">Регистрация</Link>
                }
                { this.props.state == 0 &&
                  <Link to="/participant" className="nav-link">Главная</Link>
                }
                { this.props.state == 1 &&
                  <Link to="/expert" className="nav-link">Главная</Link>
                }
              </li>
              <li className={"nav-item" + (this.props.navItemIndex == 1 ? ' active' : '')}>
                { this.props.state == -1 &&
                  <Link to="/sign_in" className="nav-link">Вход</Link>
                }
                { this.props.state == 1 &&
                  <Link to="/users" className="nav-link">Пользователи</Link>
                }
              </li>
              <li className={"nav-item" + (this.props.navItemIndex == 2 ? ' active' : '')}>
                { this.props.state == 1 &&
                  <Link to="/confirmations" className="nav-link">Подтверждения</Link>
                }
              </li>
            </ul>
          </div>

          { this.props.state == 0 &&
            <div>
              <button className="btn btn-primary" onClick={this.promoteExpertHandler.bind(this)}>Стать экспертом</button>
            </div>
          }
          { this.props.state == 1 &&
            <div>
              <button className="btn btn-primary" onClick={this.createEventHandler.bind(this)}>Создать мероприятие</button>
            </div>
          }
        </nav>
      </header>
    );
  }

}
