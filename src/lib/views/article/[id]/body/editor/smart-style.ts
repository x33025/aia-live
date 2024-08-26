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

    expandSelectionToWordBoundary(range: Range) {
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;

        const expandBoundary = (container: Node, offset: number, isStart: boolean) => {
            const text = container.textContent || '';
            let newOffset = offset;

            if (isStart) {
                while (newOffset > 0 && /\w/.test(text[newOffset - 1])) {
                    newOffset--;
                }
            } else {
                while (newOffset < text.length && /\w/.test(text[newOffset])) {
                    newOffset++;
                }
            }
            return newOffset;
        };

        const newStartOffset = expandBoundary(startContainer, range.startOffset, true);
        range.setStart(startContainer, newStartOffset);

        const newEndOffset = expandBoundary(endContainer, range.endOffset, false);
        range.setEnd(endContainer, newEndOffset);
    }
}
