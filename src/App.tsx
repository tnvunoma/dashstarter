import React from "react";
import "./App.scss";
import { NodeCollectionStore } from "./stores";
import { FreeFormCanvas } from "./views/freeformcanvas/FreeFormCanvas";

const mainNodeCollection = new NodeCollectionStore();

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <FreeFormCanvas store={mainNodeCollection} />
      </div>
    );
  }
}

export default App;
