export class SmartStyle {
    private smartStyleEnabled: boolean;

    constructor(smartStyleEnabled: boolean = true) {
        this.smartStyleEnabled = smartStyleEnabled;
    }

    get isSmartStyleEnabled(): boolean {
        return this.smartStyleEnabled;
    }

    toggleSmartStyle() {
        this.smartStyleEnabled = !this.smartStyleEnabled;
    }

    // Expand the current text selection to the word boundaries when smart style is enabled
    expandSelectionToWordBoundary(range: Range) {
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;

        const expandBoundary = (container: Node, offset: number, isStart: boolean) => {
            const text = container.textContent || '';
            let newOffset = offset;

            if (isStart) {
                // Move backward to the start of the word
                while (newOffset > 0 && /\w/.test(text[newOffset - 1])) {
                    newOffset--;
                }
            } else {
                // Move forward to the end of the word
                while (newOffset < text.length && /\w/.test(text[newOffset])) {
                    newOffset++;
                }
            }
            return newOffset;
        };

        // Expand the range to word boundaries
        const newStartOffset = expandBoundary(startContainer, range.startOffset, true);
        range.setStart(startContainer, newStartOffset);

        const newEndOffset = expandBoundary(endContainer, range.endOffset, false);
        range.setEnd(endContainer, newEndOffset);
    }
}
