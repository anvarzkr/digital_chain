import React, { Component } from 'react';
import Header from './Header';
import ExpertEventListItem from './ExpertEventListItem';
import { Link, browserHistory } from 'react-router';

export default class ExpertPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      createdEvents: [
      ],
      expertEvents: [
      ]
    }
  }

  componentDidMount() {
    this.fetchEvents(0, 0);
    this.fetchEvents(0, 1);
  }

  fetchEvents(index, type) {
    let t = this;
    window.dcc._events(index).then(function(data) {
      console.log(data);
      let address = data;
      if (data != "0x") {
        let currentEventContract = window.EC.at(data);
        currentEventContract._creator().then(function(creator) {
          console.log(creator);
          if (creator == window.web3.eth.coinbase || type == 1) {
            currentEventContract._competence().then(function(specialty) {
              console.log(specialty);
              currentEventContract._start_date().then(function(startDate) {
                console.log(startDate);
                currentEventContract._name().then(function(name) {
                  console.log(name);

                  var event = {
                    title: name,
                    specialty: specialty,
                    startDate: window.timeConverter(startDate.c[0]),
                    creator: creator,
                    participants: [],
                    experts: [],
                    address: address
                  };
                  console.log(event);
                  t.fetchParticipants(t, 0, event, currentEventContract, type);
                });
              });
            });
          }
          t.fetchEvents(index + 1, type);
        });
      }
    });
  }

  fetchParticipants(t, index, event, currentEventContract, type) {
    currentEventContract._participants(index).then(function(participant_address) {
      if (participant_address != "0x") {
        event.participants.push(participant_address);
        t.fetchParticipants(t, index + 1, event, currentEventContract, type);
      } else {
        t.fetchExperts(t, 0, event, currentEventContract, type);
      }
    });
  }

  fetchExperts(t, index, event, currentEventContract, type) {
    currentEventContract._experts(index).then(function(expert_address) {
      if (expert_address != "0x") {
        event.experts.push(expert_address);
        t.fetchExperts(t, index + 1, event, currentEventContract, type);
      } else {
        console.log(type, event);
        if (type == 0) {
          t.setState({
            createdEvents: t.state.createdEvents.concat(event)
          });
        } else if (type == 1 && event.experts.indexOf(window.web3.eth.coinbase) != -1) {
          t.setState({
            expertEvents: t.state.expertEvents.concat(event)
          });
        }
      }
    });
  }

  eventListItemClickHandler(e) {
    e.preventDefault();
    let id = $(e.target).closest('.list-group-item').data('id');
    console.log(id);
    browserHistory.push('/expert/event/' + id);
  }

  render() {
    let createdEventsList = this.state.createdEvents.map((event, index) => {
      return <ExpertEventListItem key={index} index={index} event={event} onClick={this.eventListItemClickHandler.bind(this)}/>
    });

    let expertEventsList = this.state.expertEvents.map((event, index) => {
      return <ExpertEventListItem key={index} index={index} event={event} onClick={this.eventListItemClickHandler.bind(this)}/>
    });

    return (
      <div className="container">
        <Header state={1}/>

        <div className="row">
          <ul className="list-group col-6">
            <h5>Созданные вами мероприятия:</h5>
            {createdEventsList}
          </ul>
          <ul className="list-group col-6">
            <h5>Мероприятия, в которых вы - эксперт:</h5>
            {expertEventsList}
          </ul>
        </div>
      </div>
    );
  }

}
