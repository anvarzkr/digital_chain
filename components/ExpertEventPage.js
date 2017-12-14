import React, { Component } from 'react';
import Header from './Header';
import UserEventParticipants from './UserEventParticipants';
import { Link, browserHistory } from 'react-router';

export default class ExpertEventPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: 'Title',
      description: 'Description',
      startDate: '15.12.2017',
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

  eventEditHandler(e) {
    browserHistory.push('/create_event');
  }

  render() {
    // let participantsList = this.state.participants.map((participant, index) => {
    //   return <ExpertEventListItem key={index} index={index} participant={participant} onClick={this.eventListItemClickHandler.bind(this)}/>
    // });
    //
    // let expertsList = this.state.experts.map((expert, index) => {
    //   return <ExpertEventListItem key={index} index={index} expert={expert} onClick={this.eventListItemClickHandler.bind(this)}/>
    // });

    return (
      <div className="container">
        <Header state={1}/>

        <div className="col-8 mx-auto">
          <h1>{this.state.title}</h1>
          <p>
            <strong className="mr-1">Описание мероприятия:</strong>
            {this.state.description == undefined || this.state.description.length == 0 ?
              "Описание отсутствует"
              :
              this.state.description
            }
          </p>
          <p>
            <strong className="mr-1">Дата начала:</strong>
            {this.state.startDate}
          </p>
          <UserEventParticipants participants={this.state.participants} experts={this.state.experts}/>
          <button className="btn btn-primary mt-2" onClick={this.eventEditHandler.bind(this)}>
            Изменение мероприятия
          </button>
        </div>
      </div>
    );
  }

}
