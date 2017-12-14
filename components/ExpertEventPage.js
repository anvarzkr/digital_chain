import React, { Component } from 'react';
import Header from './Header';
import UserEventParticipants from './UserEventParticipants';
import { Link, browserHistory } from 'react-router';

export default class ExpertEventPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      specialty: '',
      startDate: '',
      participants: [
      ],
      experts: [
      ],
      address: ''
    }
  }

  eventEditHandler(e) {
    // browserHistory.push('/create_event');
  }

  componentDidMount() {
    // if (this.props.params.event_id != undefined) {
    //   this.setState({
    //     address: this.props.params.event_id
    //   });
    // }
    this.setState({
      address: this.props.params.event_id
    });
    this.fetchEvents(this.props.params.event_id);
  }

  fetchEvents(address) {
    let t = this;

    console.log(address);
    if (address != "0x") {
      let currentEventContract = window.EC.at(address);
      currentEventContract._name().then(function(name) {
        console.log(name);
        currentEventContract._competence().then(function(specialty) {
          console.log(specialty);
          currentEventContract._start_date().then(function(startDate) {
            console.log(startDate);
            var event = {
              title: name,
              specialty: specialty,
              startDate: window.timeConverter(startDate.c[0]),
              participants: [],
              experts: []
            };
            console.log(event);
            t.fetchParticipants(t, 0, event, currentEventContract);
          });
        });
      });
    }
  }

  fetchParticipants(t, index, event, currentEventContract) {
    currentEventContract._participants(index).then(function(participant_address) {
      if (participant_address != "0x") {
        event.participants.push(participant_address);
        t.fetchParticipants(t, index + 1, event, currentEventContract);
      } else {
        t.fetchExperts(t, 0, event, currentEventContract);
      }
    });
  }

  fetchExperts(t, index, event, currentEventContract) {
    currentEventContract._experts(index).then(function(expert_address) {
      if (expert_address != "0x") {
        event.experts.push(expert_address);
        t.fetchExperts(t, index + 1, event, currentEventContract);
      } else {
        // t.setState({
        //   events: t.state.events.concat(event)
        // });
        t.setState({
          title: event.title,
          startDate: event.startDate,
          specialty: event.specialty,
          participants: event.participants,
          experts: event.experts
        })
      }
    });
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
          <Link to={"/edit_event/" + this.state.address} className="btn btn-primary mt-2">
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
