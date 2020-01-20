import React, { Component } from 'react';
import './profile.page.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faUserEdit,
  faUserCheck
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LocalStorageHelper from '../../helpers/local-storage-helper';
library.add(faUser, faUserCheck);

class ProfilePage extends Component {
  UserRepo = [];

  constructor(props) {
    super(props);
    this.state = {
      githubUser: 'PanduruIonut',
      isReadonly: true,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      username: 'PanduruIonut',
      userRepo: []
    };
  }

  componentDidMount() {
    this.GetUserDetails();
    this.GetMostPopularRepo();
  }
  GetUserDetails() {
    let usr = LocalStorageHelper.GetItemFromLocalStorage('username');
    axios
      .post('http://localhost:4000/users/id', {
        username: usr
      })
      .then(response => {
        console.log(response);
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
          city: response.data.city,
          country: response.data.country
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  GetMostPopularRepo() {
    axios
      .get(
        'https://api.github.com/users/' +
          this.state.githubUser +
          '/repos?q=created:">2018-09-30"language:python&sort=stars&order=desc&per_page=10',
        {}
      )
      .then(response => {
        response.data.map(item => {
          console.log(item.name);
          this.UserRepo.push(item.name);
        });

        this.setState({ userRepo: this.UserRepo });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='profile-page'>
        <div className='container-user-details'>
          <div className='profile-card'>
            <div className='header-profile'>
              <input
                className='input-field'
                readOnly={this.state.isReadonly}
                onChange={e => this.onChangeHandler(e)}
                value={this.state.githubUser}
              />{' '}
            </div>
            <div className='edit-button' onClick={e => this.toggleIsReadOnly()}>
              <FontAwesomeIcon
                icon={this.state.isReadonly ? faUserEdit : faUserCheck}
              />
            </div>
            <div>
              <div className='dispaly-inline'>
                <div>
                  <label>First Name:</label>
                  <input
                    name='firstName'
                    value={this.state.firstName}
                    className='input-fields'
                    readOnly={this.state.isReadonly}
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
                <div>
                  <label>Last Name:</label>
                  <input
                    name='lastName'
                    value={this.state.lastName}
                    className='input-fields'
                    readOnly={this.state.isReadonly}
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    name='email'
                    value={this.state.email}
                    className='input-fields'
                    readOnly={this.state.isReadonly}
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
              </div>
              <div className='dispaly-inline'>
                <div>
                  <label>Phone Nr:</label>
                  <input
                    name='phone'
                    value={this.state.phone}
                    className='input-fields'
                    readOnly={this.state.isReadonly}
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
                <div>
                  <label>City:</label>
                  <input
                    name='city'
                    value={this.state.city}
                    className='input-fields'
                    readOnly={this.state.isReadonly}
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
                <div>
                  <label>Country:</label>
                  <input
                    name='country'
                    value={this.state.country}
                    className='input-fields'
                    readOnly={this.state.isReadonly}
                    onChange={e => this.onChangeHandler(e)}
                  />
                </div>
              </div>
            </div>
            <div className='git-label'>Git Repositories:</div>
            <div className='repos'>
              {' '}
              {this.state.userRepo &&
                this.state.userRepo.map((event, index) => (
                  <div key={index}>
                    {index + 1}. {event}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  toggleIsReadOnly() {
    this.setState({
      isReadonly: !this.state.isReadonly
    });
    if (!this.state.isReadonly) {
      let id = LocalStorageHelper.GetItemFromLocalStorage('id');
      console.log(this.state);
      axios
        .put('http://localhost:4000/users/' + id + '/update', {
          id: '3',
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.lastname,
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
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
}

export default ProfilePage;
