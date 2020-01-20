import React, { Component } from 'react';
import './App.css';
import ProfilePage from './pages/profile/profile.page';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import AuthPage from './pages/auth/auth.page';

class App extends Component<any, any> {
  render() {
    return (
      <Router>
        <div className='App'>
          <Switch>
            <PrivateRoute exact path='/' component={ProfilePage} />
            <Route exact path='/login' component={AuthPage} />
            <PrivateRoute exact path='/profile' component={ProfilePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
