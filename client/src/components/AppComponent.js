import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './HeaderComponent';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import ActionsComponent from './ActionsComponent.js';
import MessageComponent from './MessageComponent.js';
import LogInComponent from './LogInComponent.js';
import StatisticsComponent from './StatisticsComponent.js';
import AdminMessageComponent from './AdminMessageComponent.js';
import AdminCommandsComponent from './AdminCommandsComponent.js';
import AdminUsersComponent from './AdminUsersComponent.js';
import AdminActionsComponent from './AdminActionsComponent.js';

class App extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            user: window.customStorage.get("user")
        };
        this.onUserChange = ::this.onUserChange;
    }
    
    componentWillMount () {
        window.customStorage.subscribe('change-user', this.onUserChange);
        browserHistory.push('/login');
    }
    
    componentWillUnmount() {
        window.customStorage.unSubscribe('change-user', this.onUserChange);
    }
    
    onUserChange(data) {
        const user = data.value;
        this.setState({ user: data.value });
    }
    
    render() {
        const user = this.state.user;
        
        return (
           <div className="wrapper">
               {user && (
                   <div className="header">
                       <Header user={user} />
                   </div>
               )}
               <div className="main_container">
                   <Router history={browserHistory} key={Math.random()}>
                       <Route path='/'>
                           <Route path='/actions' component={ActionsComponent} user={user}/>
                           <Route path='/message' component={MessageComponent} user={user} io={this.io}/>
                           <Route path='/login' component={LogInComponent} />
                           <Route path='/statistics' component={StatisticsComponent} user={user}/>
            
                           <Route path='/admin/message' component={AdminMessageComponent} user={user}/>
                           <Route path='/admin/commands' component={AdminCommandsComponent} user={user}/>
                           <Route path='/admin/users' component={AdminUsersComponent} user={user}/>
                           <Route path='/admin/actions' component={AdminActionsComponent} user={user}/>
                       </Route>
                   </Router>
               </div>
           </div>
        );
    }
}

export default App;
