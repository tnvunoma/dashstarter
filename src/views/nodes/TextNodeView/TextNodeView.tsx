import { observer } from "mobx-react";
import * as React from "react";
import { StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";

interface TextNodeProps {
  store: StaticTextNodeStore;
  onDismiss: (nodeId: string) => void;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  render() {
    let store = this.props.store;
    return (
      <div
        className="node textNode"
        style={{
          height: store.height,
          width: store.width,
          transform: store.transform,
        }}
        onPointerDown={this.onPointerDown}
      >
        <TopBar store={store} />
        <DismissButton store={store} onDismiss={this.handleDismiss} />
        <BottomBar store={store} />

        <div className="scroll-box">
          <div className="content">
            <h3 className="title">{store.title}</h3>
            <p className="paragraph">{store.text}</p>
          </div>
        </div>
      </div>
    );
  }
}
