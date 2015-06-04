# Clamp

Text clamping JS-style. Largely inspired by [Joseph Schmitt's $clamp](https://github.com/josephschmitt/Clamp.js), but largely simplified to avoid the issues that library has. 



## Usage

Initialize a `Clamp` instance on an element containing a single text node:

	new Clamp(HTMLElement, optionsObject);



## Methods

### `.render()`

Renders clamp based on current layout. Can be used to relayout if layout changes, such as on `resize`.

### `.reset()`

Resets text node to contain original content



## Options

### `lines` {Integer} (Default: `2`)

Probably the most important option. Specify how many lines you want. 

### `splitOnChars` {Array} (Default: `['.', '-', '–', '—', ' ']`)

Defines characters to split in prioritized order. Defaults to sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).

### `truncationChar` {String} (Default: `'…'`)

Character to append to truncated string. Defaults to a simple ellipsis.