import React, { Component } from 'react';

export default class UserEventListItem extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  changeCurrentEvent(e) {
    e.preventDefault();
    console.log("Clicked on " + this.props.index + " event list item");
    this.props.changeCurrentEvent(this.props.index);
  }

  render() {
    return (
      <a href="#" onClick={this.changeCurrentEvent.bind(this)} className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.event.title}</h5>
          <small>{this.props.event.startDate}</small>
        </div>
        <p className="mb-1">{this.props.event.description}</p>
        <small></small>
      </a>
    );
  }

}
