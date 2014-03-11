# gulp-ember-handlebars [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![NPM](https://nodei.co/npm/<package>.png)](https://nodei.co/npm/gulp-ember-handlebars/)
> Ember Handlebars plugin for gulp 3

## Usage

First, install _gulp-ember-handlebars_ and [gulp-define-module] as development dependencies:

```shell
npm install --save-dev gulp-ember-handlebars gulp-define-module
```

Then, add it to your `gulpfile.js`:

```javascript
var emberHandlebars = require('gulp-ember-handlebars');

gulp.task('templates', function(){
  gulp.src(['app/templates/*.hbs'])
    .pipe(emberHandlebars())
    .pipe(defineModule('node'))
    .pipe(gulp.dest('build/templates/'));
});
```

gulp-ember-handlebars outputs a raw handlebars function, so it is likely that you will want to use [gulp-define-module] to make the handlebars template available via a specific namespace or for use with a module system. For additional usage examples, we recommend that you visit [gulp-handlebars] and [gulp-define-module].


## Compiling to various module systems

[gulp-define-module] can be used to prepare the output for use with common module systems such as AMD, Node, and CommonJS. Please see the documentation for more details on how to use that in a gulp chain.

gulp-ember-handlebars makes the following available for use in the [define-module wrapper](https://github.com/wbyoung/gulp-define-module#optionswrapper):

 - `emberHandlebars`: The handlebars template fully wrapped (`Ember.Handlebars.template(<%= contents %>)`).


## API

### emberHandlebars(options)

### options.compilerOptions
Type: `Object`

Compiler options to pass to `Ember.Handlebars.precompile()`.


[travis-url]: http://travis-ci.org/fuseelements/gulp-ember-handlebars
[travis-image]: https://secure.travis-ci.org/fuseelements/gulp-ember-handlebars.png?branch=master
[npm-url]: https://npmjs.org/package/gulp-ember-handlebars
[npm-image]: https://badge.fury.io/gh/fuseelements%2Fgulp-ember-handlebars.png

[gulp-handlebars]: https://github.com/lazd/gulp-handlebars
[gulp-define-module]: https://github.com/wbyoung/gulp-define-module
