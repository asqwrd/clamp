'use strict';

// ------------- Dependencies --------------
var extend = require('extend');
var computedStyle = require('computed-style/dist/computedStyle.commonjs');



// --------------- Defaults ----------------
var defaults = {
	lines: 2,
	splitOnChars: ['.', '-', '–', '—', ' '], // Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
	truncationChar: '…'
};



// ------------ Private methods ------------
/**
 * Gets the line height.
 *
 * @param {HTMLElement} element. Element containing the text node to clamp.
 *
 * @returns {Number} Line height in pixels
 */
function getLineHeight(element) {
	var lineHeight = computedStyle(element, 'line-height');
	if (lineHeight == 'normal') {
		// Normal line heights vary from browser to browser. The spec recommends
		// a value between 1.0 and 1.2 of the font size. Using 1.2 to be safe.
		lineHeight = parseInt(computedStyle(element, 'font-size')) * 1.2;
	}
	return parseInt(lineHeight);
}

/**
 * Gets the maximum height of the element based on number of lines
 *
 * @param {HTMLElement} element. Element containing the text node to clamp.
 * @param {Integer} lines. Number of lines
 *
 * @returns {Number} Calculated height size
 */
function getMaxHeight(element, lines) {
	var lineHeight = getLineHeight(element);
	return lineHeight * lines;
}



// -------------- Constructor --------------
/**
 * Clamps a text node. Greatly inspired by [$clamp](https://github.com/josephschmitt/Clamp.js), but without the `auto` option, as it leads to way too many bugs.
 *
 * @param {HTMLElement} element. Element containing the text node to clamp.
 * @param {Object} options. Options to pass to the clamper.
 *
 * @returns {Object} Instance of Clamp
 */
function Clamp(element, options) {
	this.options = extend({}, defaults, options);
	this.element = element;

	if (element.children.length) {
		throw "Clamp.js: Elements with children not supported.";
	}

	if (element.childNodes.length > 1) {
		throw "Clamp.js: Elements with multiple text nodes not supported.";
	}

	this.text = element.childNodes[0] && element.childNodes[0].nodeValue;

	this.render();

	return this;
}



// ------------ Public methods -------------
/**
 * Reset element to full text
 *
 * @returns {Object} Current instance of Clamp
 */
Clamp.prototype.reset = function() {
	if (this.element.childNodes[0]) {
		this.element.childNodes[0].nodeValue = this.text;
	}

	return this;
};

/**
 * Resets and renders the clamp. Useful to call on UI updates, such as resize (but remember to debounce repeated events).
 *
 * @returns {Object} Current instance of Clamp
 */
Clamp.prototype.render = function() {
	// Reset to full text
	this.reset();
	this.maxHeight = getMaxHeight(this.element, this.options.lines);

	if (this.maxHeight < this.element.clientHeight) {
		this.truncate();
	}

	return this;
};

/**
 * Shorten text until it fits!
 *
 * @returns {Object} Current instance of Clamp
 */
Clamp.prototype.truncate = function(truncateSettings) {
	var nodeValue = this.element.childNodes[0].nodeValue.replace(this.options.truncationChar, '');

	// First run, create settings
	if (!truncateSettings) { // Use parameter, it's easier to minify
		truncateSettings = {
			splitOnChars: this.options.splitOnChars.slice(0), // Local copy of trunc chars
			chunks: null,
			lastChunk: null
		};
		truncateSettings.splitOnChar = truncateSettings.splitOnChars[0];
	}

	// Create chunks
	if (!truncateSettings.chunks) {

		// If there are more characters to try, grab the next one
		if (truncateSettings.splitOnChars.length > 0) {
			truncateSettings.splitChar = truncateSettings.splitOnChars.shift();

		// No characters to chunk by. Go character-by-character
		} else {
			truncateSettings.splitChar = '';
		}

		truncateSettings.chunks = nodeValue.split(truncateSettings.splitChar);
	}

	// If there are chunks left to remove, remove the last one and see if the nodeValue fits.
	if (truncateSettings.chunks.length > 1) {
		truncateSettings.lastChunk = truncateSettings.chunks.pop();
		this.element.childNodes[0].nodeValue = truncateSettings.chunks.join(truncateSettings.splitChar) + this.options.truncationChar;

	// No more chunks can be removed using this character
	} else {
		truncateSettings.chunks = null;
	}

	// It fits!
	if (this.element.clientHeight <= this.maxHeight) {
		return this;
	}

	// Recursively truncate
	this.truncate(truncateSettings);

	return this;
};



// ---------------- Export -----------------
module.exports = Clamp;