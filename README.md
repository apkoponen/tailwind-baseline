# Tailwind Baseline

[![NPM version](https://img.shields.io/npm/v/tailwind-baseline.svg?style=flat-square)](https://npmjs.org/package/tailwind-baseline)
[![Build Status](https://img.shields.io/travis/apkoponen/tailwind-baseline/master.svg?style=flat-square)](https://travis-ci.com/github/apkoponen/tailwind-baseline) [![Coverage Status](https://img.shields.io/codecov/c/github/apkoponen/tailwind-baseline/master.svg?style=flat-square)](https://codecov.io/gh/apkoponen/tailwind-baseline/branch/master)

This package provides a Tailwind CSS plugin that allows you to align text to baseline.

## Installation

```bash
npm install tailwind-baseline
```

## Configuration

This plugin uses the `baseline` key in your Tailwind config’s `theme` object to generate aspect baseline utilities. Here is an example:

```js
// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      },
      baseline: {
        fonts: {
          sans: {
            descenderHeightScale: 0.136,
            capHeight: 0.723,
          },
          serif: {
            descenderHeightScale: 0.144,
            capHeight: 0.7462,
          },
          mono: {
            descenderHeightScale: 0.111,
            capHeight: 0.7077,
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("tailwind-baseline")],
};
```

The `fonts` theme object is a dictionary where the key is the fontFamily, and the value is a dictionary.
The value dictionary has two keys, `descenderHeightScale` and `capHeight`, that take decimal numbers as values.

### Defining `descenderHeightScale`

Descender height is the space between the baseline of your font and the bounding box when the line height is 1. 
You can measure `descenderHeightScale` by setting line-height to 1 and measuring how much space there is between
the bottom of the letter "x" and the bottom of the bounding box.

For example, the `descenderHeightScale` for the Inter font is 0.136, which means that when font-size is 1000px
and line-height is 1 there is 136px between the bottom of the letter x and the bounding box.

### Defining `capHeight`

Cap height is the height of capital letters in comparison to the bounding box when the line-height is 1. 
The easiest way to measure a cap height of a Google Font is by using this 
[Codepen](https://codepen.io/sebdesign/pen/EKmbGL).

For example, the `capHeight` for the Inter font is 0.723, which means that when font-size is 1000px
and line-height is 1 the height of the letter "H" is 723px.

## Usage

You can align the text of an element to baseline by adding the class `baseline` to the same element, 
where you define the line-height (e.g. `leading-2`). You can define the font-family (e.g. `font-sans`) 
and font-size (e.g. `text-sm`) anywhere. 

```html
 <div class="font-sans text-sm">
    <p class="leading-2 baseline">
      Hello! This text is aligned on the baseline.
    </p>
</div>
```

## Debugging Vertical Rhythm

This package includes two classes for debugging whether your design follows a consistent vertical rhythm. 

- `.baseline-debug-stripe` adds green/light-green stripes to background of the element.
- `.baseline-debug-line` adds red lines to background of the element.

## License

MIT © [Ari-Pekka Koponen](https://github.com/apkoponen)
