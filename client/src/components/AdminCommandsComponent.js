import React, { Component } from 'react';
import { Button, Checkbox, Form, List, Input, Dropdown } from 'semantic-ui-react';
import { createAction, getActionsByType, getUsers } from '../actions/api';
import { browserHistory } from 'react-router';
import socket from '../actions/socket';

export default class AdminMessage extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            errMsg: '',
            command: '',
            commandList: [],
            userList: [],
            selectedUser: ''
        }
    }
    
    componentWillMount() {
        //socket.socket.on('newMessage', this.addMessage);
        const { user } = this.props.route;
        if (!user) {
            browserHistory.push('/login');
            return
        }
        const { email } = JSON.parse(user);
    
        getUsers().then((data) => {
            const users = data.data.data.filter((user) => {
                return !(user.email === "admin@gmail.com")
            });
            const userList = users.map((user) => {
                return {
                    key: user._id,
                    value: user.email,
                    text: user.name
                }
            });
            this.setState({userList});
        }).catch((error) => {
            console.log(error)
        })
    }
    
    componentWillUnmount() {
        socket.socket.removeListener('newMessage', this.addMessage);
    }
    
    addMessage = (message) => {
        this.setState({
            commandList: [ ...this.state.commandList, message ],
            command: ''
        });
    };
    
    sendCommand = () => {
        const { user } = this.props.route;
        if (user) {
            const { name } = JSON.parse(user);
            socket.createAction(this.state.selectedUser, 'Command', this.state.command, name, this.addMessage, true);
            /*createAction(this.state.selectedUser, 'Command', this.state.command, name)
                .then((data) => {
                    this.setState({
                        commandList: [ ...this.state.commandList, data.data.data ],
                        command: ''
                    });
                }).catch((error) => {
                this.setState({errMsg: 'error'})
            });*/
        }
    };
    
    setData(field, value) {
        this.setState({ [field]: value });
    }
    
    onUserSelect = (event, { value }) => {
        
        getActionsByType(value, 'Command').then((data) => {
            this.setState({commandList: data.data.data, selectedUser: value});
        }).catch((error) => {
            this.setState({errMsg: 'There are not any actions'})
        });
    };
    
    render() {
        return (
            <div>
                <List>
                    {this.state.commandList.map((command) => {
                        return (
                            <List.Item key={command._id}>
                                <span>{command.message}</span>
                            </List.Item>
                        )
                    })}
                </List>
                <Form className='log_in' onSubmit={this.sendCommand}>
                    <Form.Field>
                        <Input placeholder='Send command' value={this.state.command}  onChange={(ev, { value }) => this.setData('command', value)}/>
                    </Form.Field>
                    <div className="admin_message_buttons">
                        <Dropdown
                            className='client_selector'
                            search
                            selection
                            placeholder="choose client"
                            options={this.state.userList}
                            onChange={this.onUserSelect}
                        />
                        <Button className='submit_button' type='submit'>Submit</Button>
                    </div>
                </Form>
            </div>
        );
    }
};
