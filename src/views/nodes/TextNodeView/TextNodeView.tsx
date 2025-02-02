import { observer } from "mobx-react";
import * as React from "react";
import { StaticTextNodeStore, NodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import "./../NodeView.scss";
import "./TextNodeView.scss";
import { BottomBar } from "../BottomBar";
import { DismissButton } from "../DismissButton";
//@ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
//@ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LinkButton } from "../LinkButton";

// props for TextNodeView class
interface TextNodeProps {
  store: StaticTextNodeStore;
  onDismiss: (nodeId: string) => void;
  onLinkStart: (nodeStore: NodeStore) => void;
  onLinkEnd: (nodeStore: NodeStore) => void;
}

// TextNodeView class
@observer
export class TextNodeView extends React.Component<TextNodeProps> {
  state = {
    isEditingTitle: false,
    title: this.props.store.title,
  };

  /**
   * Handles mouse events for node
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
    let { store, onLinkStart, onLinkEnd } = this.props;
    const { isEditingTitle, title } = this.state;

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

            {/* Node text editor */}
            <CKEditor
              editor={ClassicEditor}
              data={store.text} // Set the initial data
              onChange={(event, editor) => {
                store.text = editor.getData(); // Update the store's text property
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
