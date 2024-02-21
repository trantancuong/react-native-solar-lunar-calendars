import {ComponentDriver, getTextNodes} from 'react-component-driver';
import CalendarFooter from './index';

export class CalendarFooterDriver extends ComponentDriver {
    constructor(testID) {
        super(CalendarFooter);
        this.testID = testID;
    }

    getTitle() {
        return getTextNodes(this.getByID(`${this.testID}.title`)).join('');
    }

    getDayNames() {
        return getTextNodes(this.getByID(`${this.testID}.dayNames`));
    }

    getLoadingIndicator() {
        return this.getByID(`${this.testID}.loader`);
    }

    getLeftArrow() {
        return this.getByID(`${this.testID}.leftArrow`);
    }

    getRightArrow() {
        return this.getByID(`${this.testID}.rightArrow`);
    }

    tapLeftArrow() {
        const node = this.getLeftArrow();
        if (!node) {
            throw new Error('Left arrow not found.');
        }
        node.props.onClick();
        return this;
    }

    tapRightArrow() {
        const node = this.getRightArrow();
        if (!node) {
            throw new Error('Right arrow not found.');
        }
        node.props.onClick();
        return this;
    }
}
