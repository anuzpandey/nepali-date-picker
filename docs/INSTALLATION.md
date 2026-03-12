# Installation Guide

## NPM / Yarn / Pnpm / Bun

Install the package from NPM registry:

```bash
npm install @anuz-pandey/nepali-date-picker
# Or Yarn
yarn add @anuz-pandey/nepali-date-picker
# Or Pnpm
pnpm add @anuz-pandey/nepali-date-picker
# Or Bun
bun add @anuz-pandey/nepali-date-picker
```

Then import in your project:

```javascript
// ES6 Modules
import NepaliDatePicker from '@anuz-pandey/nepali-date-picker'

// CommonJS
const NepaliDatePicker = require('@anuz-pandey/nepali-date-picker')
```

## Non-Module Environments (Browser)

### Option 1: Download & Use Local Files

1. [Download](https://github.com/anuzpandey/nepali-date-picker/releases/latest) the latest release
2. Extract the zip file
3. Copy files from `dist` folder to your project
4. Include in HTML:

```html
<!-- Add to head -->
<link rel="stylesheet" href="path/to/nepali-date-picker.min.css">

<!-- Add to body end -->
<script src="path/to/nepali-date-picker.bundle.js"></script>
```

### Option 2: Standalone Bundle (Single Script)

```html
<!-- Add to the end of body section -->
<script src="dist/nepali-date-picker.bundle.js"></script>
```

The date picker will be available as `window.NepaliDatePicker`

### Option 3: Separate JS and CSS Files

```html
<!-- Add to the head section -->
<link rel="stylesheet" href="dist/nepali-date-picker.min.css">

<!-- Add to the end of body section -->
<script src="dist/nepali-date-picker.min.js"></script>
```

## CDN

Use jsDelivr CDN for instant access:

```html
<!-- Bundle (JS + CSS) -->
<script src="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.bundle.min.js"></script>

<!-- OR Separate Files -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.min.css">
<script src="https://cdn.jsdelivr.net/npm/@anuz-pandey/nepali-date-picker/dist/nepali-date-picker.min.js"></script>
```

## HTML Structure Requirement

**Important:** The input field must be wrapped in a container with `position: relative`:

```html
<!-- ✅ Correct -->
<div style="position: relative;">
  <input type="text" id="date-picker">
</div>

<!-- Or with CSS class -->
<div class="relative">
  <input type="text" id="date-picker">
</div>
```

Without the relative positioning, the calendar popup will not align correctly with the input field.

## Next Steps

- [Quick Start](./QUICK-START.md) - Get started in 5 minutes
- [API Reference](./API.md) - Configuration options
- [Examples](./EXAMPLES.md) - Usage examples
