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
        onWheel={(e: React.WheelEvent) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="topbar-dismiss-container">
          <TopBar store={this.props.store} />
          <DismissButton
            store={this.props.store}
            onDismiss={this.handleDismiss}
          />
        </div>
        
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
