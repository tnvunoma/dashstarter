import { observer } from "mobx-react";
import * as React from "react";
import { VideoNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./VideoNodeView.scss";
import { NodeBorder } from "../NodeBorder";

interface VideoNodeProps {
  store: VideoNodeStore;
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {
  render() {
    let store = this.props.store;
    return (
      <div className="node videoNode" style={{ transform: store.transform }}>
        <TopBar store={store} />

        <div className="scroll-box">
          <NodeBorder store={store} />

          <div className="content">
            <h3 className="title">{store.title}</h3>
            <video src={store.url} controls />
          </div>
        </div>
      </div>
    );
  }
}
