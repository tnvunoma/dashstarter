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

  componentDidMount() {
    if (this.inputUrl.current) {
      this.inputUrl.current.focus();
    }
  }

  render() {
    let { store, onLinkStart, onLinkEnd } = this.props;
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
            <h3 className="title">{store.title}</h3>

            {!this.state.isUrlSubmitted ? (
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
