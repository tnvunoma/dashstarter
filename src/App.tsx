import React from "react";
import "./App.scss";
import { NodeCollectionStore } from "./stores";
import { FreeFormCanvas } from "./views/freeformcanvas/FreeFormCanvas";

const mainNodeCollection = new NodeCollectionStore();

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="title">NOTEPAD</h1>
          <div className="toolbar">
            <button className="view-option">Canvas View</button>
            <button className="view-option">Grid View</button>
          </div>
        </div>
        <FreeFormCanvas store={mainNodeCollection} />
      </div>
    );
  }
}

export default App;
