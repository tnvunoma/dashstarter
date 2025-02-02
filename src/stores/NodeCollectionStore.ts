import { observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { StaticTextNodeStore } from "./StaticTextNodeStore";
import { VideoNodeStore } from "./VideoNodeStore";
import { ImageNodeStore } from "./ImageNodeStore";
import { StoreType } from "./NodeStore";
import { WebNodeStore } from "./WebNodeStore";
import { Constants } from "../Constants";

// NodeCollectionStore class
export class NodeCollectionStore extends NodeStore {

    /**
     * Collection title - currently unchangable
     */
    @observable
    public title: string = "Collection";

    /**
     * List of nodes in collection
     */
    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    /**
     * Collection node width
     */
    @observable
    public width: number = window.innerWidth;

    /**
     * Collection node height
     */
    @observable
    public height: number = window.innerHeight;

    /**
     * Add nodes to this collection 
     * @param node - node type
     * @param x - node x position
     * @param y - node y position
     */
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
                collection.width = Constants.COLLECT_WIDTH;
                collection.height = Constants.COLECT_HEIGHT;
                collection.type = StoreType.Collection
                this.nodes.push(collection);
                break;
            default:
                break;            
        }
    }

    /**
     * deletes nodes from this collection by ID
     * @param nodeId - node ID
     */
    @action
    public deleteNodeById(nodeId: string): void {
        this.nodes = this.nodes.filter(node => node.Id !== nodeId);
    }

    /**
     * Compile list of the titles of nodes in this collection to display
     */
    get content(): string {
        if (this.nodes.length === 0) {
            return "[No nodes added]";
        }
        return this.nodes.map(node => node.title).join(", ");
    }
}
