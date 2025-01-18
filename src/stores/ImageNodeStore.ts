import { observable } from "mobx";
import { NodeStore } from "./NodeStore";
import { VideoNodeStore } from "./VideoNodeStore";

export class ImageNodeStore extends NodeStore {

    constructor(initializer: Partial<ImageNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string | undefined;

    @observable
    public url: string | undefined;
}