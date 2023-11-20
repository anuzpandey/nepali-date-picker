# Nepali Date Picker

[![NPM Version][npm-image]][npm-url]
[![Download Count][download-count]][npm-url]

[npm-url]: https://npmjs.org/package/@anuz-pandey/nepali-date-picker

[npm-image]: https://img.shields.io/npm/v/@anuz-pandey/nepali-date-picker.svg?style=flat-square

[download-count]: https://img.shields.io/npm/dt/@anuz-pandey/nepali-date-picker.svg?style=flat-square


Lightweight, Powerful JavaScript Nepali Date Picker with no dependencies.

![branding-image.png](public%2Fimg%2Fbranding-image.png)

## INSTALLATION

### 1. Install via NPM

```bash
npm install @anuz-pandey/nepali-date-picker
# Or Yarn
yarn add @anuz-pandey/nepali-date-picker
# Or Pnpm
pnpm add @anuz-pandey/nepali-date-picker
# Or Bun
bun add @anuz-pandey/nepali-date-picker
```

### 2. Installation for Non-Module Environments

- 2.1. Download the latest release
  [Download](https://github.com/anuzpandey/nepali-date-picker/releases/latest) and extract the zip file and copy the files from `dist` folder to your project.

- 2.2. Use a standalone build
    ```html
    <!-- Add to the end of body section -->
    <script src="dist/nepali-date-picker.bundle.js"></script>
    ```

##### OR

### 3. Use separate files (JS and CSS)

```html
<!-- Add to the head section -->
<link rel="stylesheet" href="dist/nepali-date-picker.min.css">

<!-- Add to the end of body section -->
<script src="dist/nepali-date-picker.min.js"></script>
```

### 4. CDN

```html

<script src="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.bundle.min.js"></script>

<!-- OR -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.min.css">
<script src="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.min.js"></script>
```

---

### USAGE

If you’re using a bundler, e.g. webpack, you’ll need to import NepaliDatePicker and the CSS file.

```javascript
// esp. modules are recommended, if available, especially for typescript
import NepaliDatePicker from '@anuz-pandey/nepali-date-picker'

// CommonJS
const NepaliDatePicker = require('@anuz-pandey/nepali-date-picker')
````

All the following are valid ways to create flatpickr instance.

```javascript
// Initialize Nepali Date Picker
new NepaliDatePicker('.date-picker')
// --- OR ---
new NepaliDatePicker('#date-of-birth')
// --- OR ---
new NepaliDatePicker('selector', config) // See Config Options below
```

---

#### Config Options

```javascript
let config = {
    format: 'YYYY-MM-DD',           // 'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'DD.MM.YYYY'  
    disableAfterToday: false,       // boolean: true | false
    disableBeforeToday: false,      // boolean: true | false
    disableToday: false,            // boolean: true | false
    closeOnDateSelect: true,        // boolean: true | false
    markHolidays: true,             // boolean: true | false
    holidays: ['Saturday'],         // ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    indicateCurrentDate: true,      // boolean: true | false
    setCurrentDate: false,          // boolean: true | false
    position: 'left',               // 'left', 'right' or 'center'
    daysFormat: 'dd',               // 'ddd' for full day name, 'dd' for short day name, 'd' for 1 letter day name
    locale: 'np',                   // 'np' for nepali, 'en' for english
    theme: 'flat',                  // bordered | soft | flat
    darkMode: false,                // boolean: true | false
    inline: false,                  // boolean: true | false
}
````

#### English Date to Nepali Date Conversion

```javascript
// To Convert English Date to Nepali Date
let NepaliDatePicker = new NepaliDatePicker();
NepaliDatePicker.convertToNepaliDate(1996, 4, 22)
// Result: {year: 2053, month: 1, day: 10}
```

#### Features

| Feature                                                 | Status       |
|---------------------------------------------------------|--------------|
| Proper UI for Date Picker                               | ✅ Done       |
| Convert English Date to Nepali Date                     | ✅ Done       |
| Convert Nepali Date to English Date                     | ⬜ Not Done   |
| Add Date Picker to Multiple Input Fields                | ✅ Done       |
| Remove jQuery Dependency                                | ✅ Done       |
| Support Time Select                                     | ⬜ Not Done   |
| Calculate Age on Date                                   | ⬜ Not Done   |
| Inline Calendar                                         | ✅ Done       |
| Add Configurations to Date Picker                       | ⬜ Not Done   |
| Close/Hide Date Picker on Date Select                   | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| Disable on Today's Date                                 | ✅ Done       |
| Disable on Before Today's Date                          | ✅ Done       |
| Disable on Before After Today's Date                    | ✅ Done       |
| Disable on Specific Dates                               | ⬜ Not Done   |
| Disable on Specific Days                                | ⬜ Not Done   |
| Disable on Specific Months                              | ⬜ Not Done   |
| Disable on Specific Years                               | ⬜ Not Done   |
| ------------------------------------------------------- | ------------ |
| Mark Holidays on Specific Days                          | ✅ Done       |
| Mark Holidays on Specific Dates                         | ⬜ Not Done   |
| Mark Holidays on Date Ranges                            | ⬜ Not Done   |
| ------------------------------------------------------- | ------------ |
| Set Current Date Indicator                              | ✅ Done       |
| Set Current Date on Input Value                         | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| Set Date Format - YYYY-MM-DD                            | ✅ Done       |
| Set Date Format - YYYY/MM/DD                            | ✅ Done       |
| Set Date Format - YYYY.MM.DD                            | ✅ Done       |
| Set Date Format - DD-MM-YYYY                            | ✅ Done       |
| Set Date Format - DD/MM/YYYY                            | ✅ Done       |
| Set Date Format - DD.MM.YYYY                            | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| Picker Position - Left                                  | ✅ Done       |
| Picker Position - Center                                | ✅ Done       |
| Picker Position - Right                                 | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| Days Format - Full Name (ddd) [Eg. Sunday, आइतबार]      | ✅ Done       |
| Days Format - Short Name (dd) [Eg. Sun, आइत]            | ✅ Done       |
| Days Format - Very Short Name (d) [Eg. S, आ]            | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| English Language Support                                | ✅ Done       |
| Nepali Language Support                                 | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| Dark Theme                                              | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| Min Date                                                | ⬜ Not Done   |
| Max Date                                                | ⬜ Not Done   |
