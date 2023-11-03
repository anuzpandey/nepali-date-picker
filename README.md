# Nepali Date Picker
Lightweight, Powerful JavaScript Nepali Date Picker with no dependencies.

![branding-image.png](public%2Fimg%2Fbranding-image.png)

## INSTALLATION

### 1. Download the latest release
[Download](https://github.com/anuzpandey/nepali-date-picker/releases/latest) and extract the zip file and copy the files from `dist` folder to your project.

### 2. Use a standalone build
```html
<!-- Add to the end of body section -->
<script src="dist/nepali-date-picker.bundle.js"></script>
```
#### OR

### 3. Use separate files (JS and CSS)
```html
<!-- Add to the head section -->
<link rel="stylesheet" href="dist/nepali-date-picker.min.css">

<!-- Add to the end of body section -->
<script src="dist/nepali-date-picker.min.js"></script>
```

---

### USAGE
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
- [x] ~~Proper UI for Date Picker~~
- [x] ~~Convert English Date to Nepali Date~~
- [ ] Convert Nepali Date to English Date
- [x] ~~Add Date Picker to Multiple Input Fields~~
- [x] ~~Remove jQuery Dependency~~
- [ ] Support Time Select
- [ ] Calculate Age on Date
- [ ] Add Configurations to Date Picker
    - [x] ~~Close/Hide Date Picker on Date Select~~
    - [ ] Disable features on
        - [x] Today's Date
        - [x] Before Today's Date
        - [x] Before After Today's Date
        - [ ] Specific Dates
        - [ ] Specific Days
        - [ ] Specific Months
        - [ ] Specific Years
    - [ ] Mark Holidays on
        - [x] ~~Specific Days~~
        - [ ] Specific Dates
        - [ ] Date Ranges
    - [x] ~~Set Current Date Indicator~~
    - [x] ~~Set Current Date on Input Value~~
    - [x] ~~Set Date Format~~
        - [x] ~~YYYY-MM-DD~~
        - [x] ~~YYYY/MM/DD~~
        - [x] ~~YYYY.MM.DD~~
        - [x] ~~DD-MM-YYYY~~
        - [x] ~~DD/MM/YYYY~~
        - [x] ~~DD.MM.YYYY~~
    - [x] ~~Picker Position~~
        - [x] ~~Left~~
        - [x] ~~Center~~
        - [x] ~~Right~~
    - [x] ~~Date Picker Days Format~~
        - [x] ~~Full Name (ddd) [Eg. Sunday, आइतबार]~~
        - [x] ~~Short Name (dd) [Eg. Sun, आइत]~~
        - [x] ~~Very Short Name (d) [Eg. S, आ]~~
    - [x] ~~Language Support (np/en)~~
        - [x] ~~English~~
        - [x] ~~Nepali~~
    - [ ] Date Picker Theme
        - [x] ~~Light~~
        - [x] ~~Dark~~
    - [ ] Min Date
    - [ ] Max Date