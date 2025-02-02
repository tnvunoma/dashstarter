import * as React from "react";
import "./OptionsPanel.scss";
import { Constants } from "../../Constants";

// Props for OptionsPanel class
interface OptionsPanelProps {
  mouseX: number;
  mouseY: number;
  showPanel: boolean;
  onOptionSelect: (type: string) => void;
}

// OptionsPanel class
export class OptionsPanel extends React.Component<OptionsPanelProps> {
  /**
   * Handles options clicked and adds node based on node type
   * @param type - node type
   */
  handleOptionsClick = (type: string) => {
    this.props.onOptionSelect(type);
  };

  render() {
    const { mouseX, mouseY, showPanel } = this.props;
    // shows panel when prompted
    if (!showPanel) {
      return null;
    }

    // Renders all buttons for options
    return (
      <div
        className="options-panel"
        style={{ top: mouseY - Constants.PANEL_SIZE, left: mouseX }}
      >
        <button
          onPointerDown={() => this.handleOptionsClick("text")}
          style={{ cursor: "pointer" }}
        >
          Add Text
        </button>
        <button
          onPointerDown={() => this.handleOptionsClick("video")}
          style={{ cursor: "pointer" }}
        >
          Add Video
        </button>
        <button
          onPointerDown={() => this.handleOptionsClick("image")}
          style={{ cursor: "pointer" }}
        >
          Add Image
        </button>
        <button
          onPointerDown={() => this.handleOptionsClick("website")}
          style={{ cursor: "pointer" }}
        >
          Add Website
        </button>
        <button
          onPointerDown={() => this.handleOptionsClick("collection")}
          style={{ cursor: "pointer" }}
        >
          Add Collection
        </button>
      </div>
    );
  }
}
