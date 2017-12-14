import React, { Component } from 'react';
import Header from './Header';
import ExpertConfirmationsList from './ExpertConfirmationsList';

export default class ExpertConfirmationsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: [

      ],
      experts: [

      ],
      editEvents: [

      ]
    }
  }

  componentDidMount() {
    this.fetchNominations(0, []);
    this.fetchEventsToEdit(0, []);
  }

  fetchNominations(index, users) {
    let t = this;

    window.dcc._nominationToExpert(index).then(function(data) {
      console.log(data);
      if (data[1] != "0x") {
        users.push({address: data[1], count: data[2].c[0]})
        t.fetchNominations(index + 1, users);
      } else {
        t.setState({
          users: t.state.users.concat(users)
        });
      }
    });
  }

  fetchEventsToEdit(index, events) {
    let t = this;

    window.dcc._events(index).then(function(address) {
      console.log(address);
      if (address != "0x") {
        let currentEventContract = window.EC.at(address);
        currentEventContract._isEditing().then(function(data) {
          console.log(data);
          if (data == true) {
            currentEventContract._acceptanceCount().then(function(count) {
              console.log(count);
              events.push({address: address, count: count.c[0]});
            });
          }
          t.fetchEventsToEdit(index + 1, events);
          // users.push({address: data[1], count: data[2].c[0]})
          // t.fetchEventsToEdit(index + 1, events);
        });
      } else {
        t.setState({
          editEvents: t.state.editEvents.concat(events)
        });
      }
    });
  }

  // fetchEvents(index) {
  //   let t = this;
  //   window.dcc._events(index).then(function(data) {
  //     console.log(data);
  //     if (data != "0x") {
  //       t.setState({
  //         events_addrs: t.state.events_addrs.concat(data)
  //       });
  //       let currentEventContract = window.EC.at(data);
  //       currentEventContract._name().then(function(name) {
  //         console.log(name);
  //         currentEventContract._competence().then(function(specialty) {
  //           console.log(specialty);
  //           currentEventContract._start_date().then(function(startDate) {
  //             console.log(startDate);
  //             var event = {
  //               title: name,
  //               specialty: specialty,
  //               startDate: window.timeConverter(startDate.c[0]),
  //               participants: [],
  //               experts: []
  //             };
  //             console.log(event);
  //             t.fetchParticipants(t, 0, event, currentEventContract);
  //           });
  //         });
  //         t.fetchEvents(index + 1);
  //       });
  //     }
  //   });
  // }

  render() {
    return (
      <div className="container">
        <Header state={1} navItemIndex={2}/>

        <ExpertConfirmationsList participants={this.state.users} events={this.state.editEvents} />
      </div>
    );
  }

}
