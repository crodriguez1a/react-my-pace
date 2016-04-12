var httpMock = require('./httpMock/server');
var _ = require('lodash');

var developmentTasks = [
  'browserify:common',
  'jscs',
  // 'eslint', TODO
  'template:common',
  'copy:common',
  'sass:common',
  'postcss',
  'concat:common'
];

var productionTasks = _.without(developmentTasks.concat([
  'uglify:common',
  'htmlmin:common',
  'copy:prod'
]), 'jscs');

var testingTasks = developmentTasks.concat([
  'copy:tests',
  'concat:tests',
  'browserify:tests'
]);

var commonConcat   = [
  'bower_components/**/*.js',
  'vendor/**/*.js',
  '!bower_components/qunit/**/*.js',
  '!bower_components/qunit-once/**/*.js'
];

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.config('env', grunt.option('env') || process.env.GRUNT_ENV || 'development');
  grunt.initConfig({

    // Ensure that esnext features are backwards compatible
    browserify: {
      common: {
        options: {
          'transform': [
            [ 'babelify',
              {
                'presets': ['es2015', 'react'],
                'plugins': ['transform-class-properties']
              }
            ]
          ]
        },
        files: {
          'build/assets/app.js' : 'app/app.js',
        }
      },
      tests: {
        options: {
          transform: [
            [ 'babelify',
              {
                'presets': ['react', 'babel-preset-es2015']
              }
            ]
          ]
        },
        files: {
          'tests/assets/tests.js' : 'tests/tests.js'
        }
      }
    },

    // Compile css
    sass: {
      common: {
        options: {
          style: 'compressed',
          sourcemap: 'inline'
        },
        files: {
          'build/assets/app.min.css': 'app/styles/app.scss',
          'build/assets/bulma.min.css': 'bower_components/bulma/bulma.sass',
          'build/assets/vendor.min.css': ['vendor/styles/vendor.scss']
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps

        // or
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'build/assets/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'build/assets/*.css'
      }
    },

    // Flatten js
    concat: {
      options: {
        separator: ';'
      },
      common: {
        files: {
          'build/assets/vendor.js': commonConcat
        }
      },
      tests: {
        files: {
          'tests/assets/vendor.js': commonConcat
        }
      }
    },

    // JSCS
    jscs: {
      src: "app/**/*.js",
      options: {
        config: ".jscsrc",
        esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        fix: true, // Autofix code style violations when possible.
        requireCurlyBraces: [ "if" ]
      }
    },

    // uglify / minify
    uglify: {
      options: {
        mangle: {
          except: [ /* Globals */ ]
        }
      },
      common: {
        files: {
          'build/assets/app.min.js': ['build/assets/app.js'],
          'build/assets/vendor.min.js': ['build/assets/vendor.js']
        }
      }
    },

    // Compile template
    template : {
      common: {
        options: {
          data: {
            env: grunt.config('env'),
          }
        },
        files: {
          'build/index.html': ['app/index.tpl']
        }
      }
    },

    //Minify HTML
    htmlmin: {
      common: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },

    // Test with QUnit
    qunit: {
      all: ['tests/**/*.html']
    },

    // Copy assets from demo
    copy: {
      common: {
        files: [
          { expand: true, flatten: true, src: ['bower_components/font-awesome/fonts/*', 'bower_components/typicons.font/src/font/*'], dest: 'build/fonts/' },
          { expand: true, flatten: true, src: ['public/assets/sounds/*'], dest: 'build/assets/sounds/' }
        ]
      },
      tests: {
        files: [
          { expand: true, cwd: 'app/utils/', src:['*.*'], dest: 'tests/utils/' },
          { expand: true, cwd: 'demo/js/', src: ['*.*'], dest: 'tests/vendor'}
        ]
      },
      prod: {
        files: [
          { expand: true, cwd: 'build/', src:['*.*'], dest: 'dist/' },
          { expand: true, cwd: 'build/assets', src:['*.*'], dest: 'dist/assets' },
          { expand: true, cwd: 'build/fonts', src:['*.*'], dest: 'dist/fonts' },
          { expand: true, cwd: 'build/assets/sounds', src:['*.*'], dest: 'dist/assets/sounds' }
        ]
      }
    },

    // Serve project
    connect: {
      server: {
        options: {
          port: 1333,
          base: {
            path: 'build'
          },
          onCreateServer: httpMock.onCreateServer,
          middleware: httpMock.middleware
        }
      },

      // Serve tests
      tests: {
        options: {
          port: 1334,
          base: './',
          options: {
            index: './tests/index.html'
          }
        }
      }
    },

    // Watch for changes
    watch: {
      all: {
        options: { livereload: 35729 },
        files: [ 'app/**/*', 'config/**/*', 'tests/**/*', 'vendor/**/*', '!tests/utils/*', '!tests/assets/*'],
        tasks: developmentTasks.concat([ 'bell' ])
      }
    }
  });

  /*
    Build Task
      Execute common tasks and all deployment tasks
  */
  grunt.registerTask('build', productionTasks.concat(['bell']));

  /*
    Serve Task
      Run local build and test servers
      Build server runs on 1333
      Test server runs on 1334
      Watch reload runs on 1337
      See README for more details
  */
  grunt.registerTask('serve', [
    'connect:server',
    // 'connect:tests',
    'watch'
  ]);
};
