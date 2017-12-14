import React, { Component } from 'react';

export default class ExpertConfirmationsList extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  confirm_user(e) {
    alert("Подтверждаем повышение пользователя");
  }

  confirm_event(e) {
    alert("Подтверждаем изменения мероприятия");
  }

  render() {
    let participantsList = this.props.participants.map((participant, index) => {
      return (
        <li className="list-group-item" key={index}>
          {participant.name}
          <span style={{float: 'right'}}>
            <button className="btn btn-primary" onClick={this.confirm_user.bind(this)}>Подтвердить</button>
          </span>
        </li>
      );
    });

    let eventsList = this.props.events.map((event, index) => {
      return (
        <li className="list-group-item" key={index}>
          {event.name}
          <span style={{float: 'right'}}>
            <button className="btn btn-primary" onClick={this.confirm_event.bind(this)}>Подтвердить</button>
          </span>
        </li>
      );
    });

    return (
      <div className="row mx-0">
        <ul className="list-group col-6 event-participants-list">
          <strong>Пользователи на повышение:</strong>
          {participantsList}
        </ul>
        <ul className="list-group col-6 event-participants-list">
          <strong>Мероприятия на изменение:</strong>
          {eventsList}
        </ul>
      </div>
    );
  }

}
