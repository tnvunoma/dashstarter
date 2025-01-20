import { computed, observable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Video,
    Image,
    Website,
    Collection
}

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public placeholder: string = "public/uploadfile.png";

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
}