import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

// StaticTextNodeStore class (not actually static, can be editted)
export class StaticTextNodeStore extends NodeStore {

    constructor(initializer: Partial<StaticTextNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    /**
     * node's text content
     */
    @observable
    public text: string | undefined;

    /**
     * node's displayable content (text)
     */
    get content(): string {
        return this.text || "[Text is empty]";
    }
}