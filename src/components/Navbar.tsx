import { Component } from "react";
import { Link } from "react-router-dom";
import { User } from "../model/Model";

export class Navbar extends Component<{user: User | undefined}> {

  render() {
    const loginLogOut = this.props.user
      ? <Link to='/logout' style={{float: 'right'}}> {this.props.user.userName}</Link>
      : <Link to='/login' style={{float: 'right'}}  > login</Link>
    return (
      <div className='navbar'>
        <Link to='/'> Home</Link>
        <Link to='/profile'> Profile</Link>
        <Link to='/cards'> Cards</Link>
        {loginLogOut}
      </div>
    )
  }
}
