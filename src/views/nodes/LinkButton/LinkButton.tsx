import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./LinkButton.scss";

// Props for LinkButton class
interface LinkButtonProps {
  store: NodeStore;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

// LinkButton class
@observer
export class LinkButton extends React.Component<LinkButtonProps> {
  /**
   * Handles mouse event for link button:
   * either ends or start a link depending on node's isLinking property
   */
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
