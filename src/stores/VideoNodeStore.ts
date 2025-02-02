import { ImageNodeStore } from "./ImageNodeStore";

// VideoNodeStore class
export class VideoNodeStore extends ImageNodeStore {

    constructor(initializer: Partial<VideoNodeStore>) {
        super(initializer);
    }

}