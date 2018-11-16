import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import serverURL from './serverURL';
import { Tabs, TabLink, TabContent } from '../node_modules/react-tabs-redux';
import TextField from '../node_modules/material-ui/TextField';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import './App.css';
import './tab.css';
import './home.css';
import logo from './clip.png';
import Task from './task.png';
import Error from './error.png';
import UserID from './UserID';

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: '',
      password: '',
      width: 0,
      height: 0,
      logintoggle:false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleSignUp= this.handleSignUp.bind(this);
    this.handleLogIn= this.handleLogIn.bind(this);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  setEmail = (event) => {
      this.setState({
          email: event.target.value
      });
      console.log(this.state.email);
  }
  setPassword = (event) => {
      this.setState({
          password: event.target.value
      });
      console.log(this.state.password);
  }
  login(data){
    console.log(data);
    if(data!="Failed Login" && data!="No Email or Password"){
      console.log(data.Activated.idUsers);
      UserID.setID(data.Activated.idUsers);
      console.log(UserID.getID());
      this.handleOnClick()
    }
    else{
      alert("login failed");
    }
  }
  handleSignUp () {
    return axios.post('https://task-ceiline.herokuapp.com/users', { email: this.state.email, password: this.state.password })
    .then(response => console.log(response)).then(this.setState({email: '', password: ''}));
  }
  handleLogIn () {
    return axios.get('https://task-ceiline.herokuapp.com/users/'+this.state.email+'/'+this.state.password)
    .then(response => this.login(response.data));
  }
  handleOnClick = () => {
  this.setState({redirect: true});
  }
  renderLogin = () => {
    const styles = {
      errorStyle: {
        color: '#FF847C',
      },
      underlineFocusStyle: {
        borderColor: '#99B898',
      },
      floatingLabelStyle: {
        color: '#2A363B',
      },
      floatingLabelFocusStyle: {
        color: '#FF847C',
      },
    };
    return (
      <div className = "title-back">
        <h1 className = "title">Login</h1>
        <p>Welcome back! Login to start managing your time.</p>
        <div className = 'text'>
        <input type="text" className="textbox" id= "color" placeholder="Email" value={this.state.email} onChange={(event)=> {this.setState({email : event.target.value})}}/>
        <input type="text" className="textbox" id= "color" placeholder="Email" value={this.state.password} onChange={(event)=> {this.setState({password : event.target.value})}}/>
        </div>
        <div className="account">
        <span>No account yet?</span> <span className="purple" onClick={() => {this.setState({logintoggle:false})}}>Sign up</span>
        </div>
        <button className= "load" onClick={this.handleLogIn}>
          <div className="load-button">
          Login
          </div>
        </button>
      </div>
    )
  }
  renderSign = () => {
    const styles = {
      errorStyle: {
        color: '#FF847C',
      },
      underlineFocusStyle: {
        borderColor: '#99B898',
      },
      floatingLabelStyle: {
        color: '#2A363B',
      },
      floatingLabelFocusStyle: {
        color: '#FF847C',
      },
    };
    return(
      <div className = "title-back">
        <h1 className = "title">Sign Up</h1>
        <p>Discover how productive you can be! Sign up now for free.</p>
        <div className = 'text'>
        <input type="text" className="textbox" id= "color" placeholder="Email" value={this.state.email} onChange={(event)=> {this.setState({email : event.target.value})}}/>
        <input type="text" className="textbox" id= "color" placeholder="Password" value={this.state.password} onChange={(event)=> {this.setState({password : event.target.value})}}/>
        </div>
        <div className="account">
        <span>Have an account? </span> <span className="purple" onClick={() => {this.setState({logintoggle:true})}}>Log in.</span>
        </div>
        <button className= "load" onClick={() => {
            this.handleSignUp().then(alert("Thanks for signing up, you can sign in now!"))}}>
          <div className="load-button">
          Sign Up
          </div>
        </button>
      </div>
    )
  }
  render() {
    if (this.state.redirect) {
    return <Redirect push to="/home" />;
    }
    if(this.state.width > 560){
      return (
        <div>
          <div className="Message">
          This webapp is only optimized for mobile devices, sorry for the inconvenience!
          </div>
        </div>
      )
    }
    else{
    return (
      <div className="App">
        <div className = "Post">
        <div>
          <img src={logo} className="logo"/>
          <div className="logo-title">
          Taskr
          </div>
        </div>
          {this.state.logintoggle ? this.renderLogin() : this.renderSign()}
        </div>
      </div>
    );
  }
  }
}

export default App;
