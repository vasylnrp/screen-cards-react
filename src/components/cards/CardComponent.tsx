import { Component } from "react";
import genericImage from '../../assets/default.png';

interface CardComponentProps {
  cardId: string,
  name: string,
  photoUrl?: string,
  doAction: (cardId: string) => void,
}

export class CardComponent extends Component<CardComponentProps> {

  private renderImage() {
    if (this.props.photoUrl) {
      return <img src={this.props.photoUrl} alt='' />
    } else {
      return <img src={genericImage} alt='' />
    }
  }

  render() {
    return <>
      <label>{this.props.cardId}</label><br/>
      <label>{this.props.name}</label><br/>
      <button onClick={() => this.props.doAction(this.props.cardId)}>Reserve</button>
    </>
  }
}
