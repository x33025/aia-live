import { SmartStyle } from './smart-style';

export class LinkHandler {
    private smartStyle: SmartStyle;

    constructor(smartStyle: SmartStyle) {
        this.smartStyle = smartStyle;
    }

    attachLink() {
        const url = prompt('Enter the URL:');
        const selection = window.getSelection();

        if (url && selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (this.smartStyle.isSmartStyleEnabled) {
                this.smartStyle.expandSelectionToWordBoundary(range);
            }

            if (range.toString().length === 0) {
                alert('Please select some text to attach the link.');
                return;
            }

            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.textContent = range.toString();

            range.deleteContents();
            range.insertNode(link);

            const newRange = document.createRange();
            newRange.setStartAfter(link);
            newRange.setEndAfter(link);
            selection.removeAllRanges();
            selection.addRange(newRange);
        } else {
            alert('No text selected to attach the link.');
        }
    }

    handlePaste(event: ClipboardEvent) {
        const clipboardData = event.clipboardData?.getData('text');
        const urlPattern = /(https?:\/\/[^\s]+)/g;

        if (clipboardData && urlPattern.test(clipboardData)) {
            event.preventDefault();
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (this.smartStyle.isSmartStyleEnabled) {
                    this.smartStyle.expandSelectionToWordBoundary(range);
                }

                if (range.toString().length > 0) {
                    const link = document.createElement('a');
                    link.href = clipboardData;
                    link.target = '_blank';
                    link.textContent = range.toString();

                    range.deleteContents();
                    range.insertNode(link);

                    const newRange = document.createRange();
                    newRange.setStartAfter(link);
                    newRange.setEndAfter(link);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                } else {
                    document.execCommand('insertText', false, clipboardData);
                }
            }
        }
    }
}
