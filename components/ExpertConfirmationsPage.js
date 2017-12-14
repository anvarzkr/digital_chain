import React, { Component } from 'react';
import Header from './Header';
import ExpertConfirmationsList from './ExpertConfirmationsList';

export default class ExpertConfirmationsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: [
        {
          name: 'Анвар Закиров',
        },
        {
          name: 'Роман Варнава',
        },
        {
          name: 'Алмаз Мельников',
        },
      ],
      experts: [
        {
          name: 'Эксперт 1',
        },
      ],
      editEvents: [
        {
          name: 'Event title'
        }
      ]
    }
  }


  render() {
    return (
      <div className="container">
        <Header state={1} navItemIndex={2}/>

        <ExpertConfirmationsList participants={this.state.users} events={this.state.editEvents} />
      </div>
    );
  }

}
