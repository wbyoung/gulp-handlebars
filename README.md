# gulp-emblem [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![Dependency Status][gemnasium-image]][gemnasium-url]
> [Emblem.js][emblem-url] plugin for gulp
> ...a concise, beautiful, and fully compatible templating alternative for Handlebars.js.

## Usage

First, install `gulp-emblem` as a development dependency:

```shell
npm install --save-dev gulp-emblem
```

Then, add it to your `gulpfile.js`:

```javascript
var emblem = require('gulp-emblem');

gulp.task('templates', function(){
  gulp.src(['client/templates/*.em'])
    .pipe(emblem({
      namespace: 'MyApp.templates',
      outputType: 'hybrid'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js/'));
});
```

## API

### emblem(options)

#### options.namespace
Type: `String`
Default: `templates`

The namespace in which the precompiled templates will be assigned. Use dot notation (e.g. `App.Templates`) for nested namespaces or false to declare templates in the global namespace.

#### options.outputType
Type: `String`
Default: `browser`

The desired output type. One of the following:

* `browser` - Produce plain JavaScript files for the browser
* `hybrid` - Produce Node modules that can optionally be used on the frontend
* `node` - Produce Node modules
* `amd` - Produce AMD modules
* `commonjs` - Produce CommonJS modules
* `bare` - Return an unmolested function definition

#### options.declareNamespace
Type: `Boolean`
Default: `true`

If true, non-destructively declare all parts of the namespace. This option is only necessary when `options.type` is `browser` or `hybrid`.

For example, if the namespace is `MyApp.Templates` and a template is named `App.Header.hbs`, the following declaration will be present in the output file for that template:

```javascript
this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["App"] = this["MyApp"]["templates"]["App"] || {};
this["MyApp"]["templates"]["App"]["Header"] = function () {};
```

When processing multiple templates under a given namespace, this will result in duplicate declarations. That is, the non-destructive declaration of the namespace will be repeated for each template compiled.

#### options.processName
Type: `Function`
Default: Strip file extension

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object. By default, the filename minus the extension is used.

If this function returns a string containing periods (not including the file extension), they will be represented as a sub-namespace. See `options.declareNamespace` for an example of the effect.

#### options.compilerOptions
Type: `Object`

Compiler options to pass to `Handlebars.precompile()`.

## Attributions
This project is a fork of [`gulp-handlebars`](https://github.com/lazd/gulp-handlebars) by [lazd](https://github.com/lazd).
[Emblem.js][emblem-url] is a concise, beautiful, and fully compatible templating alternative for Handlebars.js.


[travis-url]: http://travis-ci.org/Aulito/gulp-emblem
[travis-image]: https://secure.travis-ci.org/Aulito/gulp-emblem.png?branch=master
[npm-url]: https://npmjs.org/package/gulp-emblem
[npm-image]: https://badge.fury.io/js/gulp-emblem.png
[gemnasium-image]: https://gemnasium.com/Aulito/gulp-emblem.png
[gemnasium-url]: https://gemnasium.com/Aulito/gulp-emblem

[emblem-url]: http://emblemjs.com/
