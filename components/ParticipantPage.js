import React, { Component } from 'react';
import Header from './Header';
import UserEventList from './UserEventList';
import UserEventPage from './UserEventPage';

export default class ParticipantPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: [

      ],
      currentEventIndex: 0,
      events_addrs: []
    }
  }

  componentDidMount() {
    this.fetchEvents(0);
  }

  fetchEvents(index) {
    let t = this;
    window.dcc._events(index).then(function(data) {
      console.log(data);
      if (data != "0x") {
        t.setState({
          events_addrs: t.state.events_addrs.concat(data)
        });
        let currentEventContract = window.EC.at(data);
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
          t.fetchEvents(index + 1);
        });
      }
    });
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
        if (event.participants.indexOf(window.web3.eth.coinbase) != -1) {
          t.setState({
            events: t.state.events.concat(event)
          });
        }
      }
    });
  }

  changeCurrentEvent(index) {
    this.setState({
      currentEventIndex: index
    });
  }

  render() {
    return (
      <div className="container">
        <Header state={0}/>
        <div className="row">
          <UserEventList events={this.state.events} changeCurrentEvent={this.changeCurrentEvent.bind(this)} />
          <UserEventPage event={this.state.events[this.state.currentEventIndex] || {}} />
        </div>
      </div>
    );
  }

}
