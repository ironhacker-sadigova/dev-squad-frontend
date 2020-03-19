import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './App.css';




const App = () => (
  <BrowserRouter>

<MainRouter />

  </BrowserRouter>

)

export default App;
