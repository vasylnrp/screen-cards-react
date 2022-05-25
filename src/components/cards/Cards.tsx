import { Component } from "react";
import { Card } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { CardComponent } from "./CardComponent";
import { ConfirmModalComponent } from "./ConfirmModalComponent";

interface CardsState {
  cards: Card[],
  showModal: boolean,
  modalContent: string,
}

interface CardsProps {
  dataService: DataService,
}

export class Cards extends Component<CardsProps, CardsState> {

  constructor(props: CardsProps) {
    super(props);
    this.state = {
      cards: [],
      showModal: false,
      modalContent: '',
    }
    this.doAction = this.doAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const cards = await this.props.dataService.getCards();
    this.setState({cards});
  }

  private async doAction(cardId: string) {
    const result = await this.props.dataService.changeCard(cardId);
    if (result) {
      this.setState({
        showModal: true,
        modalContent: `You updated the card ${cardId}, result: ${result}`
      })
    } else {
      this.setState({
        showModal: false,
        modalContent: `You can't modify the card`
      })
    }
  }

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

  private closeModal() {
    this.setState({
      showModal: false,
      modalContent: '',
    })
  }

  render() {
    return <>
      <h2>Wlcome to the cards space!</h2>
      {this.renderCards()}
      <ConfirmModalComponent
        close={this.closeModal}
        content={this.state.modalContent}
        show={this.state.showModal} />
    </>
  }
}
