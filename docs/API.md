# API Reference

## Configuration Options

```javascript
new NepaliDatePicker(selector, {
  // Display options
  format: 'YYYY-MM-DD',
  locale: 'np',
  theme: 'flat',
  compact: false,
  todayButton: false,
  presets: [],
  englishDates: false,
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
| `todayButton` | boolean \| object | `false` | A **Today** button in the footer — see [Footer](#footer-today-and-presets) |
| `presets` | array | `[]` | Shortcut buttons — see [Footer](#footer-today-and-presets) |
| `englishDates` | boolean \| object | `false` | Gregorian dates alongside the BS ones — see [English dates](#english-dates) |
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

## Footer: Today and presets

Both render into one row under the calendar, and the footer only exists when at
least one of them is configured — a picker that asks for neither keeps exactly
the height it had.

```javascript
new NepaliDatePicker('#date-picker', {
  todayButton: true,
  presets: [
    { label: 'Tomorrow',  value: () => addDays(new Date(), 1) },
    { label: 'In a week', value: () => addDays(new Date(), 7) },
  ],
});
```

Both `todayButton` and `englishDates` take **a boolean or an object**. The
boolean is the common case; the object configures it. In the object form
`enabled` defaults to `true`, so `{ label: 'Jump' }` means "on, with this
label".

### Closing

Both follow `closeOnDateSelect`, exactly as clicking a day does.

Set `closeOnSelect: false` where a button is a jump-to action rather than a
final answer — land near the date, then adjust. It works on the Today button
and on each preset independently:

```javascript
new NepaliDatePicker('#date-picker', {
  todayButton: { closeOnSelect: false },
  presets: [
    { label: 'Tomorrow', value: () => addDays(new Date(), 1), closeOnSelect: false },
    { label: 'New Year', value: '2083-01-01' },   // closes, like a day click
  ],
});
```

In `'multiple'` mode nothing in the footer closes the picker, which is also how
clicking a day behaves there.

### Today

Selects today. It is **disabled when today is not selectable** — outside `minDate`/`maxDate`, or covered by
`disableDates` or `disableToday`.

Labelled `'आज'` under `locale: 'np'` and `'Today'` under `'en'`; override with
`todayButton: { label: '…' }`.

### Presets

Each entry is `{ label, value }`. `value` is the date, or a function returning
it — the function runs on every click, so `() => addDays(new Date(), 1)` stays
correct across midnight.

What `value` may resolve to:

| | |
|---|---|
| a `Date` | Gregorian, converted for you |
| a `'YYYY-MM-DD'` string | Bikram Sambat, like every other date option |
| two of either, as an array | a range in `'range'` mode, or a multiple selection |

In `'multiple'` mode a preset **replaces** the current selection rather than
adding to it — a preset names a selection, not an addition. Use
`setSelectedDates([...picker.getSelectedDates(), ...])` from your own handler if
you want to append.

```javascript
presets: [
  { label: 'Tomorrow',  value: () => addDays(new Date(), 1) },  // Date
  { label: 'New Year',  value: '2082-01-01' },                  // BS string
  { label: 'That week', value: ['2082-01-05', '2082-01-11'] },  // range
]
```

Choosing a preset also navigates the calendar to the month it landed in, so the
selection is visible rather than somewhere off-screen — and since the picker
stays open, you can adjust from there.

A malformed entry is skipped with a console warning rather than throwing, and
labels are escaped before rendering.

### Styling the footer

| Class | On |
|---|---|
| `ap-footer` | the row |
| `ap-footer__button` | every button in it |
| `ap-today-button` | the Today button |
| `ap-preset-button` | each preset |

Today is pushed to the trailing edge with `margin-left: auto`; remove that to
keep everything on one side.

## English dates

`englishDates: true` shows Gregorian dates alongside the Bikram Sambat ones: the
day number under each date, and the month span under the header.

```javascript
new NepaliDatePicker('#date-picker', { englishDates: true });

// or, configured
new NepaliDatePicker('#date-picker', {
  englishDates: { monthLabel: false, divider: false },
});
```

| Key | Default | |
|---|---|---|
| `enabled` | `true` | `false` turns it off while keeping the object |
| `monthLabel` | `true` | the span under the header, e.g. `October/November 2025` |
| `divider` | `true` | a rule under that span |

### The month span

A Bikram Sambat month never lines up with a Gregorian one — it always starts
partway through — so the header shows a **range**, not a name. Ashwin 2082 is
`September/October 2025`; Poush 2082 crosses a year and reads
`December 2025/January 2026`.

Only the day number goes in the cells. Repeating the month in each one would
crowd the grid to say what the header already says.

The cell grows from `2.5rem` to `2.625rem` to fit both. The calendar is seven
cells across, so that is about `0.875rem` wider overall — worth knowing if you
are placing it in a narrow column. The card will overflow a container too small
for it rather than clipping a column, since a calendar cannot be narrower than
seven of them. Adjust it like any other size:

```css
.ap-card.ap-show-english {
  --ap-cell: 3rem;
  --ap-english-font-size: 0.75rem;
  --ap-english-month-font-size: 0.875rem;
}
```

The month span is `.ap-english-month`, and carries
`.ap-english-month--divided` when the divider is on.

Days with no AD equivalent — before the 1944 conversion anchor, so the first
eight months of BS 2000 — render without a second number rather than failing.

The secondary number and the month span both carry `aria-hidden`: the cell
already announces the Bikram Sambat day, and a bare second number read after it
would be noise. The number is styled with `.ap-english-date`.

## Choosing a month or year

The header shows the current month and year as buttons. Clicking either opens a
grid over the calendar:

- **Year** — twelve years at a time, centred on the year in view, with chevrons
  to page through. The bundled table covers BS 2000–2090, so that is eight pages.
- **Month** — the twelve months, with chevrons to step the year.

Choosing a **year leads to the month grid**, and choosing a month returns to the
days — year, then month, then date. From the month grid the year in the header
is a button back to the years.

Everything is keyboard operable: arrow keys move across the grid, `Home` and
`End` jump to its ends, `PageUp` and `PageDown` turn the page, `Enter` or
`Space` chooses, and `Escape` closes and returns focus to the header.

### The hidden `<select>` elements

Before this the header was two native `<select>`s, and the year one carried 91
options. They are still there, still carrying the same values, but visually
hidden — so anything that drove the picker through them keeps working:

```javascript
const card = document.querySelector('.ap-card');

card.querySelector('.ap-calendar-year').value = '2085';
card.querySelector('.ap-calendar-year').dispatchEvent(new Event('change'));
```

They are marked `aria-hidden` and `tabindex="-1"`, so assistive technology and
tab order see the header buttons instead of two controls for the same thing.

### Styling

| Class | On |
|---|---|
| `ap-header__trigger` | the month and year buttons in the header |
| `ap-month-trigger` / `ap-year-trigger` | each one specifically |
| `ap-panel` | the grid overlay |
| `ap-panel__label` | the year or range in the panel header |
| `ap-panel__grid` | the grid itself, a `listbox` |
| `ap-panel__cell` | each month or year, an `option` |

The current month or year carries `selected`, the same class a selected day
uses, so it inherits the theme and dark mode without a second rule.

```css
.ap-panel__cell.selected {
  background: #4f46e5;
  color: #ffffff;
}
```

The panel **overlays** the calendar rather than replacing it, and the calendar
keeps its space with `visibility: hidden`. That is deliberate: `.ap-card` is
`max-width: fit-content`, so taking the calendar out of the layout would
collapse the card onto the panel's own width and the picker would change size
as you opened it.

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
| `--ap-header-control` | `2rem` | `1.75rem` |
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
