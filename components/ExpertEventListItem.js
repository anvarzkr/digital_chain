import React, { Component } from 'react';

export default class ExpertEventListItem extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <a href="#" onClick={this.props.onClick} data-id={this.props.event.address} className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.event.title}</h5>
          <small>{this.props.event.startDate}</small>
        </div>
        <p className="mb-1">{this.props.event.specialty}</p>
        <small></small>
      </a>
    );
  }

}
