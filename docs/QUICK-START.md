# Quick Start Guide

Get started with Nepali Date Picker in 5 minutes.

## Installation

```bash
npm install @anuz-pandey/nepali-date-picker
```

## Basic Usage

### HTML

```html
<div style="position: relative;">
  <input type="text" id="date-picker" placeholder="Select a date">
</div>

<script src="path/to/nepali-date-picker.bundle.js"></script>
```

### JavaScript

```javascript
// Initialize the date picker
new NepaliDatePicker('#date-picker');

// Listen for date selection
document.getElementById('date-picker').addEventListener('change', (e) => {
  console.log('Selected date:', e.target.value);
});
```

That's it! You now have a working date picker.

## Common Configuration Options

```javascript
new NepaliDatePicker('#date-picker', {
  format: 'YYYY-MM-DD',        // Date format
  locale: 'np',                 // Language: 'np' or 'en'
  theme: 'flat',                // Theme: 'flat', 'soft', 'bordered'
  darkMode: false,              // Dark mode
  closeOnDateSelect: true,      // Close after selection
});
```

## Working with Events

### Native Events

```javascript
const input = document.getElementById('date-picker');

// Input event (fires on selection)
input.addEventListener('input', (e) => {
  console.log('Input changed:', e.target.value);
});

// Change event (fires on selection)
input.addEventListener('change', (e) => {
  console.log('Date changed:', e.target.value);
});
```

### Custom Event

```javascript
const input = document.getElementById('date-picker');

input.addEventListener('nepali-date-change', (e) => {
  const { date, dateObject, mode } = e.detail;
  console.log('Date:', date);
  console.log('Parsed:', dateObject);  // { year, month, date }
  console.log('Mode:', mode);          // 'basic' or 'multiple'
});
```

## Multiple Date Selection

```javascript
new NepaliDatePicker('#date-picker', {
  mode: 'multiple',
  selectedDatesFormat: 'comma'  // 'array', 'comma', 'json', or function
});

const input = document.getElementById('date-picker');
input.addEventListener('nepali-date-change', (e) => {
  const { selectedDates } = e.detail;
  console.log('Selected dates:', selectedDates);  // ['2082-01-15', '2082-02-20']
});
```

## Disable Dates

```javascript
new NepaliDatePicker('#date-picker', {
  disableDates: ['2082-01-15', '2082-01-20'],
  disableBeforeToday: true,
  disableAfterToday: false
});
```

## Min/Max Date Constraints

```javascript
new NepaliDatePicker('#date-picker', {
  minDate: '2082-01-01',
  maxDate: '2082-12-30'
});
```

## Framework Integration

### Vue.js

```vue
<template>
  <input id="date-input" v-model="selectedDate" @change="onDateChange">
</template>

<script>
export default {
  data() {
    return { selectedDate: '' }
  },
  methods: {
    onDateChange(e) {
      console.log('Selected:', e.target.value);
    }
  },
  mounted() {
    new NepaliDatePicker('#date-input');
  }
}
</script>
```

### React

```jsx
function DatePicker() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const input = document.getElementById('date-input');
    new NepaliDatePicker('#date-input');

    input.addEventListener('change', (e) => {
      setDate(e.target.value);
    });
  }, []);

  return <input id="date-input" value={date} />;
}
```

## Next Steps

- [Full API Reference](./API.md) - All configuration options
- [Examples](./EXAMPLES.md) - More usage examples
- [Features](./FEATURES.md) - Feature roadmap
