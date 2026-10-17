# API Reference

## Configuration Options

```javascript
new NepaliDatePicker(selector, {
  // Display options
  format: 'YYYY-MM-DD',
  locale: 'np',
  theme: 'flat',
  compact: false,
  darkMode: false,
  daysFormat: 'dd',
  position: 'left',
  inline: false,

  // Selection modes
  mode: 'basic',
  selectedDatesFormat: 'array',
  rangeSeparator: ' - ',

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
| `compact` | boolean | `false` | Tighter cells and spacing at the same proportions — see [Sizing](#sizing) |
| `darkMode` | boolean | `false` | Enable dark mode |
| `daysFormat` | string | `'dd'` | Day name format: `'ddd'` (full), `'dd'` (short), `'d'` (single) |
| `position` | string | `'left'` | Calendar position: `'left'`, `'right'`, `'center'` |
| `inline` | boolean | `false` | Show calendar inline instead of in modal |

### Selection Modes

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | string | `'basic'` | Selection mode: `'basic'` (single), `'multiple'`, or `'range'` — see [Range selection](#range-selection) |
| `rangeSeparator` | string | `' - '` | Joins the two ends in the input value in `'range'` mode, giving `2082-01-05 - 2082-01-10` |
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

// Range mode
picker.getRange();                      // → { start: '2082-01-05', end: '2082-01-10' }
picker.setRange('2082-01-05', '2082-01-10');
picker.setRange('2082-01-05');          // half-open: end stays null
picker.setRange(null);                  // clears
```

### Instance Properties

Five properties are available on a constructed picker:

```javascript
const picker = new NepaliDatePicker('#selector');

picker.instanceId;      // → 'k3x9fq2a1'  unique per picker, useful when debugging
picker.today;           // → Date         today, GREGORIAN
picker.currentYear;     // → 2083         today, BIKRAM SAMBAT
picker.currentMonth;    // → 5            today, BIKRAM SAMBAT, 0-indexed
picker.currentDay;      // → 5            today, BIKRAM SAMBAT, 1-32
```

> **`today` is the only one in the AD calendar.** The other three are BS, so
> `picker.today.getFullYear()` and `picker.currentYear` disagree on purpose —
> 2026 against 2083. They describe the same day in two calendars.

> **`currentMonth` is 0-indexed** (0 = Baishakh), matching
> `convertToNepaliDate()` and `event.detail.dateObject`. That is one less than
> the month in every `YYYY-MM-DD` string the picker produces, so add 1 before
> comparing the two. See [Month indexing](#month-indexing).

These are meant to be **read**. Assigning to `currentYear` / `currentMonth` /
`currentDay` before the picker is first opened does happen to change which month
it opens on, but that is a side effect of how the calendar initialises, not a
supported way to control it — the TypeScript declarations mark all five
`readonly`, and nothing guarantees it keeps working.

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

## Range selection

`mode: 'range'` lets the user pick a start and an end.

```javascript
const picker = new NepaliDatePicker('#date-picker', { mode: 'range' });
```

### How a range is picked

| | |
|---|---|
| First click | sets the start; the calendar **stays open** |
| Second click on or after the start | closes the range, and the calendar closes with it |
| Second click **before** the start | read as starting again, not as a backwards range |
| Clicking the start twice | a single-day range |

Moving the pointer between the two clicks previews the span.

`closeOnDateSelect` still applies, but only to the second click — closing after
the first would make the range impossible to finish.

### Reading and setting it

```javascript
picker.getRange();
// { start: '2082-01-05', end: '2082-01-10' }   complete
// { start: '2082-01-05', end: null }           only the start is picked
// { start: null, end: null }                   nothing picked
```

`end` is `null` mid-selection, so a half-chosen range is distinguishable from an
empty one. Both are normalised `YYYY-MM-DD` strings regardless of the `format`
option, and `setRange()` expects the same — matching `setSelectedDates()`.

An `end` before the `start` is refused with a warning rather than silently
swapped: a caller passing them the wrong way round has a bug, and quietly
correcting it hides that.

`getSelectedDates()` stays empty in range mode — a range is one value with two
ends, not a list of dates.

### The change event

```javascript
input.addEventListener('nepali-date-change', (e) => {
  const { start, end } = e.detail.range;

  if (end === null) return;          // only the start so far

  console.log(start, end);           // '2082-01-05' '2082-01-10'
  console.log(e.detail.disabledInRange);
});
```

### Dates the range spans but cannot select

The two **ends** must be selectable, but the span between them may cross
disabled days. Rather than blocking the selection, the event reports them:

```javascript
new NepaliDatePicker('#date-picker', {
  mode: 'range',
  disableDates: ['2082-01-07'],
});

// picking 05 → 10 is allowed, and reports:
// e.detail.disabledInRange === ['2082-01-07']
```

Only `disableDates` and `disableToday` can produce these. `minDate`/`maxDate`,
`disableBeforeToday` and `disableAfterToday` all disable a contiguous run from
one end, so if both ends of the range are selectable then everything between
them is too.

### Styling

| Class | On |
|---|---|
| `ap-range-start` | the first end |
| `ap-range-end` | the second end |
| `ap-in-range` | every day strictly between them |
| `ap-in-range-preview` | the hover preview, before the second click |

Both ends also carry `selected`, so they match a single-date selection and
inherit the theme.

```css
.ap-cell-button.ap-in-range {
  background: #ede9fe;
  color: #5b21b6;
}

/* a single-day range is both ends at once */
.ap-cell-button.ap-range-start.ap-range-end {
  border-radius: 0.375rem;
}
```

## Sizing

The picker is laid out on a single cell size. `compact: true` drops that cell from
**2.5rem to 2rem** and brings the spacing around it down in proportion, so the grid
stays square rather than leaving small cells inside the original padding:

```javascript
new NepaliDatePicker('#date-picker', { compact: true });
```

It applies the class `ap-compact` to the card. Everything it changes is a custom
property on `.ap-card`:

| Token | Default | Compact |
|---|---|---|
| `--ap-cell` | `2.5rem` | `2rem` |
| `--ap-gap` | `0.25rem` | `0.125rem` |
| `--ap-card-padding` | `0.5rem` | `0.375rem` |
| `--ap-font-size` | `0.875rem` | `0.8125rem` |
| `--ap-line-height` | `1.25rem` | `1.125rem` |
| `--ap-icon` | `1.25rem` | `1rem` |
| `--ap-select-padding-y` | `0.25rem` | `0.125rem` |
| `--ap-select-padding-x` | `1rem` | `0.5rem` |
| `--ap-table-margin-top` | `0.5rem` | `0.25rem` |
| `--ap-thead-padding-top` | `0.5rem` | `0.25rem` |
| `--ap-thead-padding-bottom` | `0.75rem` | `0.375rem` |
| `--ap-width-ddd` | `4rem` | `3.25rem` |
| `--ap-width-np-ddd` | `5rem` | `4rem` |

Every size in the stylesheet reads one of these, so overriding a token is enough
to change the scale — no rule hardcodes a measurement:

```css
/* between compact and the default */
.ap-card.ap-compact {
  --ap-cell: 2.25rem;
  --ap-gap: 0.1875rem;
}

/* your own scale, without using the option */
.ap-card.my-picker {
  --ap-cell: 1.75rem;
  --ap-gap: 0.125rem;
  --ap-font-size: 0.75rem;
}
```

> The tokens are declared on `.ap-card`, not `:root`, so each picker carries its
> own scale. Two pickers on the same page can differ, and overriding `:root` will
> not reach them.

`--ap-width-ddd` and `--ap-width-np-ddd` only apply when `daysFormat: 'ddd'`, where
the column has to fit a full day name.

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
