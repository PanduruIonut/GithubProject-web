import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LocalStorageHelper from '../../helpers/local-storage-helper';

class RegisterComponent extends Component<any> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    errors: [],
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    country: ''
  };

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post('http://localhost:4000/auth/create', {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        city: this.state.city,
        country: this.state.country
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // clearValidationErr(elements) {}
  // submitRegister(e) {
  //   this.setState(prevState => {
  //     let newArr = [];
  //     for (let err of prevState.errors) {
  //       if (elements != err.elements) newArr.push(err);
  //     }
  //   });
  //   return newArr;
  // }

  onChangeHandler(event: any) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className='register-container'>
        <div className='inner-container'>
          <div className='header'>Register</div>
          <form onSubmit={this.handleSubmit}>
            <div className='box'>
              <div className='row'>
                <div className='input-group col-6'>
                  <label htmlFor='username'>Username</label>
                  <input
                    type='text'
                    name='username'
                    className='login-input'
                    placeholder='Username'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>

                <div className='input-group col-6'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='text'
                    name='email'
                    className='login-input'
                    placeholder='Email'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='input-group col-6'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    className='login-input'
                    placeholder='Password'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>

                <div className='input-group col-6'>
                  <label htmlFor='firstName'>FirstName</label>
                  <input
                    type='text'
                    name='firstName'
                    className='login-input'
                    placeholder='FirstName'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='input-group col-6'>
                  <label htmlFor='lastName'>LastName</label>
                  <input
                    type='text'
                    name='lastName'
                    className='login-input'
                    placeholder='lastName'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>

                <div className='input-group col-6'>
                  <label htmlFor='phone'>Phone</label>
                  <input
                    type='text'
                    name='phone'
                    className='login-input'
                    placeholder='phone'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='input-group col-6'>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    name='city'
                    className='login-input'
                    placeholder='city'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>

                <div className='input-group col-6'>
                  <label htmlFor='country'>Country</label>
                  <input
                    type='text'
                    name='country'
                    className='login-input'
                    placeholder='contry'
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
              </div>

              <button type='submit' className='login-btn' value='Register'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default RegisterComponent;
