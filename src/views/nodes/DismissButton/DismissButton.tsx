import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./DismissButton.scss";

// props for DismissButton class
interface DismissButtonProps {
  store: NodeStore;
  onDismiss: (nodeId: string) => void;
}

// DismissButton class
@observer
export class DismissButton extends React.Component<DismissButtonProps> {
  /**
   * Handles mouse event of button:
   * Passes the ID of the node that needs to be deleted. 
   * Unlinks the node from its linked nodes
   * @param e - pointer event
   */
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onDismiss(this.props.store.Id);

    const { store } = this.props;

    store.outgoingLinks.forEach((link) => {
      link.node.unlinkFrom(store);
      store.unlinkFrom(link.node);
    });
    store.incomingLinks.forEach((link) => {
      link.node.unlinkFrom(store);
      store.unlinkFrom(link.node);
    });
  };

  render() {
    return (
      <div className="dismiss-button" onPointerDown={this.onPointerDown} />
    );
  }
}
