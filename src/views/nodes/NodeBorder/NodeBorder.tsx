import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./NodeBorder.scss";

interface NodeBorderProps {
  store: NodeStore;
}

@observer
export class NodeBorder extends React.Component<NodeBorderProps> {
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

    // Calculate how much the mouse has moved
    this.props.store.scaleX += e.movementX / 100;
    this.props.store.scaleY += e.movementY / 100;
  };

  render() {
    return <div className="node-border" onPointerDown={this.onPointerDown} />;
  }
}
