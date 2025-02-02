import * as React from "react";
import { observer } from "mobx-react";
import { StoreType } from "../../stores/NodeStore";
import { NodeCollectionStore } from "../../stores";
import "./TableView.scss";

interface TableViewProps {
  collections: NodeCollectionStore;
}

@observer
export class TableView extends React.Component<TableViewProps> {
  getNodeTypeLabel(nodeType: StoreType): string {
    switch (nodeType) {
      case StoreType.Text:
        return "Text";
      case StoreType.Video:
        return "Video";
      case StoreType.Image:
        return "Image";
      case StoreType.Website:
        return "Website";
      case StoreType.Collection:
        return "Collection";
      default:
        return "Unknown";
    }
  }

  render() {
    const { collections } = this.props;

    return (
      <div className="table-view-container">
        {/* Render the collection header once */}
        <h2 className="collection-header">My Collection</h2>

        {/* Table Layout for Nodes */}
        <div className="table-layout">
          {/* Table Header */}
          <div className="table-header">Node Type</div>
          <div className="table-header">Title</div>
          <div className="table-header">Content</div>
          <div className="table-header">Linked Nodes</div>

          {/* Table Rows */}
          {collections.nodes.map((node) => (
            <React.Fragment key={node.Id}>
              {/* Node Type */}
              <div className="table-row">
                {node.type !== null
                  ? this.getNodeTypeLabel(node.type)
                  : "[Type not available]"}
              </div>

              {/* Title */}
              <div className="table-row">{node.title}</div>

              {/* Content */}
              <div className="table-row">{node.content}</div>

              {/* Linked Nodes */}
              <div className="table-row">
                {[
                  ...node.outgoingLinks.map((link) => link.node.title),
                  ...node.incomingLinks.map((link) => link.node.title),
                ].length > 0
                  ? [
                      ...node.outgoingLinks.map((link) => link.node.title),
                      ...node.incomingLinks.map((link) => link.node.title),
                    ].join(", ")
                  : "[No linked nodes]"}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
