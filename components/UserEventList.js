import React, { Component } from 'react';
import UserEventListItem from './UserEventListItem';

export default class UserEventList extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    let eventList = this.props.events.map((event, index) => {
      return <UserEventListItem key={index} index={index} event={event} changeCurrentEvent={this.props.changeCurrentEvent}/>
    });

    return (
      <div className="list-group col-3" id="user-event-list">
        {eventList}
      </div>
    );
  }

}
