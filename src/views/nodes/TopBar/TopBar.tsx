import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./TopBar.scss";

// props for TopBar class
interface TopBarProps {
  store: NodeStore;
}

// TopBar class
@observer
export class TopBar extends React.Component<TopBarProps> {
  private isPointerDown = false;

  /**
   * Handles mosue events for top bar - changes node's position
   * @param e - poiter event
   */
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.isPointerDown = true;
    document.removeEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);
    document.addEventListener("pointerup", this.onPointerUp);
  };

  /**
   * Mouse pointer up event
   * @param e - pointer event
   */
  onPointerUp = (e: PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.isPointerDown = false;
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);
  };

  /**
   * Mouse move event (drag)
   * @param e - pointer event
   */
  onPointerMove = (e: PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.isPointerDown) return;

    this.props.store.x += e.movementX;
    this.props.store.y += e.movementY;
  };

  render() {
    return <div className="topbar" onPointerDown={this.onPointerDown} />;
  }
}
