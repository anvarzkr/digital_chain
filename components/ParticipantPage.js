import React, { Component } from 'react';
import Header from './Header';
import UserEventList from './UserEventList';
import UserEventPage from './UserEventPage';

export default class ParticipantPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: [
        {
          title: 'test 1',
          startDate: '15.12.2017'
        },
        {
          title: 'test 2',
          startDate: '16.12.2017',
          description: 'Test description here. Could be many words.'
        },
        {
          title: 'test 3',
          startDate: '17.12.2017',
          description: 'Test description here. Could be many words.'
        },
        {
          title: 'test 4',
          startDate: '18.12.2017',
          description: 'Test description here. Could be many words.'
        },
        {
          title: 'test 5',
          startDate: '18.12.2017',
          description: 'Test description here. Could be many words.'
        },
        {
          title: 'test 6',
          startDate: '18.12.2017',
          description: 'Test description here. Could be many words.'
        }
      ],
      currentEventIndex: 0
    }
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
          <UserEventPage event={this.state.events[this.state.currentEventIndex]} />
        </div>
      </div>
    );
  }

}
