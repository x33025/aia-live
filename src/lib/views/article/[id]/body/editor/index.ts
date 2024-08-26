import { SmartStyle } from './smart-style';
import { TextFormatter } from './text-formatter';
import { LinkHandler } from './link-handler';

export class Editor {
    private smartStyle: SmartStyle;
    private textFormatter: TextFormatter;
    private linkHandler: LinkHandler;

    constructor(smartStyleEnabled: boolean = true) {
        this.smartStyle = new SmartStyle(smartStyleEnabled);
        this.textFormatter = new TextFormatter(this.smartStyle);
        this.linkHandler = new LinkHandler(this.smartStyle);
    }

    get isSmartStyleEnabled(): boolean {
        return this.smartStyle.isSmartStyleEnabled;
    }

    toggleSmartStyle() {
        this.smartStyle.toggleSmartStyle();
    }

    toggleBold() {
        this.textFormatter.toggleBold();
    }

    toggleItalic() {
        this.textFormatter.toggleItalic();
    }

    attachLink() {
        this.linkHandler.attachLink();
    }

    handlePaste(event: ClipboardEvent) {
        this.linkHandler.handlePaste(event);
    }
}
