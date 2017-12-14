import React, { Component } from 'react';

export default class UserEventParticipants extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    let participantsList = this.props.participants.map((participant, index) => {
      return (
        <li className="list-group-item" key={index}>{participant}</li>
      );
    });

    let expertsList = this.props.experts.map((expert, index) => {
      return (
        <li className="list-group-item" key={index}>{expert}</li>
      );
    });

    return (
      <div className="row mx-0">
        <ul className="list-group col-6 event-participants-list">
          <strong>Участники:</strong>
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
