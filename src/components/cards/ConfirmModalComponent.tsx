import { Component } from "react";
import './ConfirmModalComponentProps.css'

interface ConfirmModalComponentProps {
  show: boolean,
  content: string,
  close: () => void,
}

export class ConfirmModalComponent extends Component<ConfirmModalComponentProps> {
  render() {
    if (this.props.show) {
      return <div className="modal">
        <div className="modal-content">
          <h2>You tried to change and ...</h2>
          <h3 className="modal-text">{this.props.content}</h3>
          <button onClick={() => this.props.close()}>Ok, close</button>
        </div>
      </div>
    }
    return null
  }
}
