import { Component } from "react";
import { Link } from "react-router-dom";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface ProfileProps {
  user: User | undefined,
  authService: AuthService,
}

interface ProfileState {
  userAttributes: UserAttribute[],
}

export default class Profile extends Component<ProfileProps, ProfileState> {

  state: Readonly<ProfileState> = {
    userAttributes: []
  }

  async componentDidMount() {
    if (this.props.user) {
      const userAtrs = await this.props.authService.getUserAttributes(this.props.user)
      this.setState({
        userAttributes: userAtrs
      })
    }
 }

  render() {
    const profileSpace = this.props.user
      ? <>
        <h3>Hello {this.props.user.userName}</h3>
        Here are your attributes:
        {this.renderUserAttributes()}
      </>
      : <Link to='/login'>Login</Link>
    return (
      <div>
        {profileSpace}
      </div>
    )
  }

  private renderUserAttributes() {
    const rows = [];
    for (const userAttribute of this.state.userAttributes) {
      rows.push(<tr key={userAttribute.Name}>
        <td>{userAttribute.Name}</td>
        <td>{userAttribute.Value}</td>
      </tr>)
    }
    return <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  }
}
