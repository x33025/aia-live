import { writable, type Writable } from 'svelte/store';
import { SmartStyle } from './modules/smart-style';
import { TextFormatter } from './modules/text-formatter';
import { LinkHandler } from './modules/link-handler';

export class Editor {
    public smartStyleState: Writable<boolean>;

    public smartStyle: SmartStyle; // Made public
    public textFormatter: TextFormatter; // Made public
    public linkHandler: LinkHandler; // Made public

    constructor(smartStyleEnabled: boolean = true) {
        this.smartStyle = new SmartStyle(smartStyleEnabled);
        this.textFormatter = new TextFormatter(this.smartStyle);
        this.linkHandler = new LinkHandler(this.smartStyle);

        this.smartStyleState = writable(this.smartStyle.isSmartStyleEnabled);
    }

    get isSmartStyleEnabled(): boolean {
        return this.smartStyle.isSmartStyleEnabled;
    }

    toggleSmartStyle() {
        this.smartStyle.toggleSmartStyle();
        this.smartStyleState.set(this.smartStyle.isSmartStyleEnabled);
    }
}