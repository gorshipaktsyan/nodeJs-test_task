import React, { Component } from 'react';
import { Table, Dropdown } from 'semantic-ui-react'
import { getActions, getUsers } from '../actions/api';
import { browserHistory } from 'react-router';
import socket from '../actions/socket';

export default class Actions extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errMsg: '',
            actions: [],
            selectedUser: '',
            userList: []
        }
    }
    
    componentWillMount() {
        socket.socket.on('newMessage', this.addMessage);
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
    
    addMessage = (message) => {
        this.setState({
            actions: [ ...this.state.actions, message ],
        });
    };
    
    componentWillUnmount() {
        socket.socket.removeListener('newMessage', this.addMessage);
    }
    
    onUserSelect = (event, { value }) => {
    
        getActions(value).then((data) => {
            this.setState({actions: data.data.data})
        }).catch((error) => {
            console.log(error)
        })
    
    };
    
    render() {
        return (
            <div className='actions'>
                <div>{this.state.errMsg}</div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.actions.map((action) => {
                            return (
                                <Table.Row key={action.createdAt}>
                                    <Table.Cell>{action.createdAt}</Table.Cell>
                                    <Table.Cell>{action.type}</Table.Cell>
                                    <Table.Cell>{action.message}</Table.Cell>
                                    <Table.Cell>{action.author}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
                <div className="admin_message_buttons">
                    <Dropdown
                        className='client_selector'
                        search
                        selection
                        placeholder="choose client"
                        options={this.state.userList}
                        onChange={this.onUserSelect}
                    />
                </div>
            </div>
        );
    }
};
