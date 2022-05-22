import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import './App.css';
import { Navbar } from './Navbar';

interface AppState {
  user: User | undefined,
}

interface AppProps {}

export class App extends React.Component<AppProps, AppState> {

  private authService: AuthService = new AuthService();

  constructor(props: AppProps) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.setUser = this.setUser.bind(this);
  }

  private setUser(user: User) {
    this.setState({
      user: user,
    });
    console.log('setting the user:!', {user});
  }

  render() {
    const Home = lazy(() => import('./Home'));
    const Login = lazy(() => import('./Login'));
    const Profile = lazy(() => import('./Profile'));

    return (
      <div className='wrapper'>
        <BrowserRouter>
          <Navbar user={this.state.user} />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login authService={this.authService} setUser={this.setUser}/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    )
  }
}
