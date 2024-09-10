import { SmartStyle } from './smart-style';

export class TextFormatter {
    private smartStyle: SmartStyle;

    constructor(smartStyle: SmartStyle) {
        this.smartStyle = smartStyle;
    }

    toggleBold() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (this.smartStyle.isSmartStyleEnabled) {
                this.smartStyle.expandSelectionToWordBoundary(range);
            }
            document.execCommand('bold');
        }
    }

    toggleItalic() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (this.smartStyle.isSmartStyleEnabled) {
                this.smartStyle.expandSelectionToWordBoundary(range);
            }
            document.execCommand('italic');
        }
    }
}
