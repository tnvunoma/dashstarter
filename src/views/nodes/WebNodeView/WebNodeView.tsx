import { observer } from "mobx-react";
import * as React from "react";
import { WebNodeStore, NodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./WebNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
import { LinkButton } from "../LinkButton";
import { Constants } from "../../../Constants";

// props for WebNodeView class
interface WebNodeProps {
  store: WebNodeStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

// WebNodeView class
@observer
export class WebNodeView extends React.Component<WebNodeProps> {
  state = {
    isUrlSubmitted: false,
    isEditingTitle: false,
    title: this.props.store.title,
  };

  inputUrl = React.createRef<HTMLInputElement>();

  /**
   * Listener for node mouse events
   * @param e - pointer event
   */
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
  };

  /**
   * Dismissed node by ID
   * @param nodeId - node ID
   */
  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  /**
   * Handles change in url
   * @param event - input element
   */
  handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.store.url = event.target.value;
  };

  /**
   * Checks if url is a valid link to a website
   * @param url - input url
   * @returns boolean value
   */
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false; // If error occurs, input is not valid URL
    }
  }

  /**
   * If url is valid, prompt the website to be render
   */
  handleUrlSubmit = () => {
    if (this.isValidUrl(this.props.store.url || "")) {
      this.setState({ isUrlSubmitted: true });
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

            {/* handling url links to display website*/}
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
                width={store.width - Constants.LINK_X_OFFSET}
                height={store.height - Constants.LINK_Y_OFFSET}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
