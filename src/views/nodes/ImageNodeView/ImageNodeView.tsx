import { observer } from "mobx-react";
import * as React from "react";
import { ImageNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./ImageNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";

interface ImageNodeProps {
  store: ImageNodeStore;
  onDismiss: (nodeId: string) => void;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {
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

  render() {
    let store = this.props.store;
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
        <BottomBar store={store} />
        <div className="scroll-box">
          <div className="content">
            <h3 className="title">{store.title}</h3>

            {this.props.store.url ? (
              <img src={this.props.store.url} style={{ width: "100%" }} />
            ) : (
              <div
                className="image-placeholder"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <img
                  src={this.props.store.placeholder}
                  alt="Upload new image"
                  style={{
                    width: "100%",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          style={{ display: "none" }}
          onChange={this.handleImageUpload}
        />
      </div>
    );
  }
}
