import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Redirect, Switch, Router, Route, Link } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App.js';
import Home from './Home.js';
//Browserrouter should be used over hashrouter generally
//Browserrouter essentially mimicks a multipage app and keeps UI insync with the URL
render(
    <BrowserRouter>
      {/*Renders the first Route child that matches the location*/}
      <Switch>
        <Route exact={true} path='/' component={App}/>
        <Route path='/home' component={Home}/>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
