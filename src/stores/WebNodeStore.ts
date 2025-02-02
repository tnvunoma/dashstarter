import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class WebNodeStore extends NodeStore {

    constructor(initializer: Partial<WebNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public url: string | undefined;

    get content(): string {
        return this.url || "[No url provided}";
    }
}