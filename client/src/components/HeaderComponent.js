import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { browserHistory } from 'react-router';
import { getMenu } from '../assets/menu'

export default class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'messages',
            menu: []
        }
    }
    
    componentWillMount() {
        const user = this.props.user;
        if (user) {
            this.updateMenu(this.props.user);
        }
    }
    
    componentWillReceiveProps(newProps){
        if (this.props.user !== newProps.user) {
            this.updateMenu(newProps.user);
        }
    }
    
    updateMenu(user) {
        if (!user) {
            this.setState({menu : []});
        }
    
        const { email } = JSON.parse(user);
        if (email === 'admin@gmail.com') {
            this.setState({menu : getMenu('adminMenu')});
            return
        }
        this.setState({menu : getMenu('menu')});
    }
    
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        browserHistory.push(`/${name}`);
    };
    
    render() {
    
        const { activeItem } = this.state;
        
        return (
            <div className="headerMenu">
                <Menu>
                    {
                        this.state.menu.map((item) => {
                            return (
                                <Menu.Item key={item.name}
                                    name={item.route}
                                    active={activeItem === item.route}
                                    onClick={this.handleItemClick}
                                >
                                    {item.name}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }
}
