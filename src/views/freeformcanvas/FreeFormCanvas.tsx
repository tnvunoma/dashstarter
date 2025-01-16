import { observer } from "mobx-react";
import * as React from "react";
import {
  NodeCollectionStore,
  StaticTextNodeStore,
  StoreType,
  VideoNodeStore,
} from "../../stores";
import { TextNodeView, VideoNodeView } from "../nodes";
import "./FreeFormCanvas.scss";
import { OptionsPanel } from "../components/OptionsPanel";

interface FreeFormProps {
  store: NodeCollectionStore;
}

@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
  private isPointerDown: boolean | undefined;
  state = { showPanel: false, isPanelVisible: false, mouseX: 0, mouseY: 0 };

  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.isPointerDown = true;
    document.removeEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);
    document.addEventListener("pointerup", this.onPointerUp);

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    this.handleCanvasClick(mouseX, mouseY);
  };

  onPointerUp = (e: PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    this.isPointerDown = false;
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);
  };

  onPointerMove = (e: PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.isPointerDown) return;

    this.props.store.x = this.props.store.x + e.movementX;
    this.props.store.y = this.props.store.y + e.movementY;
    this.setState({ showPanel: false, isPanelVisible: false });
  };

  handleCanvasClick = (x: number, y: number) => {
    const { isPanelVisible } = this.state;
    if (isPanelVisible) {
      this.setState({ showPanel: false, isPanelVisible: false });
    } else {
      this.setState({
        showPanel: true,
        isPanelVisible: true,
        mouseX: x,
        mouseY: y,
      });
    }
  };

  handleOptionSelect = (type: "text" | "video") => {
    const x = this.state.mouseX - this.props.store.x;
    const y = this.state.mouseY - this.props.store.y;
    if (type == "text") {
      this.props.store.addTextNode(x, y);
    } else if (type == "video") {
      this.props.store.addVideoNode(x, y);
    }
  };

  render() {
    let store = this.props.store;
    return (
      <div
        className="freeformcanvas-container"
        onPointerDown={this.onPointerDown}
      >
        <div className="freeformcanvas" style={{ transform: store.transform }}>
          {
            // maps each item in the store to be rendered in the canvas based on the node type
            store.nodes.map((nodeStore) => {
              switch (nodeStore.type) {
                case StoreType.Text:
                  return (
                    <TextNodeView
                      key={nodeStore.Id}
                      store={nodeStore as StaticTextNodeStore}
                    />
                  );

                case StoreType.Video:
                  return (
                    <VideoNodeView
                      key={nodeStore.Id}
                      store={nodeStore as VideoNodeStore}
                    />
                  );

                default:
                  return null;
              }
            })
          }
        </div>

        <OptionsPanel
          mouseX={this.state.mouseX}
          mouseY={this.state.mouseY}
          showPanel={this.state.showPanel}
          onOptionSelect={this.handleOptionSelect}
        />
      </div>
    );
  }
}
