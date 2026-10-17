# Changelog

All notable changes to this project are documented here.

This file is maintained in the development repository and copied to the public
repository at release time, alongside `dist/` and the docs.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.15.0] - 2026-10-17

### Added

- **A `Today` button**, via `todayButton: true`. It sits in a footer under the
  calendar and is **disabled when today is not selectable** — outside
  `minDate`/`maxDate`, or covered by `disableDates`/`disableToday`. Labelled
  `'आज'` or `'Today'` by locale.

  The object form takes a label and a closing rule of its own:

  ```javascript
  todayButton: { enabled: true, label: 'Go to today', closeOnSelect: false }
  ```

- **Preset buttons**, via `presets`:

  ```javascript
  presets: [
    { label: 'Tomorrow',  value: () => addDays(new Date(), 1) },
    { label: 'In a week', value: () => addDays(new Date(), 7) },
  ]
  ```

  `value` may be a Gregorian `Date`, a Bikram Sambat `'YYYY-MM-DD'` string, or
  a function returning either — evaluated on each click, so a relative preset
  stays correct across midnight. Two dates in an array give a range in
  `'range'` mode or a multiple selection in `'multiple'`.

  Choosing a preset navigates the calendar to the month it landed in. A
  malformed entry is skipped with a warning rather than throwing, and labels
  are escaped before rendering. Each preset may carry its own `closeOnSelect`.

- **Gregorian dates alongside the Bikram Sambat ones**, via
  `englishDates: true` — the day number under each date, and the month span
  under the header.

  A Bikram Sambat month never lines up with a Gregorian one, so the span is a
  range rather than a name: `September/October 2026`, or `December
  2025/January 2026` where it crosses a year. A rule under it separates it
  from the grid.

  ```javascript
  englishDates: { enabled: true, monthLabel: true, divider: true }
  ```

  The cell grows from `2.5rem` to `2.625rem` to fit both numbers, so the
  calendar is about `0.875rem` wider across its seven columns — adjustable
  through the sizing tokens. Days before the 1944 conversion anchor render
  without a second number rather than failing. Both the day number and the
  month span are `aria-hidden`, since the cell already announces the BS day.

- **Styling classes:** `ap-footer`, `ap-footer__button`, `ap-today-button`,
  `ap-preset-button`, `ap-english-date` on the secondary number, and
  `ap-english-month` (with `ap-english-month--divided`) on the month span.

**Footer buttons close the picker exactly as clicking a day does** — they
follow `closeOnDateSelect`, and nothing in the footer closes a `'multiple'`
picker, matching how a day click behaves there. `closeOnSelect: false` opts a
single button out, for a jump-to action you expect the user to adjust from.

`todayButton` and `englishDates` each take **a boolean or an object** — the
boolean for the common case, the object to configure it. In the object form
`enabled` defaults to `true`, so `{ label: 'Jump' }` reads as "on, with this
label".

All three are **opt-in**. A picker that configures none of them renders exactly
as it did in 2.14.0.

### Changed

- **The header controls are no longer cell-sized.** The month and year buttons
  and the two arrows read a new token, `--ap-header-control` (`2rem`, `1.75rem`
  compact), instead of `--ap-cell`. A cell-tall control is a lot of padding
  around a word, and it was getting worse: with `englishDates` the cell grows
  to `2.625rem` and the header grew with it, for a row that has no grid to line
  up with. The grid itself is untouched.

### Fixed

- **The calendar could be clipped by its own card in a narrow container.**
  `.ap-card` is `max-width: fit-content`, which is clamped by the space
  available, so in a container narrower than the calendar the card shrank while
  the rows — which are flex and `nowrap` — did not. The last column was cut off
  and a scrollbar appeared under it.

  It surfaced with `englishDates`, where the cell grows to `2.625rem`, but
  any wide-enough configuration could hit it: `daysFormat: 'ddd'` is a `4rem`
  cell and Nepali day names `5rem`. The card now carries
  `min-width: max-content`, so it overflows a too-small container visibly
  instead of quietly losing Saturday.

- **An inline calendar could paint over an open popup.** Both carried
  `z-index: 10`, so paint order fell to DOM order and any inline calendar
  further down the page covered an open picker above it. Inline cards are
  `z-index: auto` now — they sit in the flow and have nothing to stack above.

- **The month and year panels stretched to the calendar's full height**, which
  made twelve cells grow to fill it and a month grid look nothing like a month
  grid. The calendar leaves the layout while a panel is open, so the card is
  exactly as tall as the panel. Its width is held for the duration, so the
  picker does not resize as it opens.

- **With `englishDates` on, selecting a date wrote the wrong day.** The day
  was read back out of the cell's text, and a cell holding two numbers reads as
  one: `"१३29"` decoded to `1329` and parsed as day **29** for a cell showing
  day 13. Every mode was affected. The day is carried as a data attribute now
  rather than recovered from the rendering.

- **Clicking the Gregorian number in a cell did nothing.** The document click
  listener matched `event.target` exactly against `.ap-cell-button`, so a click
  landing on the secondary number — a `<span>` inside the button — was ignored,
  which reads as the first click not registering. It resolves with `closest()`
  now, so anywhere in the cell works.

- **The picker got slower the more you navigated, and hover stopped showing.**
  The previous/next listeners were added on every call of the method that wires
  them, and that method runs from both select change handlers — so every month
  or year change through a dropdown, and therefore every choice made in the
  grid panels, left another pair of click listeners on the arrows. One press
  then ran all of them: after four changes a single click rendered the calendar
  **five times**, and it kept growing. The hover styling looked broken because
  the cells were being destroyed and rebuilt under the pointer.

  It was also wrong, not just slow. Each listener closed over the year and
  month of the render that created it, so the stale ones disagreed about the
  destination and the month you landed on was whichever ran last. They are
  bound once per card now and read the current values off the selects.

- **A date chosen from the footer was written to the input but not highlighted
  in the calendar.** Basic mode kept no record of its selection — the class
  went straight onto the clicked element — so nothing that selected a date
  without a click could show it, and the highlight was lost on navigating to
  another month and back. The selection is remembered and repainted now, which
  fixes both.

- **The footer button that produced the current selection is marked**, with
  `selected` and `aria-pressed`, and cleared when a day is clicked directly.

## [2.14.0] - 2026-10-17

### Added

- **Grid pickers for the month and year.** The header's two dropdowns are now
  buttons that open a grid over the calendar. The year one used to carry **91
  options**, BS 2000 to 2090 — a long scroll to reach a birth year and worse on
  a phone. It is twelve years at a time now, centred on the year in view, eight
  pages for the whole table.

  **Year leads to month leads to date.** Choosing a year opens the month grid
  rather than dropping back to the calendar, because after moving years you are
  almost never in the month you want. From the month grid the year in the
  header is a button back to the years.

- **The header is keyboard operable.** Arrow keys move across the grid, `Home`
  and `End` jump to its ends, `PageUp` and `PageDown` turn the page, `Enter` or
  `Space` chooses, `Escape` closes and returns focus to the header. The grid is
  a `listbox` of `option`s with `aria-selected`, and the triggers declare
  `aria-haspopup` and `aria-expanded`.

- **Five styling classes:** `ap-header__trigger`, `ap-panel`, `ap-panel__label`,
  `ap-panel__grid` and `ap-panel__cell`. The current month or year carries
  `selected`, the same class a selected day uses, so it inherits the theme.

### Changed

- **The month and year `<select>` elements are now visually hidden rather than
  removed.** `.ap-calendar-month` and `.ap-calendar-year` still hold the same
  values and still re-render the calendar when you set `.value` and dispatch
  `change`, so code driving the picker that way is unaffected. They carry
  `aria-hidden` and `tabindex="-1"` so assistive technology and tab order see
  the header buttons instead of two controls for the same thing.

### Fixed

- **The select change listeners were being registered on every render.** They
  were added inside the render routine behind a `removeEventListener` call that
  could never match — an anonymous function is a new reference each time — so
  they accumulated. Because each handler itself triggers a render, which
  registered another pair, the count doubled on every change made through the
  dropdowns: the fifth one re-rendered the calendar **32 times**.

  Nothing looked wrong, since rendering is idempotent. It showed up only as the
  picker getting slower the longer someone spent choosing a month.

  Fixing it also fixed a staleness bug in the same code: the year handler
  closed over the month from the render that created it, so changing the year
  after changing the month could revert the month.

## [2.13.0] - 2026-10-17

### Added

- **Range selection.** `mode: 'range'` lets the user pick a start and an end.
  Listed as planned since v1.0, and referenced in the `mode` option comment for
  just as long.

  ```javascript
  const picker = new NepaliDatePicker('#date-picker', { mode: 'range' });

  picker.getRange();  // { start: '2082-01-05', end: '2082-01-10' }
  ```

  The first click sets the start and leaves the calendar open; the second closes
  the range. A second click **before** the start is read as starting again
  rather than as a backwards range, and clicking the start twice gives a
  single-day range. Moving the pointer between the two clicks previews the span.

  `end` is `null` while only the start is picked, so a half-chosen range is
  distinguishable from an empty one.

- **`getRange()` and `setRange(start, end)`.** Both use normalised
  `YYYY-MM-DD`, matching `setSelectedDates()`. An `end` before the `start` is
  refused with a warning rather than silently swapped.

- **`rangeSeparator`**, default `' - '`, joining the two ends in the input value.

- **A range may span disabled dates.** The two ends must be selectable, but the
  days between them need not be. Rather than blocking the selection, the change
  event reports them as `detail.disabledInRange` so the application can warn,
  split the range, or accept it.

- **Four styling classes:** `ap-range-start`, `ap-range-end`, `ap-in-range` and
  `ap-in-range-preview`. Both ends also carry `selected`, so they match a
  single-date selection and inherit the theme.

### Fixed

- **`mode: 'range'` no longer silently behaves as `'basic'`.** The option
  comment has advertised `'range'` since v1.0 while only `'basic'` and
  `'multiple'` were implemented, so passing it gave a plain single-date picker
  with no warning. TypeScript users were protected by the `Mode` union;
  JavaScript users were not.

## [2.12.0] - 2026-10-07

### Added

- **`compact: true`.** Tighter cells and spacing at the same proportions — the
  cell drops from 2.5rem to 2rem and the spacing around it comes down with it,
  so the grid stays square instead of leaving small cells inside the original
  padding.

  ```javascript
  new NepaliDatePicker('#date-picker', { compact: true });
  ```

- **Sizing custom properties.** Every measurement in the stylesheet now reads a
  token on `.ap-card` — `--ap-cell`, `--ap-gap`, `--ap-card-padding` and ten
  others. `compact` is nothing more than an override of those, so any scale in
  between is available from your own CSS. See
  [docs/API.md](docs/API.md#sizing).

  The tokens are declared on `.ap-card` rather than `:root`, so each picker
  carries its own scale and two pickers on a page can differ.

### Fixed

- **`nepali-date-picker.min.css` was missing the min/max date styling.** The
  rules for `[data-disable-reason="min-date"]` and `"max-date"` — the reduced
  opacity and grey background on dates outside the allowed range — were added to
  `nepali-date-picker.css` in 2.5.0 and never copied into the minified
  stylesheet. Anyone loading the minified file got no visual treatment for
  out-of-range dates at all. Present in every release from 2.5.0 to 2.11.0.

  The minified stylesheet is generated from the source during the build now
  rather than hand-maintained, and a test asserts the two files declare the same
  selectors and properties, so they cannot drift apart again.

## [2.11.0] - 2026-09-21

### Fixed

- **The four documented instance properties are now declared in the TypeScript
  definitions.** `currentYear`, `currentMonth`, `currentDay` and `today` are
  documented as available on a picker, but only `instanceId` was declared — so
  a TypeScript user following the docs got four `TS2339: Property does not
  exist` errors with no workaround short of casting to `any`.

  No runtime change; the properties have always been there.

### Added

- **Instance properties are documented**, in `docs/API.md` and in the
  declarations, including two things that were not written down anywhere:

  - `today` is **Gregorian** while `currentYear` / `currentMonth` /
    `currentDay` are **Bikram Sambat**, so `picker.today.getFullYear()` and
    `picker.currentYear` disagree on purpose — 2026 against 2083.
  - `currentMonth` is **0-indexed**, like `convertToNepaliDate()` and
    `event.detail.dateObject`, and therefore one less than the month in the
    `YYYY-MM-DD` strings the picker produces.

## [2.10.0] - 2026-09-21

### Added

- **BS → AD conversion.** `NepaliDatePicker.convertToEnglishDate(bsYear, bsMonth, bsDay)`
  returns `{ year, month, date }`, completing the pair with `convertToNepaliDate`.
  It was listed as planned since v1.0.

  ```javascript
  NepaliDatePicker.convertToEnglishDate(2082, 1, 1);
  // → { year: 2025, month: 4, date: 14 }
  ```

  **`bsMonth` is 1-indexed, and so is the `month` it returns** — matching the
  `YYYY-MM-DD` strings the picker produces, which is where a BS date usually
  comes from. Note that this is *not* a mirror of `convertToNepaliDate`, whose
  returned `month` is 0-indexed and stays that way for compatibility. Passing its
  result straight back needs `+ 1`; see [docs/API.md](docs/API.md#month-indexing).

  Supports BS 2000-09-17 to 2090-12-30 — the same window as `convertToNepaliDate`,
  seen from the other side. Outside it, or on a day the BS month does not have,
  it throws a `RangeError`.

  Verified by round-tripping every one of the 32,976 days in that window.

### Fixed

- **`docs/API.md` no longer warns that pre-1944 dates return a wrong answer.**
  They have thrown a `RangeError` since 2.8.0; the note was left behind.

## [2.9.0] - 2026-09-20

### Added

- **A real ES module build.** `dist/nepali-date-picker.mjs`, reachable through
  the `import` condition of a new `exports` map.

### Fixed

- **`module` no longer points at a file that is not an ES module.** It pointed at
  the UMD bundle, which contains no `export` statements at all, so every tool
  reading that field was told the package ships ESM when it did not. Bundlers
  could not analyse it, and Node's interop invented a bogus named export called
  `module.exports`.

  `require()` still resolves to the UMD build and is unchanged. Deep imports such
  as `@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.min.css` keep
  working — the `exports` map leaves `./dist/*` open on purpose.

## [2.8.1] - 2026-09-20

### Fixed

- **Corrected the calendar data for BS 2062.** Baishakh 2062 is 31 days, not 30,
  and Jestha is 31, not 32. Every date in Jestha 2062 — roughly 15 May to 14 June
  2005 — was reading one day out. Jestha 1, 2062 is AD 2005-05-15.

  The year still totals 365, so no other month or year is affected, and no date
  outside Jestha 2062 changes. Verified against Hamro Patro.

## [2.8.0] - 2026-09-20

### Added

- **TypeScript definitions now ship with the package.** Nothing extra to
  install — `types` points at `dist/nepali-date-picker.d.ts`. Option values are
  literal unions, so a typo in `theme` or `format` is a compile error instead of
  a silent fallback, and the `nepali-date-change` event is typed through
  `HTMLElementEventMap`.

  Two things the types make explicit that the docs previously got wrong:
  `getSelectedDatesFormatted()` returns a string, not an array, and
  `convertToNepaliDate()` returns `date` with a zero-indexed `month`.

## [2.7.1] - 2026-09-20

### Fixed

- **AD dates before 1944 are now rejected instead of converting to nonsense.**
  `convertToNepaliDate()` counts forward from an AD 1944 anchor, and for earlier
  years it returned a result somewhere inside BS 2000–2001 with no error — not
  even in order, since `1943-12-31` came out a year *ahead* of `1944-01-01`.
  Such dates now throw a `RangeError`, matching what already happened past the
  other end of the range.
- `convertToNepaliDate()` also rejects an out-of-range month or day, rather than
  quietly treating month `0` as January.

### Added

- A `LICENSE` file. The package has always declared MIT in `package.json` and
  the README, but no licence text shipped with it.

### Documentation

- Corrected the CDN instructions. They pointed at
  `nepali-date-picker.bundle.min.js`, which has never existed — the URL worked
  only because jsDelivr minifies unknown `.min.js` requests on the fly. The real
  files are `nepali-date-picker.bundle.js` (JS with CSS inlined) and
  `nepali-date-picker.min.js` (JS alone), both already minified.

## [2.7.0] - 2026-09-20

### Fixed

- **Multiple pickers on one page no longer interfere.** `setSelectedDates()` and
  `clearSelection()` searched the whole document, so calling either on one
  picker repainted the cells and overwrote the input of every other picker on
  the page. Each picker now only touches its own calendar and input.
- **`clearSelection()` no longer throws on a picker that has not been opened.**
  A "Reset" button placed next to a picker the user had not yet clicked threw
  `TypeError: Cannot set properties of null`. For the same reason
  `setSelectedDates()` silently failed to update the input in that state; it now
  works.
- **Invalid `minDate` and `maxDate` values are rejected instead of ignored.** A
  value like `'not-a-date'` passed validation, because it splits into three
  parts on its hyphens, and the constraint then silently did nothing. Values
  with non-numeric parts, a month outside 1–12, or a day outside 1–32 are now
  rejected with a warning. This also covers `disableDates` and dates typed
  directly into the input.
- **Removed debug logging from the released bundle.** Two `console.log` calls
  were firing on every calendar render and every close.

### Changed

- **AD → BS conversion is dramatically faster.** It previously stepped one day
  at a time from a 1944 anchor, rebuilding the calendar table on every
  iteration, and ran once per picker on construction. Converting a 2026 date
  took about 140 ms; it now takes about 0.03 ms. Timing is also flat regardless
  of how far the date is from the anchor, where before it grew every year.

  In practice, a page with four pickers no longer blocks for over half a second
  before rendering.
- **Date validation is stricter.** Values that were previously accepted and then
  silently ignored are now rejected with a warning. If you were passing a
  malformed `minDate`, `maxDate` or `disableDates` entry, it was never taking
  effect — you will now see a message saying so.
- Dates past the end of the bundled calendar table now raise a clear
  `RangeError` rather than failing obscurely. The supported window for
  `convertToNepaliDate()` is AD 1944-01-01 to 2034-04-13, which is BS
  2000-09-17 to 2090-12-30. Dates *before* that window are not supported and
  currently return an incorrect result rather than an error.
- Minified bundle size is now about 27 KB, up from about 26 KB.

### Documentation

- Corrected the `convertToNepaliDate()` example in the API reference. It returns
  `{ year, month, date }` with a **zero-indexed** month — the documented example
  showed `day` instead of `date` and a one-indexed month.
- Clarified `selectedDatesFormat`. `'array'` and `'comma'` both produce the same
  comma-separated string; `getSelectedDates()` is the method that returns an
  actual array.
- Documented `NepaliDatePicker.isLeapYear()` and the exact supported
  conversion range, including the unsupported window below AD 1944.

### Verified

- The bundled Bikram Sambat calendar data was checked against published Nepali
  calendars and two other open-source implementations. It is correct for BS
  2081–2083, 2085 and 2088, including the contested length of Ashwin 2082.
  Jestha and Ashadh of BS 2084 remain disputed between published sources and are
  still being confirmed.
