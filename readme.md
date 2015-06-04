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



## Contact, attribution & contribution

All code here is either created by me or shamelessly stolen from other great libraries. I've tried to attribute authors whenever relevant. Contribute by simply forking your own repository and commit away. 

I will review pull requests as quickly as I can.

If anything leaves a bad taste in your mouth, contact info can be found at [ljd.dk](http://ljd.dk).



## License

_Clamp_ is licensed under [WTFPL](http://www.wtfpl.net/).