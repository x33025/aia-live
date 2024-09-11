import { SmartStyle } from './smart-style';
import { toggleBold } from './format/bold';
import { toggleItalic } from './format/italic';

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
}