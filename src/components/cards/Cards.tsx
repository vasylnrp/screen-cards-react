import { Component } from "react";
import { Card } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { CardComponent } from "./CardComponent";

interface CardsState {
  cards: Card[],
}

interface CardsProps {
  dataService: DataService,
}

export class Cards extends Component<CardsProps, CardsState> {

  constructor(props: CardsProps) {
    super(props);
    this.state = {
      cards: []
    }
    this.doAction = this.doAction.bind(this);
  }

  async componentDidMount() {
    const cards = await this.props.dataService.getCards();
    this.setState({cards});
  }

  private async doAction(cardId: string) {}

  private renderCards() {
    const rows: any[] = [];
    for (const card of this.state.cards) {
      rows.push(
        <CardComponent
          cardId={card.cardId}
          name={card.name}
          doAction={this.doAction}
        />
      );
    }
    return rows;
  }

  render() {
    return <>
      <h2>Wlcome to the cards space!</h2>
      {this.renderCards()}
    </>
  }
}
