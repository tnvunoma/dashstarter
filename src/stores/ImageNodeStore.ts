import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

// ImageNodeStore class
export class ImageNodeStore extends NodeStore {

    constructor(initializer: Partial<ImageNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    /**
     * node's image url
     */
    @observable
    public url: string | undefined;

    /**
     * placeholder node image
     */
    public placeholder: string = "/uploadfile.png" ;

    /**
     * node's displayble content (url)
     */
    get content(): string {
        return this.url || "[No file uploaded]";
    }
}