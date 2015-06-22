'use strict';

/**
 * Module dependencies.
 */
var tape       = require('tape');
var postcss    = require('postcss');
var plugin     = require('../');
var pluginName = require('../package.json').name;
var fixture    = '.logo {} \n .wrapper {} \n @media (max-width: 767px) { .logo {} }';

/**
 * Tests.
 */
tape('should throw error on bad selector - string', function(t) {
	t.plan(1);

	var processOpts = {
		from: '_module.logo.css'
	};
	var pluginCb = function(file) {
		return '.logo';
	};
	var processor = postcss([plugin(pluginCb)]);

	processor
		.process(fixture, processOpts)
		.catch(function(err) {
			t.equal(err.plugin, pluginName, 'error');
		});
});

tape('should throw error on bad selector - regular expression', function(t) {
	t.plan(1);

	var processOpts = {
		from: '_module.logo.css'
	};
	var pluginCb = function(file) {
		return /^\.logo/;
	};
	var processor = postcss([plugin(pluginCb)]);

	processor
		.process(fixture, processOpts)
		.catch(function(err) {
			t.equal(err.plugin, pluginName, 'error');
		});
});
