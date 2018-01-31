import React, { Component } from 'react';
import { Button, Checkbox, Form, List, Input } from 'semantic-ui-react';
import { createAction, getActionsByType } from '../actions/api';
import socket from '../actions/socket';
import { browserHistory } from 'react-router';

export default class Message extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            errMsg: '',
            message: '',
            messageList: []
        };
    }
    
    componentWillMount() {
        socket.socket.on('newMessage', this.addMessage);
        
        const user = localStorage.getItem("user");
        if (user) {
            const { email } = JSON.parse(user);
            getActionsByType(email, 'Message').then((data) => {
                this.setState({
                    messageList: data.data.data
                });
            }).catch((error) => {
                this.setState({errMsg: 'There are not any actions'})
            })
        }
    }
    
    componentWillUnmount() {
        socket.socket.removeListener('newMessage', this.addMessage);
    }
    
    addMessage = (message) => {
        this.setState({
            messageList: [ ...this.state.messageList, message ],
            message: ''
        });
    };
    
    sendMessage = () => {
        const user = localStorage.getItem("user");
        if (user) {
            const { name, email } = JSON.parse(user);
            socket.createAction(email, 'Message', this.state.message, name, this.addMessage);
            /*
            createAction(email, 'Message', this.state.message, name)
                .then((data) => {
                   this.setState({
                       messageList: [ ...this.state.messageList, data.data.data ],
                       message: ''
                   });
                }).catch((error) => {
                this.setState({errMsg: 'error'})
            });*/
        }
    };
    
    setData(field, value) {
        this.setState({ [field]: value });
    }
    
    render() {
        return (
            <div>
                <List>
                    {this.state.messageList.map((message) => {
                        return (
                            <List.Item key={message._id}>
                                <span>{message.author}</span>
                                <span>-></span>
                                <span>{message.message}</span>
                            </List.Item>
                        )
                    })}
                </List>
                <Form className='log_in' onSubmit={this.sendMessage}>
                    <Form.Field>
                        <Input placeholder='Send message' value={this.state.message}  onChange={(ev, { value }) => this.setData('message', value)}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
};
