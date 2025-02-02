import { observer } from "mobx-react";
import * as React from "react";
import { VideoNodeStore, NodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./VideoNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
import { LinkButton } from "../LinkButton";

// props for VideoNodeView class
interface VideoNodeProps {
  store: VideoNodeStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

// VideoNodeView class
@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {
  state = {
    isEditingTitle: false,
    title: this.props.store.title,
  };

  /**
   * Handles mouse events for video nodes
   * @param e - pointer event
   */
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  /**
   * Dismissed ndoe by ID
   * @param nodeId - ndoe ID
   */
  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  /**
   * Handle video upload for given video input from system
   * @param event
   */
  handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      this.props.store.url = videoUrl;
    }
  };

  /**
   * Switch on title editing mode upon title click
   */
  toggleTitleEdit = () => {
    this.setState({ isEditingTitle: !this.state.isEditingTitle });
  };

  /**
   * Takes in user input for title text
   * @param event
   */
  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  /**
   * Hanled blur event to save title
   */
  handleTitleBlur = () => {
    const { title } = this.state;
    this.props.store.title = title;
    this.setState({ isEditingTitle: false });
  };

  /**
   * handles enter key press to save title
   * @param event - key event
   */
  handleTitleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.handleTitleBlur();
    }
  };

  render() {
    const { store, onLinkStart, onLinkEnd } = this.props;
    const { isEditingTitle, title } = this.state;
    const videoUploadId = `video-upload-${store.Id}`;

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
            {/* editable title */}
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={this.handleTitleChange}
                onBlur={this.handleTitleBlur}
                onKeyDown={this.handleTitleKeyDown}
                autoFocus
                style={{ width: "100%" }}
              />
            ) : (
              <h3 className="title" onClick={this.toggleTitleEdit}>
                {store.title}
              </h3>
            )}

            {/* video url upload */}
            {store.url ? (
              <video
                controls
                style={{ width: "100%" }}
                src={store.url}
                onClick={() => document.getElementById(videoUploadId)?.click()}
              />
            ) : (
              <img
                src={store.placeholder}
                alt="Upload new video"
                onClick={() => document.getElementById(videoUploadId)?.click()}
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
          id={videoUploadId}
          onChange={this.handleVideoUpload}
        />
      </div>
    );
  }
}
