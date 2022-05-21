import React from 'react';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import './App.css';

interface AppState {
  user: User | undefined,
}

export class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService();

  render() {
    return (
      <div>from class works!</div>
    )
  }
}
