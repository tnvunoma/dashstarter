import { computed, observable, action } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website,
    Collection
}

interface ILink {
    node: NodeStore;
}

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public title: string | undefined;

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    @observable
    public width: number = 300;

    @observable
    public height: number = 300;

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }

    @observable
    public isLinking: boolean = false;  // Track if the node is being linked

    @observable
    public outgoingLinks: ILink[] = []; 

    @observable
    public incomingLinks: ILink[] = []; 

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

    public unlinkFrom(node: NodeStore): void {
        this.isLinking = false;
        this.outgoingLinks = this.outgoingLinks.filter(link => link.node !== node);
        node.incomingLinks = node.incomingLinks.filter(link => link.node !== this);
    }

    get content(): string {
        return "[Node content not available]";
    }
}