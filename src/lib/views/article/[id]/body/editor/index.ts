import { writable, type Writable } from 'svelte/store';
import { SmartStyle } from './smart-style';
import { TextFormatter } from './text-formatter';
import { LinkHandler } from './link-handler';

export class Editor {
    public smartStyleState: Writable<boolean>;

    private smartStyle: SmartStyle;
    private textFormatter: TextFormatter;
    private linkHandler: LinkHandler;

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

    toggleBold() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (this.smartStyle.isSmartStyleEnabled) {
                this.smartStyle.expandSelectionToWordBoundary(range); // Expand selection for smart style
            }
            this.textFormatter.toggleBold();
        }
    }

    toggleItalic() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (this.smartStyle.isSmartStyleEnabled) {
                this.smartStyle.expandSelectionToWordBoundary(range); // Expand selection for smart style
            }
            this.textFormatter.toggleItalic();
        }
    }

    attachLink() {
        this.linkHandler.attachLink();
    }

    handlePaste(event: ClipboardEvent) {
        this.linkHandler.handlePaste(event);
    }
}
