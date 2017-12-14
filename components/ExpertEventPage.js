import React, { Component } from 'react';
import Header from './Header';
import UserEventParticipants from './UserEventParticipants';
import { Link, browserHistory } from 'react-router';

export default class ExpertEventPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: 'Title',
      specialty: 'Blockchain',
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
      id: ''
    }
  }

  eventEditHandler(e) {
    // browserHistory.push('/create_event');
  }

  componentDidMount() {
    if (this.props.params.event_id != undefined) {
      this.setState({
        id: this.props.params.event_id
      });
    }
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
            <strong className="mr-1">Направление:</strong>
            {this.state.specialty}
          </p>
          <p>
            <strong className="mr-1">Дата начала:</strong>
            {this.state.startDate}
          </p>
          <UserEventParticipants participants={this.state.participants} experts={this.state.experts}/>
          <Link to={"/edit_event/" + this.state.id} className="btn btn-primary mt-2">
            Изменение мероприятия
          </Link>
        </div>
      </div>
    );
  }

}

// <button className="btn btn-primary mt-2" onClick={this.eventEditHandler.bind(this)}>
//   Изменение мероприятия
// </button>
