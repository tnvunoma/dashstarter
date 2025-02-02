import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { StaticTextNodeStore } from "./StaticTextNodeStore";
import { VideoNodeStore } from "./VideoNodeStore";
import { ImageNodeStore } from "./ImageNodeStore";
import { StoreType } from "./NodeStore";
import { WebNodeStore } from "./WebNodeStore";


export class NodeCollectionStore extends NodeStore {

    @observable
    public scale: number = 1;

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    @observable
    public width: number = window.innerWidth;

    @observable
    public height: number = window.innerHeight;

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
            case StoreType.Image:
                const imgNode = new ImageNodeStore( {
                    type: StoreType.Image,
                    x: x,
                    y: y,
                    title: "New Image",
                    url: ""
                })
                this.nodes.push(imgNode)
                break;
            case StoreType.Website:
                const webNode = new WebNodeStore( {
                    type: StoreType.Website,
                    x: x,
                    y: y,
                    title: "New Website",
                    url: ""
                })
                this.nodes.push(webNode)
                break;
            case StoreType.Collection:
                const collection = new NodeCollectionStore();
                collection.x = x;
                collection.y = y;
                collection.width = 500;
                collection.height = 500;
                collection.type = StoreType.Collection
                this.nodes.push(collection);
                break;
            default:
                break;            
        }
    }

    @action
    public deleteNodeById(nodeId: string): void {
        this.nodes = this.nodes.filter(node => node.Id !== nodeId);
    }
}
