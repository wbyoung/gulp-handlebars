'use strict';

var plugin = require('../');
var should = require('should');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
require('mocha');

var getFixture = function (filePath) {
  filePath = path.join('test', 'fixtures', filePath);
  return new gutil.File({
    path: filePath,
    cwd: path.join('test', 'fixtures'),
    base: path.dirname(filePath),
    contents: fs.readFileSync(filePath)
  });
};

var getExpectedString = function (filePath) {
  return fs.readFileSync(path.join('test', 'expected', filePath), 'utf8');
};

var fileMatchesExpected = function (file, expectedFileName) {
  String(file.contents).should.equal(getExpectedString(expectedFileName));
};

describe('gulp-ember-handlebars', function () {
  describe('plugin()', function () {

    it('should compile templates', function (done) {
      var stream = plugin();
      var basicTemplate = getFixture('Basic.hbs');

      stream.on('data', function (newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        fileMatchesExpected(newFile, 'Basic.js');
        done();
      });
      stream.write(basicTemplate);
      stream.end();
    });

    it('should trigger error handler on malformed template', function (done) {
      var stream = plugin();
      var malformedTemplate = getFixture('Malformed.hbs');

      stream.on('error', function (error) {
        done();
      });
      stream.write(malformedTemplate);
      stream.end();
    });
  });
});
