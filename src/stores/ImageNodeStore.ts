import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class ImageNodeStore extends NodeStore {

    constructor(initializer: Partial<ImageNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public url: string | undefined;

    public placeholder: string = "/uploadfile.png" ;

    get content(): string {
        return this.url || "[No file uploaded]";
    }
}