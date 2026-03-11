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

All the following are valid ways to create date picker instance.

```javascript
// Initialize Nepali Date Picker
new NepaliDatePicker('.date-picker')
// --- OR ---
new NepaliDatePicker('#date-of-birth')
// --- OR ---
new NepaliDatePicker('selector', config) // See Config Options below
```

#### HTML Structure Requirement

**Important:** The input field must be wrapped in a container with `position: relative` for the date picker to position correctly:

```html
<!-- ✅ Correct -->
<div style="position: relative;">
  <input type="text" id="date-picker">
</div>

<!-- Or with CSS class -->
<div class="relative">
  <input type="text" id="date-picker">
</div>
```

Without the relative positioning, the calendar popup will not align correctly with the input field.

---

#### Config Options

```javascript
let config = {
    format: 'YYYY-MM-DD',                 // 'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'DD.MM.YYYY'
    mode: 'basic',                        // 'basic' for single selection, 'multiple' for multiple selection
    selectedDatesFormat: 'array',         // 'array', 'comma', 'json', or function (only for mode: 'multiple')
    disableAfterToday: false,             // boolean: true | false
    disableBeforeToday: false,            // boolean: true | false
    disableToday: false,                  // boolean: true | false
    disableDates: ['2081-01-02'],         // Array of dates (string)
    disabledDatesFormat: 'YYYY-MM-DD'     // string: required if different date format on disabledDates except(YYYY-MM-DD)
    closeOnDateSelect: true,              // boolean: true | false
    markHolidays: true,                   // boolean: true | false
    holidays: ['Saturday'],               // ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    indicateCurrentDate: true,            // boolean: true | false
    setCurrentDate: false,                // boolean: true | false
    position: 'left',                     // 'left', 'right' or 'center'
    daysFormat: 'dd',                     // 'ddd' for full day name, 'dd' for short day name, 'd' for 1 letter day name
    locale: 'np',                         // 'np' for nepali, 'en' for english
    theme: 'flat',                        // bordered | soft | flat
    darkMode: false,                      // boolean: true | false
    inline: false,                        // boolean: true | false
    minDate: null,                        // string: minimum selectable date (Nepali date)
    maxDate: null,                        // string: maximum selectable date (Nepali date)
    minDateFormat: null,                  // optional: format of minDate if different from main format
    maxDateFormat: null,                  // optional: format of maxDate if different from main format
}
````

#### Custom Date Formatting with `selectedDatesFormat`

When using `mode: 'multiple'`, you can provide a custom function to format the selected dates however you need:

```javascript
// Function signature
selectedDatesFormat: (dates) => {
    // dates: Array of selected dates in 'YYYY-MM-DD' format
    // returns: String to display in the input field
}
```

**Parameters:**
- `dates` - Array of selected date strings in normalized `YYYY-MM-DD` format (e.g., `['2082-01-15', '2082-02-20']`)

**Return Value:**
- String that will be displayed in the input field

**Examples:**

```javascript
// Example 1: Custom separator
new NepaliDatePicker('#myPicker', {
    mode: 'multiple',
    selectedDatesFormat: (dates) => dates.join(' | ')
    // Output: "2082-01-15 | 2082-02-20"
});

// Example 2: Add prefix/suffix
new NepaliDatePicker('#myPicker', {
    mode: 'multiple',
    selectedDatesFormat: (dates) => `Selected ${dates.length} dates: ${dates.join(', ')}`
    // Output: "Selected 2 dates: 2082-01-15, 2082-02-20"
});

// Example 3: Custom date formatting
new NepaliDatePicker('#myPicker', {
    mode: 'multiple',
    selectedDatesFormat: (dates) => dates.map(d => {
        const [year, month, day] = d.split('-');
        return `${day}/${month}/${year}`;
    }).join(', ')
    // Output: "15/01/2082, 20/02/2082"
});

// Example 4: Preformatted options
new NepaliDatePicker('#myPicker', {
    mode: 'multiple',
    selectedDatesFormat: (dates) => {
        if (dates.length === 0) return '';
        if (dates.length === 1) return `1 date selected: ${dates[0]}`;
        return `${dates.length} dates selected`;
    }
    // Output: "2 dates selected" or "1 date selected: 2082-01-15"
});
```

#### Min/Max Date Constraints

Restrict date selection to a specific range by setting minimum and maximum dates. All dates are specified in **Nepali calendar (BS - Bikram Sambat)** format.

**Important:** Use Nepali dates (BS), not English dates (AD). For example, use `2082` for Nepali year 2082, not 2025.

```javascript
// Basic usage - same format as main picker
new NepaliDatePicker('#picker', {
    format: 'YYYY-MM-DD',
    minDate: '2082-01-01',    // Nepali year 2082, month 1, day 1
    maxDate: '2082-12-30'     // Nepali year 2082, month 12, day 30
})

// Different format for constraints than main picker
new NepaliDatePicker('#picker', {
    format: 'DD-MM-YYYY',
    minDate: '01-01-2082',           // Using DD-MM-YYYY format
    minDateFormat: 'DD-MM-YYYY',     // Specify the format
    maxDate: '30-12-2082',
    maxDateFormat: 'DD-MM-YYYY'
})
```

**Public API Methods:**

```javascript
const picker = new NepaliDatePicker('#picker', {
    minDate: '2082-01-01',
    maxDate: '2082-12-30'
})

// Update constraints dynamically
picker.setMinDate('2082-02-01')
picker.setMaxDate('2082-11-30')

// Get current constraints
const min = picker.getMinDate()  // → '2082-02-01'
const max = picker.getMaxDate()  // → '2082-11-30'

// Clear constraints
picker.setMinDate(null)
picker.setMaxDate(null)
```

**Use Cases:**
- Date Range Booking: Only allow booking within available dates
- Age Verification: Set maximum date to restrict selection (e.g., adults only)
- Project Timeline: Only select dates within project duration
- Appointment Scheduling: Only allow dates within operating period
- Event Registration: Only allow registration before event date

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
| Multiple Date Selection (mode: 'multiple')              | ✅ Done       |
| ------------------------------------------------------- | ------------ |
| Disable on Today's Date                                 | ✅ Done       |
| Disable on Before Today's Date                          | ✅ Done       |
| Disable on Before After Today's Date                    | ✅ Done       |
| Disable on Specific Dates                               | ✅ Done       |
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
| Min Date                                                | ✅ Done       |
| Max Date                                                | ✅ Done       |
