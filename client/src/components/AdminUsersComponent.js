import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { getUsers } from '../actions/api';
import { browserHistory } from 'react-router';

export default class Actions extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errMsg: '',
            userList: []
        }
    }
    
    componentWillMount() {
        const { user } = this.props.route;
        if (!user) {
            browserHistory.push('/login');
            return
        }
        
        getUsers().then((data) => {
            this.setState({userList: data.data.data})
        }).catch((error) => {
            console.log(error)
        })
    }
    
    render() {
        return (
            <div className='actions'>
                <div>{this.state.errMsg}</div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Created data</Table.HeaderCell>
                            <Table.HeaderCell>Last visit</Table.HeaderCell>
                            <Table.HeaderCell>Last action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.userList.map((user) => {
                            return (
                                <Table.Row key={user.createdAt}>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.createdAt}</Table.Cell>
                                    <Table.Cell>{user.lastVisit}</Table.Cell>
                                    <Table.Cell>{user.lastAction}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        );
    }
};
