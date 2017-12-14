import React, { Component } from 'react';
import Header from './Header';
import ExpertEventListItem from './ExpertEventListItem';
import { Link, browserHistory } from 'react-router';

export default class ExpertPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      createdEvents: [
        {
          title: 'test 1',
          startDate: '15.12.2017'
        },
        {
          title: 'test 2',
          startDate: '16.12.2017',
          description: 'Test description here. Could be many words.'
        }
      ],
      expertEvents: [
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
      ]
    }
  }

  eventListItemClickHandler(e) {
    e.preventDefault();
    console.log($(e.target).closest('.list-group-item').data('id'));
    browserHistory.push('/expert/event');
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
