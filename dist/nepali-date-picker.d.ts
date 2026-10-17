// Type definitions for @anuz-pandey/nepali-date-picker
// Project: https://github.com/anuzpandey/nepali-date-picker
//
// Hand-written. src/__tests__/types.test.js checks that the members declared
// here match the runtime class, and `bun run typecheck` compiles this file
// together with types/usage.ts. Keep all three in step when the API changes.

export as namespace NepaliDatePicker;
export = NepaliDatePicker;

declare class NepaliDatePicker {
    /**
     * @param selectors A CSS selector string matching the input element(s) to
     *                  attach to. Pass a selector, not an element.
     * @param config    Optional configuration.
     */
    constructor(selectors: string, config?: NepaliDatePicker.Options);

    /** Unique id for this instance, useful when debugging several pickers. */
    readonly instanceId: string;

    /**
     * Today's **Gregorian** date, captured when the picker was constructed.
     *
     * Note this is the only one of these properties in the AD calendar — the
     * three below are Bikram Sambat, so `today.getFullYear()` and
     * {@link currentYear} deliberately disagree (2026 vs 2083).
     *
     * These four are declared `readonly` because they are for reading. At
     * runtime they are ordinary properties, and assigning to the three BS ones
     * before the picker first opens does change which month it opens on — but
     * that is a side effect of how the calendar initialises, not supported API.
     */
    readonly today: Date;

    /** Today's **Bikram Sambat** year, e.g. `2083`. */
    readonly currentYear: number;

    /**
     * Today's **Bikram Sambat** month, **0-indexed**: 0 = Baishakh … 11 = Chaitra.
     *
     * Same indexing as the `month` returned by
     * {@link NepaliDatePicker.convertToNepaliDate} and carried on
     * `event.detail.dateObject`, and one less than the month in every
     * `YYYY-MM-DD` string the picker produces. Add 1 before comparing the two.
     */
    readonly currentMonth: number;

    /** Today's **Bikram Sambat** day of the month, 1–32. */
    readonly currentDay: number;

    /**
     * Selected dates as normalised `YYYY-MM-DD` strings, in selection order.
     * Always empty unless `mode` is `'multiple'`. Returns a copy.
     */
    getSelectedDates(): string[];

    /**
     * The selection rendered according to `selectedDatesFormat`.
     *
     * Always a **string**, whichever format is configured — `'array'` and
     * `'comma'` both produce `'2082-01-15, 2082-01-20'`. Use
     * {@link getSelectedDates} for an actual array. Empty string outside
     * `'multiple'` mode or when nothing is selected.
     */
    getSelectedDatesFormatted(): string;

    /**
     * Replace the selection. Entries that are not `YYYY-MM-DD` are dropped.
     * No effect outside `'multiple'` mode.
     */
    setSelectedDates(dates: string[]): void;

    /** Clear the selection and the input. No effect outside `'multiple'` mode. */
    clearSelection(): void;

    /** Set the earliest selectable date, or `null` to remove the constraint. */
    setMinDate(date: string | null): void;

    /** Set the latest selectable date, or `null` to remove the constraint. */
    setMaxDate(date: string | null): void;

    /** The configured minimum, exactly as it was supplied. */
    getMinDate(): string | null;

    /** The configured maximum, exactly as it was supplied. */
    getMaxDate(): string | null;

    /**
     * The selected range, as normalised `YYYY-MM-DD` strings.
     *
     * `end` is `null` while only the start has been picked. Returns a fresh
     * object each time. Always `{ start: null, end: null }` outside
     * `'range'` mode.
     */
    getRange(): NepaliDatePicker.DateRange;

    /**
     * Set the range. Both arguments are `YYYY-MM-DD`, matching
     * {@link setSelectedDates} rather than the picker's `format`.
     *
     * `setRange(start)` leaves it half-open — the state between the two
     * clicks. `setRange(null)` clears it. An `end` before `start` is refused
     * with a warning rather than silently swapped. No effect outside
     * `'range'` mode.
     */
    setRange(start: string | null, end?: string | null): void;

    /**
     * Internal. Called by the shared document click listener so a click can be
     * routed to the instance owning the calendar. Not intended to be called
     * directly.
     */
    handleCellClick(event: MouseEvent, apCardElement: HTMLElement): void;

    /**
     * Convert a Gregorian (AD) date to Bikram Sambat (BS).
     *
     * Note the asymmetry: the `month` **argument** is 1-indexed (1 = January),
     * but `month` in the result is **0-indexed** (0 = Baishakh), and the day
     * comes back as `date`, not `day`.
     *
     * Supports AD 1944-01-01 to 2034-04-13, the span of the bundled calendar
     * table. Anything outside that, or a malformed date, throws a `RangeError`.
     */
    static convertToNepaliDate(
        year: number | string,
        month: number | string,
        day: number | string
    ): NepaliDatePicker.NepaliDate;

    /**
     * Convert a Bikram Sambat (BS) date to Gregorian (AD).
     *
     * Unlike {@link NepaliDatePicker.convertToNepaliDate}, both the `bsMonth`
     * **argument** and `month` in the result are **1-indexed** - matching the
     * `YYYY-MM-DD` strings the picker itself produces.
     *
     * Round-tripping the result of `convertToNepaliDate` therefore needs `+ 1`:
     *
     * ```ts
     * const bs = NepaliDatePicker.convertToNepaliDate(2025, 4, 14);
     * NepaliDatePicker.convertToEnglishDate(bs.year, bs.month + 1, bs.date);
     * ```
     *
     * Supports BS 2000-09-17 to 2090-12-30, the same window as
     * `convertToNepaliDate` seen from the other side. Anything outside it, or a
     * day the BS month does not have, throws a `RangeError`.
     */
    static convertToEnglishDate(
        bsYear: number | string,
        bsMonth: number | string,
        bsDay: number | string
    ): NepaliDatePicker.EnglishDate;

    /** Whether a Gregorian year is a leap year. */
    static isLeapYear(year: number | string): boolean;
}

declare namespace NepaliDatePicker {
    /** Date formats accepted for input and produced for output. */
    type DateFormat =
        | 'YYYY-MM-DD'
        | 'YYYY/MM/DD'
        | 'YYYY.MM.DD'
        | 'DD-MM-YYYY'
        | 'DD/MM/YYYY'
        | 'DD.MM.YYYY';

    /** `'np'` renders Nepali numerals and month names, `'en'` renders English. */
    type Locale = 'np' | 'en';

    type Theme = 'flat' | 'soft' | 'bordered';

    type Position = 'left' | 'right' | 'center';

    /** `'ddd'` full name, `'dd'` short name, `'d'` single letter. */
    type DaysFormat = 'ddd' | 'dd' | 'd';

    type Mode = 'basic' | 'multiple' | 'range';

    type DayName =
        | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday'
        | 'Thursday' | 'Friday' | 'Saturday';

    /**
     * How a multiple selection is rendered by {@link NepaliDatePicker.getSelectedDatesFormatted}
     * and written into the input. `'array'` and `'comma'` behave identically.
     */
    type SelectedDatesFormat =
        | 'array'
        | 'comma'
        | 'json'
        | ((dates: string[]) => string);

    /** A Bikram Sambat date, with a zero-indexed month. */
    interface NepaliDate {
        year: number;
        /** 0 = Baishakh ... 11 = Chaitra. */
        month: number;
        date: number;
    }

    /**
     * What a preset resolves to: a Gregorian `Date`, a Bikram Sambat
     * `YYYY-MM-DD` string, or two of either for a range or a multiple
     * selection.
     */
    type PresetValue = Date | string | Array<Date | string>;

    /** A shortcut button in the picker's footer. */
    interface DatePreset {
        label: string;
        /** The date, or a function returning it — evaluated on each click. */
        value: PresetValue | (() => PresetValue);
        /**
         * Close the calendar after this preset is used. Defaults to the
         * picker's `closeOnDateSelect`. Set `false` for a jump-to preset you
         * expect the user to adjust from.
         */
        closeOnSelect?: boolean;
    }

    interface TodayButtonOptions {
        /** Default `true` when the object form is used at all. */
        enabled?: boolean;
        /**
         * Overrides the label. Defaults to `'आज'` under `locale: 'np'` and
         * `'Today'` under `'en'`.
         */
        label?: string | null;
        /**
         * Close the calendar after Today is used. Defaults to the picker's
         * `closeOnDateSelect`.
         */
        closeOnSelect?: boolean;
    }

    interface EnglishDatesOptions {
        /** Default `true` when the object form is used at all. */
        enabled?: boolean;
        /**
         * The Gregorian span under the header, e.g. `October/November 2025`.
         * A Bikram Sambat month never lines up with a Gregorian one, so it is
         * a range rather than a name. Default `true`.
         */
        monthLabel?: boolean;
        /** A rule under the month span. Default `true`. */
        divider?: boolean;
    }

    /**
     * A selected range, as normalised `YYYY-MM-DD` strings.
     *
     * `end` is `null` while only the start has been picked, so a half-chosen
     * range is distinguishable from a finished one.
     */
    interface DateRange {
        start: string | null;
        end: string | null;
    }

    /** A Gregorian date, with a one-indexed month. */
    interface EnglishDate {
        year: number;
        /** 1 = January ... 12 = December. */
        month: number;
        date: number;
    }

    interface Options {
        /** Format used for the input value and for parsing. Default `'YYYY-MM-DD'`. */
        format?: DateFormat;

        /**
         * Joins the two ends in the input value in `'range'` mode.
         * Default `' - '`, giving `2082-01-05 - 2082-01-10`.
         */
        rangeSeparator?: string;

        /**
         * Close the calendar after a date is picked. Default `true`.
         *
         * In `'range'` mode the calendar closes once the **second** end is
         * picked, never after the first.
         */
        closeOnDateSelect?: boolean;

        /** Disable every date after today. Default `false`. */
        disableAfterToday?: boolean;

        /** Disable every date before today. Default `false`. */
        disableBeforeToday?: boolean;

        /** Disable today. Default `false`. */
        disableToday?: boolean;

        /** Specific dates to disable, e.g. `['2082-01-26']`. Default `[]`. */
        disableDates?: string[];

        /** Format of `disableDates` if it differs from `format`. */
        disabledDatesFormat?: DateFormat | null;

        /** Mark the days listed in `holidays`. Default `true`. */
        markHolidays?: boolean;

        /** Days to mark as holidays. Default `['Saturday']`. */
        holidays?: DayName[];

        /** Highlight today in the calendar. Default `true`. */
        indicateCurrentDate?: boolean;

        /** Pre-fill the input with today's date. Default `false`. */
        setCurrentDate?: boolean;

        /** Where the calendar opens relative to the input. Default `'left'`. */
        position?: Position;

        /** Day-name length in the header. Default `'dd'`. */
        daysFormat?: DaysFormat;

        /** Language for numerals and names. Default `'np'`. */
        locale?: Locale;

        /** Visual style. Default `'flat'`. */
        theme?: Theme;

        /**
         * A **Today** button in a footer under the calendar.
         *
         * `true` for the defaults, or an object to configure it. Disabled when
         * today is not selectable — outside `minDate`/`maxDate`, or covered by
         * `disableDates`/`disableToday`. Default `false`.
         *
         * ```ts
         * todayButton: true
         * todayButton: { label: 'Go to today', closeOnSelect: false }
         * ```
         */
        todayButton?: boolean | TodayButtonOptions;

        /**
         * Shortcut buttons in the footer, rendered before Today.
         *
         * ```ts
         * presets: [
         *   { label: 'Tomorrow',  value: () => addDays(new Date(), 1) },
         *   { label: 'In a week', value: () => addDays(new Date(), 7) },
         * ]
         * ```
         *
         * A malformed entry is skipped with a console warning rather than
         * throwing. Labels are escaped before rendering.
         */
        presets?: DatePreset[];

        /**
         * Show Gregorian dates alongside the Bikram Sambat ones: the day
         * number under each date, and the month span under the header.
         *
         * `true` for the defaults, or an object to configure it. Default
         * `false`.
         *
         * ```ts
         * englishDates: true
         * englishDates: { monthLabel: false, divider: false }
         * ```
         *
         * The cell grows to fit both numbers, so the calendar is wider than it
         * would otherwise be. Days with no Gregorian equivalent — before the
         * 1944 conversion anchor — render without a second number.
         */
        englishDates?: boolean | EnglishDatesOptions;

        /**
         * Tighter cells and spacing at the same proportions — the cell drops
         * from 2.5rem to 2rem and everything around it scales with it, rather
         * than only the padding shrinking. Default `false`.
         *
         * Implemented by overriding sizing custom properties on `.ap-card`, so
         * it can be adjusted or imitated from your own stylesheet.
         */
        compact?: boolean;

        /** Use the dark colour scheme. Default `false`. */
        darkMode?: boolean;

        /**
         * Render the calendar inline inside the target element instead of
         * opening it on click. Default `false`.
         */
        inline?: boolean;

        /** Single or multiple date selection. Default `'basic'`. */
        mode?: Mode;

        /** How a multiple selection is rendered. Default `'array'`. */
        selectedDatesFormat?: SelectedDatesFormat;

        /** Earliest selectable BS date. Default `null`. */
        minDate?: string | null;

        /** Latest selectable BS date. Default `null`. */
        maxDate?: string | null;

        /** Format of `minDate` if it differs from `format`. */
        minDateFormat?: DateFormat | null;

        /** Format of `maxDate` if it differs from `format`. */
        maxDateFormat?: DateFormat | null;
    }

    /** Why the value changed, when it was not a plain date selection. */
    type ChangeReason = 'manual-clear' | 'min-date-violation' | 'max-date-violation';

    /**
     * Payload of the `nepali-date-change` event.
     *
     * The input also emits native `input` and `change` events, so framework
     * bindings update without listening for this one.
     */
    interface NepaliDateChangeDetail {
        /** The input's new value, formatted per `format`. Empty when cleared. */
        date: string;
        /** Present when a single date was picked. */
        dateObject?: NepaliDate;
        /** Present in `'range'` mode: both ends, `end` null mid-selection. */
        range?: DateRange;
        /**
         * Present in `'range'` mode: dates inside the range that cannot
         * themselves be selected, because of `disableDates` or `disableToday`.
         * Empty when the span is clear. The range is still committed — it is
         * reported so you can decide what to do about it.
         */
        disabledInRange?: string[];
        mode?: Mode;
        /** Present in `'multiple'` mode: every selected date. */
        selectedDates?: string[];
        /** Present when the change was not a selection. */
        reason?: ChangeReason;
    }

    type NepaliDateChangeEvent = CustomEvent<NepaliDateChangeDetail>;
}

declare global {
    interface HTMLElementEventMap {
        'nepali-date-change': NepaliDatePicker.NepaliDateChangeEvent;
    }
}
