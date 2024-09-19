import { SmartStyle } from './smart-style';
import { toggleBold } from './format/bold';
import { toggleItalic } from './format/italic';
import { toggleH1, toggleH2, toggleH3, toggleH4 } from './format/H';

export class TextFormatter {
    private smartStyle: SmartStyle;

    constructor(smartStyle: SmartStyle) {
        this.smartStyle = smartStyle;
    }

    toggleBold() {
        toggleBold(this.smartStyle);
    }

    toggleItalic() {
        toggleItalic(this.smartStyle);
    }

    toggleH1() {
        toggleH1(this.smartStyle);
    }

    toggleH2() {
        toggleH2(this.smartStyle);
    }

    toggleH3() {
        toggleH3(this.smartStyle);
    }

    toggleH4() {
        toggleH4(this.smartStyle);
    }

    cycleHeading() {
        console.log('cycleHeading called'); // Debugging statement
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const parentElement = range.commonAncestorContainer.parentElement;
            console.log('Parent element:', parentElement); // Debugging statement
            if (parentElement) {
                switch (parentElement.tagName) {
                    case 'H1':
                        console.log('Switching to H2'); // Debugging statement
                        this.toggleH2();
                        break;
                    case 'H2':
                        console.log('Switching to H3'); // Debugging statement
                        this.toggleH3();
                        break;
                    case 'H3':
                        console.log('Switching to H4'); // Debugging statement
                        this.toggleH4();
                        break;
                    case 'H4':
                        console.log('Switching to P'); // Debugging statement
                        document.execCommand('formatBlock', false, 'P');
                        break;
                    default:
                        console.log('Switching to H1'); // Debugging statement
                        this.toggleH1();
                        break;
                }
            }
        } else {
            console.log('No selection or empty range'); // Debugging statement
        }
    }
}