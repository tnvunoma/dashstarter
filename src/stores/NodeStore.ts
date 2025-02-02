import { computed, observable, action } from "mobx";
import { Utils } from "../Utils";
import { Constants } from "../Constants";

// node types
export enum StoreType {
    Text, 
    Video,
    Image,
    Website,
    Collection
}

// links interface
interface ILink {
    node: NodeStore;
}

// NodeStore class
export class NodeStore {

    /**
     * Unique Node ID
     */
    public Id: string = Utils.GenerateGuid();

    /**
     * Node type
     */
    public type: StoreType | null = null;

    /**
     * Node title
     */
    @observable
    public title: string | undefined;

    /**
     * Node x position
     */
    @observable
    public x: number = 0;

    /**
     * Node y position
     */
    @observable
    public y: number = 0;

    /**
     * Node width. Default = 300px
     */
    @observable
    public width: number = Constants.NODE_WIDTH;

    /**
     * Node height. Default = 300px
     */
    @observable
    public height: number = Constants.NODE_HEIGHT;

    /**
     * transform method for node translation
     */
    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }

    /**
     * Track if node is being linked to another
     */
    @observable
    public isLinking: boolean = false; 

    /**
     * All outgoing node links
     */
    @observable
    public outgoingLinks: ILink[] = []; 

    /**
     * All in incoming node links
     */
    @observable
    public incomingLinks: ILink[] = []; 

    /**
     * Links two nodes bidirectionally 
     * @param node 
     */
    public linkTo(node: NodeStore): void {
    const outgoingNodeSet = new Set(this.outgoingLinks.map(link => link.node));
    if (!outgoingNodeSet.has(node)) {
        const outgoingLink: ILink = { node: node };
        this.outgoingLinks.push(outgoingLink);
        }
    const incomingNodeSet = new Set(node.incomingLinks.map(link => link.node));
    if (!incomingNodeSet.has(this)) {
        const incomingLink: ILink = { node: this };
        node.incomingLinks.push(incomingLink);
        }
    }

    /**
     * unlinks nodes
     * @param node 
     */
    public unlinkFrom(node: NodeStore): void {
        this.isLinking = false;
        this.outgoingLinks = this.outgoingLinks.filter(link => link.node !== node);
        node.incomingLinks = node.incomingLinks.filter(link => link.node !== this);
    }

    /**
     * displayed content of node
     */
    get content(): string {
        return "[Node content not available]";
    }
}