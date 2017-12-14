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
          <strong className="mr-1">Описание мероприятия:</strong>
          {this.props.event.description == undefined || this.props.event.description.length == 0 ?
            "Описание отсутствует"
            :
            this.props.event.description
          }
          <UserEventParticipants participants={this.state.participants} experts={this.state.experts}/>
        </p>
      </div>
    );
  }

}
