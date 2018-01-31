import React, { Component } from 'react'
import { Button, Checkbox, Rating, Radio } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import { createAction } from '../actions/api';
import socket from '../actions/socket';

export default class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMsg : ''
        }
    }
    
    statusReceiver = () => {
        alert('Action created successfully ')
    };
    
    handleItemClick = ( type, action ) => {
        const user = localStorage.getItem("user");
        if (user) {
            const { name, email } = JSON.parse(user);
            socket.createAction(email, 'Statistics', { type, action }, name, this.statusReceiver);
            /*createAction(email, 'Statistics', { type, action }, name)
                .then((data) => {
                    alert('Action created successfully ')
                }).catch((error) => {
                    this.setState({errMsg: 'error'})
            });*/
        }
    };
    
    render() {
        return (
            <div className="actions">
                {this.state.errMsg && (
                    <div>
                        {this.state.errMsg}
                    </div>
                )}
                <Button className='action_button' onClick={() => this.handleItemClick('global', 'button1Click')}>Action One</Button>
                <Button className='action_button' onClick={() => this.handleItemClick('event', 'button2Click')}>Action Two</Button>
                <Button className='action_button' onClick={() => this.handleItemClick('event', 'button3Click')}>Action Three</Button>
                <Button className='action_button' onClick={() => this.handleItemClick('event', 'button4Click')}>Action Four</Button>
                <Button className='action_button' onClick={() => this.handleItemClick('event', 'button5Click')}>Action Five</Button>
            </div>
        )
    }
}
