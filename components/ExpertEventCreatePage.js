import React, { Component } from 'react';
import Header from './Header';
import FontAwesome from 'react-fontawesome';
import DatePicker from 'react-datepicker';

export default class ExpertEventCreatePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      participants: [],
      experts: [],
      title: '',
      description: '',
      startDate: '',
      expertIdInput: '',
      participantIdInput: '',
      specialty: '',
      id: '',
      editMode: false
    }

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  inputOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    let t = this;
    console.log(web3.eth.coinbase);
    if (this.props.params.event_id != undefined) {
      this.setState({
        editMode: true,
        id: this.props.params.event_id
      }, function() {
        t.fetchEvents(this.props.params.event_id);
      });

      // Логика вытягивания данных из контракта по ID
    }
  }

  fetchEvents(address) {
    let t = this;

    console.log(address);
    if (address != "0x") {
      let currentEventContract = window.EC.at(address);
      currentEventContract._name().then(function(name) {
        console.log(name);
        currentEventContract._competence().then(function(specialty) {
          console.log(specialty);
          currentEventContract._start_date().then(function(startDate) {
            console.log(startDate);
            var event = {
              title: name,
              specialty: specialty,
              startDate: window.timeConverter(startDate.c[0]),
              participants: [],
              experts: []
            };
            console.log(event);
            t.fetchParticipants(t, 0, event, currentEventContract);
          });
        });
      });
    }
  }

  fetchParticipants(t, index, event, currentEventContract) {
    currentEventContract._participants(index).then(function(participant_address) {
      if (participant_address != "0x") {
        event.participants.push(participant_address);
        t.fetchParticipants(t, index + 1, event, currentEventContract);
      } else {
        t.fetchExperts(t, 0, event, currentEventContract);
      }
    });
  }

  fetchExperts(t, index, event, currentEventContract) {
    currentEventContract._experts(index).then(function(expert_address) {
      if (expert_address != "0x") {
        event.experts.push(expert_address);
        t.fetchExperts(t, index + 1, event, currentEventContract);
      } else {
        t.setState({
          title: event.title,
          startDate: event.startDate,
          specialty: event.specialty,
          participants: event.participants,
          experts: event.experts
        })
      }
    });
  }

  addExpertHandler(e) {
    alert("Добавляем эксперта");
  }

  addParticipantHandler(e) {
    alert("Добавляем участника");
  }

  submitEdit(e) {
    // alert("Изменяем мероприятие")
    console.log("Form edit submit");
    window.dcc.changeEvent(this.state.id, this.state.title, window.timeToUnix(this.state.startDate), this.state.specialty, this.state.experts, this.state.participants, {from: web3.eth.coinbase, gas: 1400000}).then(function(data) {
      console.log(data);
    });
  }

  submitCreate(e) {
    console.log("Form create submit");
    window.dcc.createEvent(this.state.title, window.timeToUnix(this.state.startDate), this.state.specialty, this.state.experts, this.state.participants, {from: web3.eth.coinbase, gas: 1400000}).then(function(data) {
      console.log(data);
    });
  }

  addParticipant(e) {
    let participant_address = this.state.participantIdInput;
    console.log(participant_address);
    this.setState({
      participants: this.state.participants.concat(participant_address),
      participantIdInput: ''
    });
  }

  addExpert(e) {
    let expert_address = this.state.expertIdInput;
    console.log(expert_address);
    this.setState({
      experts: this.state.experts.concat(expert_address),
      expertIdInput: ''
    });
  }

  deleteUser(e) {
    e.preventDefault();
  }

  deleteExpert(e) {
    e.preventDefault();
  }

  render() {
    let participantList = this.state.participants.map((participant, index) => {
      return <li className="list-group-item">{participant}<a href="#" data-address={participant} onClick={this.deleteUser.bind(this)}>Удалить</a></li>
    });
    let expertList = this.state.experts.map((expert, index) => {
      return <li className="list-group-item">{expert}<a href="#" data-address={expert} onClick={this.deleteExpert.bind(this)}>Удалить</a></li>
    });
    return (
      <div className="container">
        <Header state={1} navItemIndex={1}/>

        <div className="col-md-8 mx-auto">
          <div className="panel panel-default">
            <div className="panel-body">

              { this.state.editMode ?
                <h1>Изменение мероприятия</h1>
                :
                <h1>Создание мероприятия</h1>
              }

              <div className="row">
                <div className="form-group col-8">
                  <label>Название</label>
                  <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.inputOnChange}/>
                </div>
                <div className="form-group col-4">
                  <label>Дата начала</label>
                  <div className="input-group date" data-provide="datepicker">
                    <input type="text" className="form-control datepicker" name="startDate" value={this.state.startDate} onChange={this.inputOnChange}/>
                    <div className="input-group-addon">
                      <FontAwesome name="calendar" />
                    </div>
                  </div>
                </div>
                <div className="form-group col-12">
                  <label>Направление</label>
                  <input className="form-control" type="text" name="specialty" value={this.state.specialty} onChange={this.inputOnChange} />
                </div>
                <div className="form-group col-6">
                  <label>Участники</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="participantIdInput" id="participantIdInput" value={this.state.participantIdInput} onChange={this.inputOnChange} placeholder="ID участника" aria-label="ID участника" />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button" onClick={this.addParticipant.bind(this)}>Добавить</button>
                    </span>
                  </div>
                  <ul className="list-group col-12 pr-0 mt-1 event-create-list">
                    {participantList}
                  </ul>
                </div>
                <div className="form-group col-6">
                  <label>Эксперты</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="expertIdInput" id="expertIdInput" value={this.state.expertIdInput} onChange={this.inputOnChange} placeholder="ID эксперта" aria-label="ID эксперта" />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button" onClick={this.addExpert.bind(this)}>Добавить</button>
                    </span>
                  </div>
                  <ul className="list-group col-12 pr-0 mt-1 event-create-list">
                    {expertList}
                  </ul>
                </div>
              </div>
              <button className="btn btn-primary" onClick={this.state.editMode ? this.submitEdit.bind(this) : this.submitCreate.bind(this)}>
                {this.state.editMode ? 'Изменить мероприятие' : 'Создать мероприятие' }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
