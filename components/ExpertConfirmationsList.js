import React, { Component } from 'react';

export default class ExpertConfirmationsList extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  confirm_user(e) {
    // alert("Подтверждаем повышение пользователя");
    let address = $(e.target).data('address');
    console.log(address);
    window.dcc.submitNominationToExpert(address, {from: web3.eth.coinbase, gas: 1400000}).then(function(data) {
      console.log(data);
    });
  }

  confirm_event(e) {
    // alert("Подтверждаем изменения мероприятия");
    let address = $(e.target).data('address');
    console.log(address);
    window.dcc.submitEventEddition(address, {from: web3.eth.coinbase, gas: 1400000}).then(function(data) {
      console.log(data);
    });
  }

  render() {
    let participantsList = this.props.participants.map((participant, index) => {
      return (
        <li className="list-group-item" key={index}>
          {participant.address} : {participant.count}/3
          <span style={{float: 'right'}}>
            <button className="btn btn-primary" data-address={participant.address} onClick={this.confirm_user.bind(this)}>Подтвердить</button>
          </span>
        </li>
      );
    });

    let eventsList = this.props.events.map((event, index) => {
      return (
        <li className="list-group-item" key={index}>
          {event.address} : {event.count}/3
          <span style={{float: 'right'}}>
            <button className="btn btn-primary" data-address={event.address} onClick={this.confirm_event.bind(this)}>Подтвердить</button>
          </span>
        </li>
      );
    });

    return (
      <div className="row mx-0">
        <ul className="list-group col-6 event-participants-list">
          <strong>Пользователи на повышение:</strong>
          {participantsList}
        </ul>
        <ul className="list-group col-6 event-participants-list">
          <strong>Мероприятия на изменение:</strong>
          {eventsList}
        </ul>
      </div>
    );
  }

}
