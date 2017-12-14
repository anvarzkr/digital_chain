import React, { Component } from 'react';
import UserEventParticipants from './UserEventParticipants';

export default class UserEventPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      participants: [
        {name: 'Анвар Закиров'},
        {name: 'Роман Варнава'},
        {name: 'Алмаз Мельников'},
      ],
      experts: [
        {name: 'Эксперт 1'},
        {name: 'Эксперт 2'},
        {name: 'Эксперт 3'},
      ],
    }
  }

  render() {
    return (
      <div className="col-8">
        <h1>{this.props.event.title}</h1>
        <p>
          <strong className="mr-1">Направление:</strong>
          {this.props.event.specialty}
        </p>
        <p>
          <strong className="mr-1">Дата начала:</strong>
          {this.props.event.startDate}
        </p>
        <UserEventParticipants participants={this.state.participants} experts={this.state.experts}/>
      </div>
    );
  }

}
