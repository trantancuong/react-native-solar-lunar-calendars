import XDate from 'xdate';
import React, {forwardRef, ReactNode, useCallback, useImperativeHandle, useMemo, useRef} from 'react';
import {AccessibilityActionEvent, Image, Insets, StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import styleConstructor from './style';
import {Direction, Theme} from '../../types';

export interface CalendarFooterProps {
    month?: XDate;
    addMonth?: (num: number) => void;
    /** Specify theme properties to override specific styles for calendar parts */
    theme?: Theme;
    /** If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday */
    firstDay?: number;
    /** Display loading indicator. Default = false */
    displayLoadingIndicator?: boolean;
    /** Show week numbers. Default = false */
    showWeekNumbers?: boolean;
    /** Month format in the title. Formatting values: http://arshaw.com/xdate/#Formatting */
    hideDayNames?: boolean;
    /** Hide month navigation arrows */
    hideArrows?: boolean;
    /** Replace default arrows with custom ones (direction can be 'left' or 'right') */
    renderArrow?: (direction: Direction) => ReactNode;
    /** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
    onPressArrowLeft?: (method: () => void, month?: XDate) => void; //TODO: replace with string
    /** Handler which gets executed when press arrow icon right. It receive a callback can go next month */
    onPressArrowRight?: (method: () => void, month?: XDate) => void; //TODO: replace with string
    /** Left & Right arrows. Additional distance outside of the buttons in which a press is detected, default: 20 */
    arrowsHitSlop?: Insets | number;
    /** Disable left arrow */
    disableArrowLeft?: boolean;
    /** Disable right arrow */
    disableArrowRight?: boolean;
    /** Apply custom disable color to selected day indexes */
    disabledDaysIndexes?: number[];
    /** Provide aria-level for calendar heading for proper accessibility when used with web (react-native-web) */
    webAriaLevel?: number;
    testID?: string;
    style?: StyleProp<ViewStyle>;
    accessibilityElementsHidden?: boolean;
    importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
    numberOfDays?: number;
    /** The current date presented */
    current?: string;
    timelineLeftInset?: number;
    renderCurrent?: () => ReactNode;
}

const accessibilityActions = [
    {name: 'increment', label: 'increment'},
    {name: 'decrement', label: 'decrement'}
];

const CalendarFooter = forwardRef((props: CalendarFooterProps, ref) => {
    const {
        theme,
        style: propsStyle,
        addMonth: propsAddMonth,
        month,
        hideArrows,
        renderArrow,
        onPressArrowLeft,
        onPressArrowRight,
        arrowsHitSlop = 20,
        disableArrowLeft,
        disableArrowRight,
        testID,
        accessibilityElementsHidden,
        importantForAccessibility,
    } = props;
    const style = useRef(styleConstructor(theme));
    const hitSlop: Insets | undefined = useMemo(
        () =>
            typeof arrowsHitSlop === 'number'
                ? {top: arrowsHitSlop, left: arrowsHitSlop, bottom: arrowsHitSlop, right: arrowsHitSlop}
                : arrowsHitSlop,
        [arrowsHitSlop]
    );

    useImperativeHandle(ref, () => ({
        onPressLeft,
        onPressRight
    }));

    const addMonth = useCallback(() => {
        propsAddMonth?.(1);
    }, [propsAddMonth]);

    const currentMonth = useCallback((x) => {
        propsAddMonth?.(x);
    }, [propsAddMonth]);

    const onPressCurrent = useCallback(() => {
        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months;
        }

        return currentMonth(monthDiff(new Date(month), new Date()));
    }, [onPressArrowRight, currentMonth, month]);

    const subtractMonth = useCallback(() => {
        propsAddMonth?.(-1);
    }, [propsAddMonth]);

    const onPressLeft = useCallback(() => {
        if (typeof onPressArrowLeft === 'function') {
            return onPressArrowLeft(subtractMonth, month);
        }
        return subtractMonth();
    }, [onPressArrowLeft, subtractMonth, month]);

    const onPressRight = useCallback(() => {
        if (typeof onPressArrowRight === 'function') {
            return onPressArrowRight(addMonth, month);
        }
        return addMonth();
    }, [onPressArrowRight, addMonth, month]);

    const onAccessibilityAction = useCallback((event: AccessibilityActionEvent) => {
        switch (event.nativeEvent.actionName) {
            case 'decrement':
                onPressLeft();
                break;
            case 'increment':
                onPressRight();
                break;
            default:
                break;
        }
    }, [onPressLeft, onPressRight]);

    const _renderArrow = (direction: Direction) => {
        if (hideArrows) {
            return <View/>;
        }

        const isLeft = direction === 'left';
        const arrowId = isLeft ? 'leftArrow' : 'rightArrow';
        const shouldDisable = isLeft ? disableArrowLeft : disableArrowRight;
        const onPress = !shouldDisable ? isLeft ? onPressLeft : onPressRight : undefined;
        const imageSource = isLeft ? require('../img/previous.png') : require('../img/next.png');
        const renderArrowDirection = isLeft ? 'left' : 'right';

        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={shouldDisable}
                style={style.current.arrow}
                hitSlop={hitSlop}
                testID={`${testID}.${arrowId}`}
            >
                {renderArrow ? (
                    renderArrow(renderArrowDirection)
                ) : (
                    <Image source={imageSource}
                           style={shouldDisable ? style.current.disabledArrowImage : style.current.arrowImage}/>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View
            testID={testID}
            style={propsStyle}
            accessible
            accessibilityRole={'adjustable'}
            accessibilityActions={accessibilityActions}
            onAccessibilityAction={onAccessibilityAction}
            accessibilityElementsHidden={accessibilityElementsHidden}
            importantForAccessibility={importantForAccessibility}
        >
            <View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View>
                        {props.renderCurrent && (
                            <TouchableOpacity onPress={onPressCurrent}>
                                {props.renderCurrent()}
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{flex: 1}}/>
                    <View style={{marginRight: 10}}>
                        {_renderArrow('left')}
                    </View>
                    <View style={{marginLeft: 10}}>
                        {_renderArrow('right')}
                    </View>
                </View>
            </View>
        </View>
    );
});

export default CalendarFooter;
CalendarFooter.displayName = 'CalendarFooter';
CalendarFooter.defaultProps = {
    webAriaLevel: 1,
    arrowsHitSlop: 20
};
