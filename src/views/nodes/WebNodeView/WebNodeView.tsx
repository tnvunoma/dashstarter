import { observer } from "mobx-react";
import * as React from "react";
import { WebNodeStore, NodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./WebNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
import { LinkButton } from "../LinkButton";

interface WebNodeProps {
  store: WebNodeStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

@observer
export class WebNodeView extends React.Component<WebNodeProps> {
  state = {
    isUrlSubmitted: false,
    isEditingTitle: false,
    title: this.props.store.title,
  };

  inputUrl = React.createRef<HTMLInputElement>();

  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
  };

  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.store.url = event.target.value;
  };

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false; // If error occurs, input is not valid URL
    }
  }

  handleUrlSubmit = () => {
    if (this.isValidUrl(this.props.store.url || "")) {
      this.setState({ isUrlSubmitted: true });
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
    const { isEditingTitle, title, isUrlSubmitted } = this.state;

    return (
      <div
        className="node webNode"
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

            {!isUrlSubmitted ? (
              <div className="url-input">
                <input
                  ref={this.inputUrl}
                  type="text"
                  value={store.url}
                  onChange={this.handleUrlChange}
                  placeholder="Enter URL"
                />
                <button onClick={this.handleUrlSubmit}>Submit</button>
              </div>
            ) : (
              <iframe
                src={store.url}
                width={store.width - 60}
                height={store.height - 150}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
