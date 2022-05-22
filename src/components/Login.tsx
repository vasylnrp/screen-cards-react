import React, { SyntheticEvent } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from "../utils/history";

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface LoginState {
  userName: string,
  password: string,
  loginAttempted: boolean,
  loginSuccessfull: boolean,
}

interface CustomEvent {
  target: HTMLInputElement,
}

export default class Login extends React.Component<LoginProps, LoginState> {

  state: Readonly<LoginState> = {
    userName: '',
    password: '',
    loginAttempted: false,
    loginSuccessfull: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({userName: event.target.value});
  }

  private setPassword(event: CustomEvent) {
    this.setState({password: event.target.value})
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({loginAttempted: true})
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    )
    if (result) {
      this.setState({loginSuccessfull: true});
      this.props.setUser(result);
      history.push('/profile');
    } else {
      this.setState({loginSuccessfull: false});
    }
  }

  render() {
    let loginMessage: any;
    if (this.state.loginAttempted) {
      if (this.state.loginSuccessfull) {
        loginMessage = <label>Login sucessfull</label>
      } else {
        loginMessage = <label>Login failed</label>
      }
    }
    return (
      <>
        <h2>Please login</h2>
        {loginMessage}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input value={this.state.userName} onChange={e => this.setUserName(e)} /><br/>
          <input value={this.state.password} type='password' onChange={e => this.setPassword(e)} /><br/>
          <input type='submit'/>
        </form>
      </>
    )
  }
}
