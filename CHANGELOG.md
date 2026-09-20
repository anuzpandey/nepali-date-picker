# Changelog

All notable changes to this project are documented here.

This file is maintained in the development repository and copied to the public
repository at release time, alongside `dist/` and the docs.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
