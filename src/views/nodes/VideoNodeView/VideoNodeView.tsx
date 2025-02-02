import { observer } from "mobx-react";
import * as React from "react";
import { VideoNodeStore, NodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./VideoNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
import { LinkButton } from "../LinkButton";

interface VideoNodeProps {
  store: VideoNodeStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`Uploading video for node ID: ${this.props.store.Id}`);
      const videoUrl = URL.createObjectURL(file);
      console.log(`Setting URL: ${videoUrl}`);
      this.props.store.url = videoUrl;
    }
  };

  render() {
    let store = this.props.store;
    let { onLinkStart, onLinkEnd } = this.props;
    return (
      <div
        className="node videoNode"
        style={{
          height: store.height,
          width: store.width,
          transform: store.transform,
        }}
        onPointerDown={this.onPointerDown}
      >
        <TopBar store={store} />
        <LinkButton
          store={store}
          onLinkStart={onLinkStart}
          onLinkEnd={onLinkEnd}
        />
        <DismissButton store={store} onDismiss={this.handleDismiss} />
        <BottomBar store={store} />

        <div className="scroll-box">
          <div className="content">
            <h3 className="title">{store.title}</h3>
            {store.url ? (
              <video controls style={{ width: "100%" }} src={store.url} />
            ) : (
              <img
                src={store.placeholder}
                alt="Upload new video"
                onClick={() => document.getElementById("video-upload")?.click()}
                style={{
                  width: "100%",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        </div>
        <input
          type="file"
          accept="video/*"
          id="video-upload"
          onChange={this.handleVideoUpload}
        />
      </div>
    );
  }
}
