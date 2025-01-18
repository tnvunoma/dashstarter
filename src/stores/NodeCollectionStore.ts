import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { StaticTextNodeStore } from "./StaticTextNodeStore";
import { VideoNodeStore } from "./VideoNodeStore";
import { StoreType } from "./NodeStore";


export class NodeCollectionStore extends NodeStore {

    @observable
    public scale: number = 1;

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)" + " scale(" + this.scale + ")";
    }

    @action
    public addToCollection(node: StoreType, x: number, y: number ): void {
        switch (node) {
            case StoreType.Text:
                const textNode = new StaticTextNodeStore({
                    type: StoreType.Text,
                    x: x,
                    y: y,
                    title: "New Text Box",
                    text: "",
                })
                this.nodes.push(textNode);
                break;
            case StoreType.Video:   
                const videoNode = new VideoNodeStore({
                    type: StoreType.Video,
                    x: x,
                    y: y,
                    title: "New Video",
                    url: "", 
                });
                this.nodes.push(videoNode); 
                break;
            default:
                break;            
        }
    }

    @action
    public deleteNodeById(nodeId: string): void {
        const indexToDelete = this.nodes.findIndex(node => node.Id === nodeId);
        if (indexToDelete !== -1) {
            this.nodes.splice(indexToDelete, 1); // Remove the node at the index
        }
    }
}
