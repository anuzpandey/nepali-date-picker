# Usage Examples

Practical examples for common use cases.

## Basic Date Picker

```javascript
// HTML
<div style="position: relative;">
  <input type="text" id="date-picker">
</div>

// JavaScript
new NepaliDatePicker('#date-picker');
```

## Multiple Date Selection

```javascript
new NepaliDatePicker('#date-picker', {
  mode: 'multiple',
  selectedDatesFormat: 'comma'
});

// Get selected dates
const input = document.getElementById('date-picker');
input.addEventListener('nepali-date-change', (e) => {
  console.log('Selected dates:', e.detail.selectedDates);
  // Output: ['2082-01-15', '2082-02-20']
});
```

### Custom Format for Multiple Selection

```javascript
new NepaliDatePicker('#date-picker', {
  mode: 'multiple',
  selectedDatesFormat: (dates) => {
    if (dates.length === 0) return '';
    if (dates.length === 1) return `${dates[0]}`;
    return `${dates.length} dates selected`;
  }
});
```

## Date Constraints (Min/Max)

```javascript
// Only allow dates within a specific range
new NepaliDatePicker('#date-picker', {
  minDate: '2082-01-01',
  maxDate: '2082-12-31',
  format: 'YYYY-MM-DD'
});
```

## Disable Specific Dates

```javascript
new NepaliDatePicker('#date-picker', {
  disableDates: [
    '2082-01-01',  // New Year (Nepali)
    '2082-02-15',  // Custom event
    '2082-03-20'   // Another event
  ]
});
```

## Disable Past/Future Dates

```javascript
// Only allow future dates
new NepaliDatePicker('#date-picker', {
  disableBeforeToday: true
});

// Only allow past dates
new NepaliDatePicker('#date-picker', {
  disableAfterToday: true
});

// Disable past, today, and future
new NepaliDatePicker('#date-picker', {
  disableBeforeToday: true,
  disableAfterToday: true
});
```

## With Different Date Formats

```javascript
// Using DD-MM-YYYY format
new NepaliDatePicker('#date-picker', {
  format: 'DD-MM-YYYY'
});

// Using DD/MM/YYYY format
new NepaliDatePicker('#date-picker', {
  format: 'DD/MM/YYYY'
});

// Using DD.MM.YYYY format
new NepaliDatePicker('#date-picker', {
  format: 'DD.MM.YYYY'
});
```

## Dark Mode

```javascript
new NepaliDatePicker('#date-picker', {
  darkMode: true,
  theme: 'soft'
});
```

## Different Themes

```javascript
// Flat theme (default)
new NepaliDatePicker('#date-picker', {
  theme: 'flat'
});

// Soft theme
new NepaliDatePicker('#date-picker', {
  theme: 'soft'
});

// Bordered theme
new NepaliDatePicker('#date-picker', {
  theme: 'bordered'
});
```

## Language & Display

```javascript
// English calendar
new NepaliDatePicker('#date-picker', {
  locale: 'en',
  daysFormat: 'ddd'  // Full day names: Sunday, Monday, etc.
});

// Nepali calendar
new NepaliDatePicker('#date-picker', {
  locale: 'np',
  daysFormat: 'dd'   // Short day names: आइत, सोम, etc.
});
```

## Inline Calendar

```javascript
new NepaliDatePicker('#date-container', {
  inline: true,
  mode: 'multiple'
});
```

## Position Options

```javascript
// Position left (default)
new NepaliDatePicker('#date-picker', {
  position: 'left'
});

// Position right
new NepaliDatePicker('#date-picker', {
  position: 'right'
});

// Position center
new NepaliDatePicker('#date-picker', {
  position: 'center'
});
```

## Mark Holidays

```javascript
// Mark weekends
new NepaliDatePicker('#date-picker', {
  markHolidays: true,
  holidays: ['Saturday', 'Sunday']
});

// Mark multiple days
new NepaliDatePicker('#date-picker', {
  markHolidays: true,
  holidays: ['Friday', 'Saturday', 'Sunday']
});
```

## Event Handling

### Native Events

```javascript
const input = document.getElementById('date-picker');

input.addEventListener('input', (e) => {
  console.log('Input event:', e.target.value);
});

input.addEventListener('change', (e) => {
  console.log('Change event:', e.target.value);
});
```

### Custom Event with Details

```javascript
input.addEventListener('nepali-date-change', (e) => {
  const { date, dateObject, mode, selectedDates } = e.detail;

  console.log('Date:', date);
  console.log('Parsed:', dateObject);
  // { year: 2082, month: 1, date: 15 }

  console.log('Mode:', mode);
  // 'basic' or 'multiple'

  if (mode === 'multiple') {
    console.log('All selected:', selectedDates);
  }
});
```

## Multiple Pickers on Same Page

```javascript
// Each input can have independent configuration
new NepaliDatePicker('#date-from', {
  label: 'From Date',
  format: 'YYYY-MM-DD'
});

new NepaliDatePicker('#date-to', {
  label: 'To Date',
  minDate: '2082-01-01',
  maxDate: '2082-12-31'
});

// Handle separately
document.getElementById('date-from').addEventListener('change', (e) => {
  console.log('From date:', e.target.value);
});

document.getElementById('date-to').addEventListener('change', (e) => {
  console.log('To date:', e.target.value);
});
```

## Age Verification

```javascript
// Only allow users 18+ years old
const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

// Convert to Nepali date (simplified example)
new NepaliDatePicker('#birth-date', {
  maxDate: '2064-01-01',  // Adjust to 18 years ago in Nepali calendar
  format: 'YYYY-MM-DD'
});
```

## Event Registration Form

```html
<form>
  <div class="form-group">
    <label for="event-date">Event Date:</label>
    <div style="position: relative;">
      <input type="text" id="event-date" required>
    </div>
  </div>
  <button type="submit">Register</button>
</form>

<script>
  const eventDatePicker = new NepaliDatePicker('#event-date', {
    minDate: '2082-03-01',  // Event registration starts
    maxDate: '2082-03-31',  // Event registration ends
    disableDates: ['2082-03-15'],  // Holiday
    format: 'YYYY-MM-DD'
  });

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDate = document.getElementById('event-date').value;
    console.log('Registered for:', selectedDate);
  });
</script>
```

## Date Range Selection (Future Feature)

This is planned for a future release. Currently use min/max dates:

```javascript
new NepaliDatePicker('#date-picker', {
  minDate: '2082-01-01',
  maxDate: '2082-12-31'
});
```

## Programmatic Control

```javascript
const picker = new NepaliDatePicker('#date-picker', {
  mode: 'multiple'
});

// Set dates programmatically
picker.setSelectedDates(['2082-01-15', '2082-02-20']);

// Get selected dates
const dates = picker.getSelectedDates();

// Get formatted dates
const formatted = picker.getSelectedDatesFormatted();

// Clear selections
picker.clearSelection();

// Update constraints
picker.setMinDate('2082-01-01');
picker.setMaxDate('2082-12-31');
```

---

For more examples, check the [demo pages](../public/) in the repository.
