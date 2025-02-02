import { observer } from "mobx-react";
import * as React from "react";
import { ImageNodeStore, NodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./ImageNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
import { LinkButton } from "../LinkButton";

interface ImageNodeProps {
  store: ImageNodeStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {
  state = {
    isEditingTitle: false,
    title: this.props.store.title,
  };

  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.props.store.url = imageUrl;
    }
  };

  // Toggle the title edit mode
  toggleTitleEdit = () => {
    this.setState({ isEditingTitle: !this.state.isEditingTitle });
  };

  // Handle title change (on input field change)
  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  // Handle blur to save the title
  handleTitleBlur = () => {
    const { title } = this.state;
    this.props.store.title = title;
    this.setState({ isEditingTitle: false });
  };

  // handle Enter key press to save title
  handleTitleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.handleTitleBlur();
    }
  };

  render() {
    const { store, onLinkStart, onLinkEnd } = this.props;
    const { isEditingTitle, title } = this.state;
    const imageUploadId = `image-upload-${store.Id}`;

    return (
      <div
        className="node imageNode"
        style={{
          height: store.height,
          width: store.width,
          transform: store.transform,
        }}
        onPointerDown={this.onPointerDown}
      >
        <TopBar store={store} />
        <DismissButton store={store} onDismiss={this.handleDismiss} />
        <LinkButton
          store={store}
          onLinkStart={onLinkStart}
          onLinkEnd={onLinkEnd}
        />

        <BottomBar store={store} />
        <div className="scroll-box">
          <div className="content">
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

            {store.url ? (
              <img
                src={store.url}
                style={{ width: "100%" }}
                onClick={() => document.getElementById(imageUploadId)?.click()}
              />
            ) : (
              <img
                onClick={() => document.getElementById(imageUploadId)?.click()}
                src={store.placeholder}
                alt="Upload new image"
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
          accept="image/*"
          id={imageUploadId}
          onChange={this.handleImageUpload}
        />
      </div>
    );
  }
}
