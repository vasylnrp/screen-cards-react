import { Component } from "react";
import genericImage from '../../assets/default.png';
import { Card } from "../../model/Model";
import { DataService } from "../../services/DataService";

interface CardsState {
  cards: Card[],
}

interface CardsProps {
  dataService: DataService,
}

export class Cards extends Component<CardsProps, CardsState> {

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
