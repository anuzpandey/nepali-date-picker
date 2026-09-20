# API Reference

## Configuration Options

```javascript
new NepaliDatePicker(selector, {
  // Display options
  format: 'YYYY-MM-DD',
  locale: 'np',
  theme: 'flat',
  darkMode: false,
  daysFormat: 'dd',
  position: 'left',
  inline: false,

  // Selection modes
  mode: 'basic',
  selectedDatesFormat: 'array',

  // Interaction
  closeOnDateSelect: true,
  indicateCurrentDate: true,
  setCurrentDate: false,

  // Disable dates
  disableBeforeToday: false,
  disableAfterToday: false,
  disableToday: false,
  disableDates: [],
  disabledDatesFormat: 'YYYY-MM-DD',

  // Min/Max constraints
  minDate: null,
  maxDate: null,
  minDateFormat: null,
  maxDateFormat: null,

  // Holidays
  markHolidays: true,
  holidays: ['Saturday']
});
```

## Option Details

### Display & Localization

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `format` | string | `'YYYY-MM-DD'` | Date format: `'YYYY-MM-DD'`, `'YYYY/MM/DD'`, `'YYYY.MM.DD'`, `'DD-MM-YYYY'`, `'DD/MM/YYYY'`, `'DD.MM.YYYY'` |
| `locale` | string | `'np'` | Language: `'np'` (Nepali) or `'en'` (English) |
| `theme` | string | `'flat'` | Theme style: `'flat'`, `'soft'`, `'bordered'` |
| `darkMode` | boolean | `false` | Enable dark mode |
| `daysFormat` | string | `'dd'` | Day name format: `'ddd'` (full), `'dd'` (short), `'d'` (single) |
| `position` | string | `'left'` | Calendar position: `'left'`, `'right'`, `'center'` |
| `inline` | boolean | `false` | Show calendar inline instead of in modal |

### Selection Modes

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | string | `'basic'` | Selection mode: `'basic'` (single) or `'multiple'` (multiple) |
| `selectedDatesFormat` | string \| function | `'array'` | How `getSelectedDatesFormatted()` and the input field render a multiple selection: `'array'` and `'comma'` both give `'2082-01-15, 2082-01-20'`, `'json'` gives `'["2082-01-15","2082-01-20"]'`, or pass a function receiving the array of dates. For an actual array use `getSelectedDates()`. |

### Interaction

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `closeOnDateSelect` | boolean | `true` | Close picker after selecting a date |
| `indicateCurrentDate` | boolean | `true` | Highlight today's date |
| `setCurrentDate` | boolean | `false` | Auto-fill input with today's date |

### Date Restrictions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `disableBeforeToday` | boolean | `false` | Disable all dates before today |
| `disableAfterToday` | boolean | `false` | Disable all dates after today |
| `disableToday` | boolean | `false` | Disable today's date |
| `disableDates` | array | `[]` | Array of specific dates to disable (e.g., `['2082-01-15', '2082-02-20']`) |
| `disabledDatesFormat` | string | `'YYYY-MM-DD'` | Format of dates in `disableDates` (if different) |

### Min/Max Constraints

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minDate` | string \| null | `null` | Minimum selectable date (Nepali BS) |
| `maxDate` | string \| null | `null` | Maximum selectable date (Nepali BS) |
| `minDateFormat` | string \| null | `null` | Format of `minDate` if different from main format |
| `maxDateFormat` | string \| null | `null` | Format of `maxDate` if different from main format |

### Holidays & Marking

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `markHolidays` | boolean | `true` | Enable holiday marking |
| `holidays` | array | `['Saturday']` | Days to mark as holidays: `'Saturday'`, `'Sunday'`, `'Monday'`, etc. |

## Public Methods

### Instance Methods

```javascript
const picker = new NepaliDatePicker('#selector', config);

// Multiple mode - get selected dates
picker.getSelectedDates();              // → ['2082-01-15', '2082-02-20']

// Multiple mode - set selected dates
picker.setSelectedDates(['2082-01-15', '2082-01-20']);

// Multiple mode - get the selection rendered per selectedDatesFormat.
// Always returns a string, whichever format is configured.
picker.getSelectedDatesFormatted();     // → '2082-01-15, 2082-01-20'

// Multiple mode - clear all selections
picker.clearSelection();

// Min/Max constraints
picker.setMinDate('2082-01-01');
picker.setMaxDate('2082-12-31');
picker.getMinDate();                    // → '2082-01-01'
picker.getMaxDate();                    // → '2082-12-31'
```

### Static Methods

```javascript
// Convert an English (AD) date to Nepali (BS)
NepaliDatePicker.convertToNepaliDate(year, month, day);
// Example: NepaliDatePicker.convertToNepaliDate(1996, 4, 22)
// Result: { year: 2053, month: 0, date: 10 }

// Convert a Nepali (BS) date to English (AD)
NepaliDatePicker.convertToEnglishDate(bsYear, bsMonth, bsDay);
// Example: NepaliDatePicker.convertToEnglishDate(2082, 1, 1)
// Result: { year: 2025, month: 4, date: 14 }

// Whether an AD year is a leap year
NepaliDatePicker.isLeapYear(2024);      // → true
```

#### Month indexing

The two converters do **not** index months the same way. This is the one thing to
get right when using them:

| | `month` argument | `month` in the result |
|---|---|---|
| `convertToNepaliDate` | AD, **1-indexed** (1 = January) | BS, **0-indexed** (0 = Baishakh) |
| `convertToEnglishDate` | BS, **1-indexed** (1 = Baishakh) | AD, **1-indexed** (1 = January) |

`convertToEnglishDate` is 1-indexed on both sides because that is what the picker
itself produces — the input value, `getSelectedDates()` and every `YYYY-MM-DD`
string in the library use a 1-indexed month:

```javascript
// A date the user picked, in the default YYYY-MM-DD format
const [y, m, d] = '2082-05-04'.split('-').map(Number);
NepaliDatePicker.convertToEnglishDate(y, m, d);   // → { year: 2025, month: 8, date: 20 }
```

The 0-indexed return of `convertToNepaliDate` is kept for backwards
compatibility. Feeding it straight back needs `+ 1`:

```javascript
const bs = NepaliDatePicker.convertToNepaliDate(2025, 4, 14);
NepaliDatePicker.convertToEnglishDate(bs.year, bs.month + 1, bs.date);
// → { year: 2025, month: 4, date: 14 }
```

Both converters also return the day as `date`, not `day`.

#### Supported range

Conversion is backed by a calendar table covering BS 2000–2090, but the AD side
counts from a 1944 anchor, so the supported window is:

**AD 1944-01-01 – 2034-04-13**, equivalently **BS 2000-09-17 – 2090-12-30**.

Anything outside it throws a `RangeError`, at either end and in either direction.
So do malformed dates, and a BS day its month does not have — `2082-08-30`, say,
where Mangsir 2082 is only 29 days long.

## Events

### Native DOM Events

```javascript
const input = document.getElementById('date-picker');

// Input event - fires on selection
input.addEventListener('input', (e) => {
  console.log('Value:', e.target.value);
});

// Change event - fires on selection
input.addEventListener('change', (e) => {
  console.log('Value:', e.target.value);
});
```

### Custom Event

```javascript
input.addEventListener('nepali-date-change', (e) => {
  const {
    date,           // Formatted date string
    dateObject,     // { year, month, date }
    mode,           // 'basic' or 'multiple'
    selectedDates   // Array (multiple mode only)
  } = e.detail;
});
```

## Examples

### Basic Date Picker

```javascript
new NepaliDatePicker('#date-picker');
```

### Multiple Date Selection

```javascript
new NepaliDatePicker('#date-picker', {
  mode: 'multiple',
  selectedDatesFormat: (dates) => `${dates.length} dates selected`
});
```

### Constrained Date Range

```javascript
new NepaliDatePicker('#date-picker', {
  minDate: '2082-01-01',
  maxDate: '2082-12-31',
  format: 'DD-MM-YYYY',
  minDateFormat: 'DD-MM-YYYY',
  maxDateFormat: 'DD-MM-YYYY'
});
```

### Dark Mode with Custom Theme

```javascript
new NepaliDatePicker('#date-picker', {
  theme: 'soft',
  darkMode: true,
  locale: 'en'
});
```

### Disable Past and Future Dates

```javascript
new NepaliDatePicker('#date-picker', {
  disableBeforeToday: true,
  disableAfterToday: false
});
```

### With Event Listener

```javascript
new NepaliDatePicker('#date-picker', {
  format: 'YYYY-MM-DD'
});

document.getElementById('date-picker').addEventListener('nepali-date-change', (e) => {
  console.log('Selected:', e.detail.date);
  console.log('Parsed:', e.detail.dateObject);
});
```
