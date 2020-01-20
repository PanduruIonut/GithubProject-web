import React, { Component } from 'react';
import './auth.page.scss';
import LoginComponent from '../../components/login/login.component';
import RegisterComponent from '../../components/register/register.component';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoginOpen: true, isRegisterOpen: false, isLogged: false };
  }

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isLoginOpen: false, isRegisterOpen: true });
  }

  render() {
    return (
      <div className='root-container'>
        <div className='box-controller'>
          <div
            className={
              'controller ' +
              (this.state.isLoginOpen ? 'selected-controller' : '')
            }
            onClick={this.showLoginBox.bind(this)}
          >
            Login
          </div>
          <div
            className={
              'controller ' +
              (this.state.isRegisterOpen ? 'selected-controller' : '')
            }
            onClick={this.showRegisterBox.bind(this)}
          >
            Register
          </div>
        </div>
        <div className='box-container'>
          {this.state.isLoginOpen && <LoginComponent />}
          {this.state.isRegisterOpen && <RegisterComponent />}
        </div>
      </div>
    );
  }
}
export default AuthPage;
