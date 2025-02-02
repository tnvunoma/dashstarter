import { observer } from "mobx-react";
import * as React from "react";
import {
  NodeStore,
  NodeCollectionStore,
  StaticTextNodeStore,
  StoreType,
  VideoNodeStore,
  ImageNodeStore,
  WebNodeStore,
} from "../../stores";
import { TextNodeView, VideoNodeView } from "../nodes";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { WebNodeView } from "../nodes/WebNodeView";
import { CollectionNodeView } from "../nodes/CollectionNodeView";
import { OptionsPanel } from "../components/OptionsPanel";
import "./FreeFormCanvas.scss";

interface FreeFormProps {
  store: NodeCollectionStore;
}

@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {
  private isPointerDown: boolean | undefined;
  state = {
    showPanel: false,
    isPanelVisible: false,
    mouseX: 0,
    mouseY: 0,
  };

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

    this.props.store.nodes.forEach((node) => {
      node.x += e.movementX;
      node.y += e.movementY;
    });

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

  handleOptionSelect = (type: string) => {
    const x = this.state.mouseX;
    const y = this.state.mouseY;
    switch (type) {
      case "text":
        this.props.store.addToCollection(StoreType.Text, x, y);
        break;
      case "video":
        this.props.store.addToCollection(StoreType.Video, x, y);
        break;
      case "image":
        this.props.store.addToCollection(StoreType.Image, x, y);
        break;
      case "website":
        this.props.store.addToCollection(StoreType.Website, x, y);
        break;
      case "collection":
        this.props.store.addToCollection(StoreType.Collection, x, y);
        break;
      default:
        break;
    }
  };

  handleDismissButton = (nodeId: string) => {
    this.props.store.deleteNodeById(nodeId);
  };

  private linkingNode: NodeStore | null = null;

  handleLinkStart = (nodeStore: NodeStore) => {
    if (!this.linkingNode) {
      this.linkingNode = nodeStore; // Set the node being linked from
      this.linkingNode.isLinking = true;
      console.log(this.linkingNode.isLinking);
    } else {
      this.linkingNode = null;
    }
  };

  handleLinkEnd = (nodeStore: NodeStore) => {
    console.log("end");
    if (this.linkingNode) {
      this.linkingNode.isLinking = false;
      if (nodeStore !== this.linkingNode) {
        this.linkingNode.linkTo(nodeStore);
        nodeStore.isLinking = false;
      }
    }
  };

  render() {
    let store = this.props.store;
    return (
      <div
        className="freeformcanvas-container"
        onPointerDown={this.onPointerDown}
      >
        <div
          className="freeformcanvas"
          style={{ width: store.width, height: store.height }}
        >
          <svg className="links-overlay">
            {store.nodes.map((nodeStore) => {
              return nodeStore.outgoingLinks.map((link, index) => {
                const startX = nodeStore.x + nodeStore.width / 2;
                const startY = nodeStore.y + nodeStore.height / 2;
                const endX = link.node.x + link.node.width / 2;
                const endY = link.node.y + link.node.height / 2;

                return (
                  <line
                    key={`${nodeStore.Id}-${link.node.Id}-${index}`}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              });
            })}
          </svg>

          {store.nodes.map((nodeStore) => {
            switch (nodeStore.type) {
              case StoreType.Text:
                return (
                  <TextNodeView
                    key={nodeStore.Id}
                    store={nodeStore as StaticTextNodeStore}
                    onDismiss={this.handleDismissButton}
                    onLinkStart={this.handleLinkStart}
                    onLinkEnd={this.handleLinkEnd}
                  />
                );

              case StoreType.Video:
                return (
                  <VideoNodeView
                    key={nodeStore.Id}
                    store={nodeStore as VideoNodeStore}
                    onDismiss={this.handleDismissButton}
                    onLinkStart={this.handleLinkStart}
                    onLinkEnd={this.handleLinkEnd}
                  />
                );

              case StoreType.Image:
                return (
                  <ImageNodeView
                    key={nodeStore.Id}
                    store={nodeStore as ImageNodeStore}
                    onDismiss={this.handleDismissButton}
                    onLinkStart={this.handleLinkStart}
                    onLinkEnd={this.handleLinkEnd}
                  />
                );

              case StoreType.Website:
                return (
                  <WebNodeView
                    key={nodeStore.Id}
                    store={nodeStore as WebNodeStore}
                    onDismiss={this.handleDismissButton}
                    onLinkStart={this.handleLinkStart}
                    onLinkEnd={this.handleLinkEnd}
                  />
                );

              case StoreType.Collection:
                return (
                  <CollectionNodeView
                    key={nodeStore.Id}
                    store={nodeStore as NodeCollectionStore}
                    onDismiss={this.handleDismissButton}
                    onLinkStart={this.handleLinkStart}
                    onLinkEnd={this.handleLinkEnd}
                  />
                );

              default:
                return null;
            }
          })}
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
