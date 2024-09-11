import { SmartStyle } from '../smart-style';

export function toggleItalic(smartStyle: SmartStyle) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (smartStyle.isSmartStyleEnabled) {
            smartStyle.expandSelectionToWordBoundary(range);
        }
        document.execCommand('italic');
    }
}