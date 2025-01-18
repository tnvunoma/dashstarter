import { observer } from "mobx-react";
import * as React from "react";
import { VideoNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./VideoNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";

interface VideoNodeProps {
  store: VideoNodeStore;
  onDismiss: (nodeId: string) => void;
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {
  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  render() {
    let store = this.props.store;
    return (
      <div
        className="node videoNode"
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
            <video src={store.url} controls />
          </div>
        </div>
      </div>
    );
  }
}
