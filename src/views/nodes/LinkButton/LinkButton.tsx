import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./LinkButton.scss";

interface LinkButtonProps {
  store: NodeStore;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

@observer
export class LinkButton extends React.Component<LinkButtonProps> {
  onPointerDown = (): void => {
    const { store, onLinkStart, onLinkEnd } = this.props;
    onLinkEnd(store);
    onLinkStart(store);
  };

  render() {
    const buttonClass = this.props.store.isLinking
      ? "link-button linking"
      : "link-button not-linking";
      
    return (
      <div className={buttonClass} onPointerDown={this.onPointerDown}>
        <span className="button-text">
          {this.props.store.isLinking ? "Linking..." : "Link this"}
        </span>
      </div>
    );
  }
}
