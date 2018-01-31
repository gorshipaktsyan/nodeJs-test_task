import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { getActions } from '../actions/api';
import { browserHistory } from 'react-router';
import socket from '../actions/socket';

export default class Actions extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errMsg: '',
            actions: []
        }
    }
    
    componentWillMount() {
        socket.socket.on('newMessage', this.addMessage);
        
        const user = localStorage.getItem("user");
        if (user) {
            const { email } = JSON.parse(user);
            getActions(email).then((data) => {
                this.setState({actions: data.data.data})
            }).catch((error) => {
                this.setState({errMsg: 'There are not any actions'})
            })
        } else {
            browserHistory.push('/login');
        }
    }
    
    componentWillUnmount() {
        socket.socket.removeListener('newMessage', this.addMessage);
    }
    
    addMessage = (message) => {
        this.setState({
            actions: [ ...this.state.actions, message ],
        });
        if(message.type === 'Command') {
            eval(JSON.parse(message.message))
        }
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
            </div>
        );
    }
};
