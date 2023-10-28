## INSTALLATION

- Add nepali-date-picker.min.js
- Add ap-picker.min.css

### USAGE

### Nepali Date Picker

```html

<link rel="stylesheet" href="./css/nepali-date-picker.min.css">

<!-- Add data-nepali-date-picker="unique_value" attribute to input field -->
<input type="text" readonly data-nepali-date-picker="date_of_birth" placeholder="YYYY-MM-DD">
<input type="text" readonly data-nepali-date-picker="registered_at" placeholder="YYYY-MM-DD">

<script src="./js/nepali-date-picker.min.js"></script>

<script>
    new NepaliDatePicker()
</script>
````

#### English Date to Nepali Date Conversion

```javascript
// To Convert English Date to Nepali Date

let NepaliDatePicker = new NepaliDatePicker();

NepaliDatePicker.convertToNepaliDate(2053, 1, 10)

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
        - [ ] Today's Date
        - [ ] Before Today's Date
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
        - [ ] Dark
    - [ ] Min Date
    - [ ] Max Date