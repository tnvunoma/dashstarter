import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { StaticTextNodeStore } from "./StaticTextNodeStore";
import { VideoNodeStore } from "./VideoNodeStore";
import { StoreType } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }

  @action
  public addTextNode(x: number, y: number) {
    const newNode = new StaticTextNodeStore({
      type: StoreType.Text,
      x: x,
      y: y,
      title: "New Text Box",
      text: "",
    });
    this.nodes.push(newNode); 
  }

@action
  addVideoNode(x: number, y: number) {
    const newNode = new VideoNodeStore({
      type: StoreType.Video,
      x: x,
      y: y,
      title: "New Video",
      url: "", 
    });
    this.nodes.push(newNode); 
  }
}