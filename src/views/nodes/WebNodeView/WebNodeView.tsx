import { observer } from "mobx-react";
import * as React from "react";
import { WebNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./WebNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";

interface WebNodeProps {
  store: WebNodeStore;
  onDismiss: (nodeId: string) => void;
}

@observer
export class WebNodeView extends React.Component<WebNodeProps> {
  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  render() {
    let store = this.props.store;
    return (
      <div
        className="node webNode"
        style={{
          height: store.height,
          width: store.width,
          transform: store.transform,
        }}
      >
        <TopBar store={store} />
        <DismissButton store={store} onDismiss={this.handleDismiss} />
        <BottomBar store={store} />

        <div className="scroll-box">
          <div className="content">
            <h3 className="title">{store.title}</h3>
            <iframe src={store.url}></iframe>
          </div>
        </div>
      </div>
    );
  }
}
