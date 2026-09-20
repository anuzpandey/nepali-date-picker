# Changelog

All notable changes to this project are documented here.

This file is maintained in the development repository and copied to the public
repository at release time, alongside `dist/` and the docs.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
