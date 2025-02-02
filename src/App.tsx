import React from "react";
import "./App.scss";
import { NodeCollectionStore } from "./stores";
import { FreeFormCanvas } from "./views/freeformcanvas/FreeFormCanvas";
import { TableView } from "./views/tableview/TableView";

const mainNodeCollection = new NodeCollectionStore();

export class App extends React.Component {
  state = { isCanvas: true };

  handleOptionsClick = (type: string) => {
    if (type == "canvas") {
      this.setState({ isCanvas: true });
    } else if (type == "table") {
      this.setState({ isCanvas: false });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="title">NOTEPAD</h1>
          <div className="toolbar">
            <button
              className="view-option"
              onPointerDown={() => this.handleOptionsClick("canvas")}
            >
              Canvas View
            </button>
            <button
              className="view-option"
              onPointerDown={() => this.handleOptionsClick("table")}
            >
              Table View
            </button>
          </div>
        </div>

        {this.state.isCanvas ? (
          <FreeFormCanvas store={mainNodeCollection} />
        ) : (
          <TableView collections={mainNodeCollection} />
        )}
      </div>
    );
  }
}

export default App;
