import React, { Component } from 'react';
import Header from './Header';
import ExpertUserList from './ExpertUserList';

export default class ExpertUsersPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: [

      ],
      experts: [

      ]
    }
  }

  componentDidMount() {
    // window.dcc._nominantstoExpert(0).then(function(data) {
    //   console.log(data);
    // });
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
