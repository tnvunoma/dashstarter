import { observer } from "mobx-react";
import * as React from "react";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import "./CollectionNodeView.scss";
import { NodeCollectionStore, NodeStore } from "../../../stores";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
import { FreeFormCanvas } from "../../freeformcanvas/FreeFormCanvas";
import { LinkButton } from "../LinkButton";

interface CollectionNodeProp {
  store: NodeCollectionStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

@observer
export class CollectionNodeView extends React.Component<CollectionNodeProp> {
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  render() {
    let { store, onLinkStart, onLinkEnd } = this.props;
    return (
      <div
        className="node collectionNode"
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
        
        <FreeFormCanvas store={store}></FreeFormCanvas>
        <DismissButton store={store} onDismiss={this.handleDismiss} />
        <BottomBar store={store} />
      </div>
    );
  }
}
