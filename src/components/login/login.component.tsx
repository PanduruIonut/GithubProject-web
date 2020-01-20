import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LocalStorageHelper from '../../helpers/local-storage-helper';

class LoginComponent extends Component<any> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = { username: '', password: '', isLogged: false };
  onChangeHandler(event: any) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post('http://localhost:4000/auth/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        LocalStorageHelper.SaveItemToLocalStorage('isLogged', true);
        LocalStorageHelper.SaveItemToLocalStorage('id', response.data.user.id);
        LocalStorageHelper.SaveItemToLocalStorage(
          'username',
          response.data.user.username
        );
        this.setState({ isLogged: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const redirect = this.state.isLogged ? <Redirect to='/profile' /> : '';
    return (
      <div className='inner-container'>
        <div className='header'>Login</div>
        <form onSubmit={this.handleSubmit}>
          <div className='box'>
            <div className='input-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                className='login-input'
                placeholder='Username'
                onChange={e => this.onChangeHandler(e)}
              />
            </div>

            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                className='login-input'
                placeholder='Password'
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            {redirect}

            <button type='submit' className='login-btn' value='Login'>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default LoginComponent;
