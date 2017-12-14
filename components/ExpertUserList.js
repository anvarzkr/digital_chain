import React, { Component } from 'react';

export default class ExpertUserList extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  upUser(e) {
    alert("Повышаем пользователя");
  }

  downExpert(e) {
    alert("Понижаем эксперта");
  }

  render() {
    let participantsList = this.props.participants.map((participant, index) => {
      return (
        <li className="list-group-item" key={index}>
          {participant.name}
          <span style={{float: 'right'}}>
            <button className="btn btn-primary" onClick={this.upUser.bind(this)}>Повысить</button>
          </span>
        </li>
      );
    });

    let expertsList = this.props.experts.map((expert, index) => {
      return (
        <li className="list-group-item" key={index}>
          {expert.name}
          <span style={{float: 'right'}}>
            <button className="btn btn-danger" onClick={this.downExpert.bind(this)}>Понизить</button>
          </span>
        </li>
      );
    });

    return (
      <div className="row mx-0">
        <ul className="list-group col-6 event-participants-list">
          <strong>Пользователи:</strong>
          {participantsList}
        </ul>
        <ul className="list-group col-6 event-participants-list">
          <strong>Эксперты:</strong>
          {expertsList}
        </ul>
      </div>
    );
  }

}
