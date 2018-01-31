import React, { Component } from 'react';
import { login } from '../actions/api';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import socket from '../actions/socket';

export default class LogIn extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errMsg: '',
            name: '',
            email: ''
        };
    }
    
    componentWillMount() {
        const user = localStorage.getItem("user");
        if (user) {
            const { name, email } = JSON.parse(user);
            this.setState({ name, email })
        }
    }
    
    handleSubmit = (event) => {
        const {name, email} = this.state;
        login({name, email}).then((data) => {
            const user = data.data.data;
            socket.addUser(email);
            localStorage.setItem("user", JSON.stringify(user));
            window.customStorage.set("user", JSON.stringify(user));
            if(user.email === 'admin@gmail.com') {
                browserHistory.push('/admin/message');
                return
            }
            browserHistory.push('/actions');
        }).catch((error) => {
            console.log(error);
            this.setState({errMsg: 'Wrong Credentials'});
        });
    };
    
    setData(field, value) {
        this.setState({ [field]: value });
    }
    
    render() {
        return (
            <Form onSubmit={this.handleSubmit} className='log_in'>
                {this.state.errMsg && (
                    <div>
                        {this.state.errMsg}
                    </div>
                )}
                <Form.Field>
                    <label>First Name</label>
                    <Input placeholder='First Name' defaultValue={this.state.name}  onChange={(ev, { value }) => this.setData('name', value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <Input placeholder='Email' defaultValue={this.state.email} onChange={(ev, { value }) => this.setData('email', value)}/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
};
