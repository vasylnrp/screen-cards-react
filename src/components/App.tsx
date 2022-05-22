import React from 'react';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import './App.css';
import { Login } from './Login';

interface AppState {
  user: User | undefined,
}

interface AppProps {}

export class App extends React.Component<AppProps, AppState> {

  private authService: AuthService = new AuthService();

  constructor(props: AppProps) {
    super(props)

    this.setUser = this.setUser.bind(this);
  }

  private setUser(user: User) {
    this.setState({
      user: user,
    });
    console.log('setting the user:!', {user});

  }

  render() {
    return (
      <div>
        from class works!
        <Login authService={this.authService} setUser={this.setUser}/>
      </div>
    )
  }
}
