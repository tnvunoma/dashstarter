import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

// WebNodeStore class
export class WebNodeStore extends NodeStore {

    constructor(initializer: Partial<WebNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    /**
     * node's url link
     */
    @observable
    public url: string | undefined;

    /**
     * displayble node content (url)
     */
    get content(): string {
        return this.url || "[No url provided}";
    }
}