# React Native Solar Lundar Calendars 🗓️ 📆

<br>

This module includes information on how to use this customizable **React Native** calendar component.

The package is compatible with both **Android** and **iOS**

<br>

## Features ✨

- Pure JS. No Native code required
- Date marking - dot, multi-dot, period, multi-period and custom marking
- Customization of style, content (days, months, etc) and dates
- Detailed documentation and examples
- Swipeable calendar with flexible custom rendering
- Scrolling to today, selecting dates, and more
- Allowing or blocking certain dates
- Accessibility support
- Automatic date formatting for different locales
- Lunar day

## Getting Started 🔧

Here's how to get started with react-native-solar-lunar-calendars in your React Native project:

### Install the package:

Using `npm`:

```
$ npm install --save react-native-solar-lunar-calendars
```

Using `Yarn`:

```
$ yarn add react-native-solar-lunar-calendars
```

**RN Calendars is implemented in JavaScript, so no native module linking is required.**

## Usage 🚀

Basic usage examples of the library

### Importing the `Calendar` component

```javascript
import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-solar-lunar-calendars';
```

### Use the `Calendar` component in your app:

```javascript
<Calendar
  onDayPress={day => {
    console.log('selected day', day);
  }}
/>
```

## Some Code Examples

Here are a few code snippets that demonstrate how to use some of the key features of react-native-solar-lunar-calendars:

### Creating a basic calendar with default settings:

```javascript
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-solar-lunar-calendars';

const App = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
  );
};

export default App;
```

### Customize the appearance of the calendar:

```javascript
<Calendar
  // Customize the appearance of the calendar
  style={{
    borderWidth: 1,
    borderColor: 'gray',
    height: 350
  }}
  // Specify the current date
  current={'2012-03-01'}
  // Callback that gets called when the user selects a day
  onDayPress={day => {
    console.log('selected day', day);
  }}
  // Mark specific dates as marked
  markedDates={{
    '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
    '2012-03-02': {marked: true},
    '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
  }}
/>
```

### Configuring the locale:

```javascript
import {LocaleConfig} from 'react-native-solar-lunar-calendars';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-solar-lunar-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const App = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
  );
};

export default App;
```

### Adding a global theme to the calendar:

```javascript
import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-solar-lunar-calendars';

const App = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e
```

## Customized Calendar Examples

### Calendar

  <img src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/calendar.gif?raw=true">

### Dot marking

  <img height={50} src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/marking1.png?raw=true">

### Multi-Dot marking

 <img height=50 src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/marking4.png?raw=true">

### Period Marking

  <img height=50 src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/marking2.png?raw=true">

  <img height=50 src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/marking3.png?raw=true">

### Multi-Period marking

  <img height=50 src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/marking6.png?raw=true">

### Custom marking

  <img height=50 src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/marking5.png?raw=true">

  <img height=350 src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/multi-marking.png?raw=true">

### Date loading indicator

  <img height=50 src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/loader.png?raw=true">

### Scrollable semi-infinite calendar

  <img src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/calendar-list.gif?raw=true">

### Horizontal calendar

  <img src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/horizontal-calendar-list.gif?raw=true">

### Agenda

  <img src="https://github.com/wix-private/wix-react-native-calendar/blob/master/demo/assets/agenda.gif?raw=true">

<br>

## Contributing

We welcome contributions to react-native-solar-lunar-calendars.

If you have an idea for a new feature or have discovered a bug, please open an issue.

Please `npm run test` and `npm run lint` before pushing changes.

Don't forget to add a **title** and a **description** explaining the issue you're trying to solve and your proposed solution.

Screenshots and Gifs are VERY helpful to add to the PR for reviews.

Please DO NOT format the files - we're trying to keep a unified syntax and keep the reviewing process fast and simple.

## License

React Native Solar Lundar Calendars is MIT licensed
