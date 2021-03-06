import React, { Component } from 'react';
import ParticipantPage from './ParticipantPage';
import UserEventPage from './UserEventPage';
import Header from './Header';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ExpertPage from './ExpertPage';
import ExpertEventPage from './ExpertEventPage';
import ExpertUsersPage from './ExpertUsersPage';
import ExpertConfirmationsPage from './ExpertConfirmationsPage';
import ExpertEventCreatePage from './ExpertEventCreatePage';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={SignUp} />
        <Route path='/sign_in' component={SignIn} />
        <Route path='/participant' component={ParticipantPage} />
        <Route path='/event/:event_id' component={UserEventPage} />

        <Route path='/expert/event/:event_id' component={ExpertEventPage} />
        <Route path='/expert' component={ExpertPage} />
        <Route path='/users' component={ExpertUsersPage} />
        <Route path='/confirmations' component={ExpertConfirmationsPage} />
        <Route path='/create_event' component={ExpertEventCreatePage} />
        <Route path='/edit_event/:event_id' component={ExpertEventCreatePage} />
      </Router>
    );
  }
}
export default App
