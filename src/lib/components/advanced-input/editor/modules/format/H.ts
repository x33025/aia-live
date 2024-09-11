import { SmartStyle } from '../smart-style';

function toggleHeading(smartStyle: SmartStyle, heading: string) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (smartStyle.isSmartStyleEnabled) {
            smartStyle.expandSelectionToWordBoundary(range);
        }
        document.execCommand('formatBlock', false, heading);
    }
}

export function toggleH1(smartStyle: SmartStyle) {
    toggleHeading(smartStyle, 'H1');
}

export function toggleH2(smartStyle: SmartStyle) {
    toggleHeading(smartStyle, 'H2');
}

export function toggleH3(smartStyle: SmartStyle) {
    toggleHeading(smartStyle, 'H3');
}

export function toggleH4(smartStyle: SmartStyle) {
    toggleHeading(smartStyle, 'H4');
}