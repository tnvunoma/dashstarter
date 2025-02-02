import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./BottomBar.scss";

// props for BottomBar class
interface BottomBarProps {
  store: NodeStore;
}

// BottomBar class - handles scaling node up and down
@observer
export class BottomBar extends React.Component<BottomBarProps> {
  private isPointerDown = false;

  /**
   * Handle mouse event for bottom bar 
   * @param e - pointer event
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
   * Handles mouse up
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
   * handles mouse move (drag)
   * @param e - pointer event
   */
  onPointerMove = (e: PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.isPointerDown) return;

    this.props.store.width += e.movementX;
    this.props.store.height += e.movementY;
  };

  render() {
    return <div className="bottom-bar" onPointerDown={this.onPointerDown} />;
  }
}
