import * as React from "react";
import "./OptionsPanel.scss";

interface OptionsPanelProps {
  mouseX: number;
  mouseY: number;
  showPanel: boolean;
  onOptionSelect: (type: string) => void;
}

export class OptionsPanel extends React.Component<OptionsPanelProps> {
  onPointerDown = (e: React.PointerEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleOptionsClick = (type: string) => {
    this.props.onOptionSelect(type);
  };

  render() {
    const { mouseX, mouseY, showPanel } = this.props;
    if (!showPanel) {
      return null;
    }
    return (
      <div className="options-panel" style={{ top: mouseY - 35, left: mouseX }}>
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
      </div>
    );
  }
}
