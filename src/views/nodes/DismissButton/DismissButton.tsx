import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./DismissButton.scss";

interface DismissButtonProps {
  store: NodeStore;
  onDismiss: (nodeId: string) => void;
}

@observer
export class DismissButton extends React.Component<DismissButtonProps> {
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onDismiss(this.props.store.Id);

    const { store } = this.props;

    store.outgoingLinks.forEach((link) => {
      link.node.unlinkFrom(store);
    });
    store.incomingLinks.forEach((link) => {
      link.node.unlinkFrom(store);
    });
  };

  render() {
    return (
      <div className="dismiss-button" onPointerDown={this.onPointerDown} />
    );
  }
}
