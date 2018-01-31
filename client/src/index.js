import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent.js';
import Storage from './storage'

window.customStorage = new Storage();

ReactDOM.render(
        <AppComponent/>,
    document.querySelector('#mount-point'));
