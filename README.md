# Nepali Date Picker

[![NPM Version][npm-image]][npm-url]
[![Download Count][download-count]][npm-url]

[npm-url]: https://npmjs.org/package/@anuz-pandey/nepali-date-picker
[npm-image]: https://img.shields.io/npm/v/@anuz-pandey/nepali-date-picker.svg?style=flat-square
[download-count]: https://img.shields.io/npm/dt/@anuz-pandey/nepali-date-picker.svg?style=flat-square

Lightweight, powerful JavaScript Nepali date picker with **zero dependencies**.

## ✨ Features

- 🎯 **Single & Multiple Selection** - Basic and multiple date modes
- 🌍 **Bilingual** - English & Nepali support
- 🎨 **Themeable** - 3 themes + dark mode
- 📅 **Smart Constraints** - Min/max dates, disable specific dates
- 🪂 **Lightweight** - ~26KB minified (JS only)
- 🚫 **No Dependencies** - Zero external libraries
- ⚡ **Framework Compatible** - Vue, React, Angular, Alpine, Livewire
- 🔊 **DOM Events** - Native `input`, `change`, and custom events
- 📱 **Responsive** - Works on all devices

## 🚀 Quick Start

### Installation

```bash
npm install @anuz-pandey/nepali-date-picker
```

### Basic Usage

```html
<div style="position: relative;">
  <input type="text" id="date-picker">
</div>

<script src="path/to/nepali-date-picker.bundle.js"></script>
<script>
  new NepaliDatePicker('#date-picker');
</script>
```

### With Configuration

```javascript
new NepaliDatePicker('#date-picker', {
  format: 'YYYY-MM-DD',
  mode: 'basic',              // or 'multiple'
  locale: 'np',               // or 'en'
  theme: 'flat',              // or 'soft', 'bordered'
  darkMode: false,
  minDate: '2082-01-01',
  maxDate: '2082-12-31'
});
```

### Listen to Events

```javascript
document.getElementById('date-picker').addEventListener('nepali-date-change', (e) => {
  console.log('Selected date:', e.detail.date);
  console.log('Parsed date:', e.detail.dateObject);
});
```

## 📚 Documentation

Full documentation is available in the [GitHub repository](https://github.com/anuzpandey/nepali-date-picker):

- **Quick Start** - Get started in 5 minutes
- **Installation** - NPM, CDN, and standalone options
- **API Reference** - All configuration options and methods
- **Examples** - Code samples for common use cases
- **Features** - Complete feature roadmap
- **Contributing** - How to contribute to the project

## 🎯 Common Use Cases

### Multiple Date Selection

```javascript
new NepaliDatePicker('#date-picker', {
  mode: 'multiple',
  selectedDatesFormat: 'comma'
});
```

### Date Range (Min/Max)

```javascript
new NepaliDatePicker('#date-picker', {
  minDate: '2082-01-01',
  maxDate: '2082-12-31'
});
```

### Disable Specific Dates

```javascript
new NepaliDatePicker('#date-picker', {
  disableDates: ['2082-01-26', '2082-02-19'],
  disableBeforeToday: true
});
```

### Framework Integration

Works seamlessly with Vue, React, Angular, Alpine.js, Livewire, and more. See documentation for framework-specific examples.

## 📦 Installation Methods

### NPM / Yarn / Pnpm / Bun

```bash
npm install @anuz-pandey/nepali-date-picker
# or
yarn add @anuz-pandey/nepali-date-picker
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.bundle.min.js"></script>

<!-- OR separate files -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.min.css">
<script src="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.min.js"></script>
```

### Standalone Files

[Download](https://github.com/anuzpandey/nepali-date-picker/releases/latest) the latest release and extract:

```html
<link rel="stylesheet" href="dist/nepali-date-picker.min.css">
<script src="dist/nepali-date-picker.bundle.js"></script>
```

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Report bugs** - Open an [issue](https://github.com/anuzpandey/nepali-date-picker/issues)
2. **Request features** - Describe your idea in an issue
3. **Submit code** - Fork, create a feature branch, and submit a PR
4. **Improve docs** - Help us improve documentation

See the [Contributing Guide](https://github.com/anuzpandey/nepali-date-picker/blob/main/docs/CONTRIBUTING.md) for detailed instructions.

## 📄 License

MIT License - feel free to use in your projects

## 🙌 Support

- **Issues**: [GitHub Issues](https://github.com/anuzpandey/nepali-date-picker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anuzpandey/nepali-date-picker/discussions)
- **Documentation**: [Full Docs](https://github.com/anuzpandey/nepali-date-picker/tree/main/docs)

---

**Made with ❤️ by [Anuz Pandey](https://github.com/anuzpandey)**
