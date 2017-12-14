import React, { Component } from 'react';
import Header from './Header';
import ExpertUserList from './ExpertUserList';

export default class ExpertUsersPage extends Component {

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
      ]
    }
  }


  render() {
    return (
      <div className="container">
        <Header state={1} navItemIndex={1}/>

        <ExpertUserList participants={this.state.users} experts={this.state.experts} />
      </div>
    );
  }

}
