import { observer } from "mobx-react";
import * as React from "react";
import { StaticTextNodeStore, NodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LinkButton } from "../LinkButton";

interface TextNodeProps {
  store: StaticTextNodeStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
  };

  handleDismiss = (nodeId: string) => {
    this.props.onDismiss(nodeId);
  };

  render() {
    let { store, onLinkStart, onLinkEnd } = this.props;
    return (
      <div
        className="node textNode"
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
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                store.text = editor.getData;
              }}
              config={{
                toolbar: [
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "undo",
                  "redo",
                ],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
