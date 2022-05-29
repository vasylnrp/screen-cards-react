import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import { DataService } from '../services/DataService';
import history from '../utils/history';
import './App.css';
import { Cards } from './cards/Cards';
import { CreateCard } from './cards/CreateCard';
import { Navbar } from './Navbar';

interface AppState {
  user: User | undefined,
}

interface AppProps {}

export class App extends React.Component<AppProps, AppState> {

  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  constructor(props: AppProps) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.setUser = this.setUser.bind(this);
  }

  private async setUser(user: User) {
    this.setState({
      user: user,
    });
    this.dataService.setUser(user);
    await this.authService.getAWSTemporaryCreds(user.cognitoUser);
  }

  render() {
    const Home = lazy(() => import('./Home'));
    const Login = lazy(() => import('./Login'));
    const Profile = lazy(() => import('./Profile'));

    return (
      <div className='wrapper'>
        <HistoryRouter history={history}>
          <Navbar user={this.state.user} />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login authService={this.authService} setUser={this.setUser}/>}/>
              <Route path='/profile'
                element={<Profile user={this.state.user} authService={this.authService} />}/>
              <Route path='/cards'
                element={<Cards dataService={this.dataService} />}/>
              <Route path='/createCard'
                element={<CreateCard dataService={this.dataService} />}/>
            </Routes>
          </Suspense>
        </HistoryRouter>
      </div>
    )
  }
}
