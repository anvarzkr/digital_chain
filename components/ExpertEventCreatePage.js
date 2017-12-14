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
  }

  inputOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    if (this.props.params.event_id != undefined) {
      this.setState({
        editMode: true,
        id: this.props.params.event_id
      });

      // Логика вытягивания данных из контракта по ID
    }
  }

  addExpertHandler(e) {
    alert("Добавляем эксперта");
  }

  addParticipantHandler(e) {
    alert("Добавляем участника");
  }

  submitEdit(e) {
    alert("Изменяем мероприятие")
  }

  render() {
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
                    <input type="text" className="form-control datepicker" />
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
                    <input type="text" className="form-control" name="participantIdInput" value={this.state.participantIdInput} onChange={this.inputOnChange} placeholder="ID участника" aria-label="ID участника" />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button">Добавить</button>
                    </span>
                  </div>
                  <ul className="list-group col-12 pr-0 mt-1 event-create-list">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                  </ul>
                </div>
                <div className="form-group col-6">
                  <label>Эксперты</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name=""expertIdInput value={this.state.expertIdInput} onChange={this.inputOnChange} placeholder="ID эксперта" aria-label="ID эксперта" />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button">Добавить</button>
                    </span>
                  </div>
                  <ul className="list-group col-12 pr-0 mt-1 event-create-list">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                  </ul>
                </div>
              </div>
              <button className="btn btn-primary" onClick={this.submitEdit.bind(this)}>
                {this.state.editMode ? 'Изменить мероприятие' : 'Создать мероприятие' }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
