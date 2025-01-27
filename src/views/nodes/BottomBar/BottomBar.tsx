import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./BottomBar.scss";

interface BottomBarProps {
  store: NodeStore;
}

@observer
export class BottomBar extends React.Component<BottomBarProps> {
  private isPointerDown = false;

  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.isPointerDown = true;

    document.removeEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);
    document.addEventListener("pointerup", this.onPointerUp);
  };

  onPointerUp = (e: PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.isPointerDown = false;

    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);
  };

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
