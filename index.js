'use strict';

var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var compiler = require('ember-template-compiler');

module.exports = function(options) {
  var opts = options || {};
  var compilerOptions = opts.compilerOptions || {};
  return through(function(file) {
    if (file.isNull()) return this.queue(file); // pass along
    if (file.isStream()) return this.emit('error', new gutil.PluginError('gulp-ember-emblem', 'Streaming not supported'));
    var contents = file.contents.toString();
    var compiled = null;
    try { compiled = compiler.precompile(contents, compilerOptions).toString(); }
    catch (err) { this.emit('error', err); }
    if (compiled) {
      file.contents = new Buffer(compiled);
      file.path = gutil.replaceExtension(file.path, '.js');
      file.defineModuleOptions = {
        require: { Ember: 'ember' },
        context: {
          emberHandlebars: 'Ember.Handlebars.template(<%= contents %>)'
        },
        wrapper: '(Ember.TEMPLATES[\'<%= name %>\'] = <%= emberHandlebars %>)'
      };
      this.queue(file);
    }
  });
};
