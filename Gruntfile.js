var httpMock = require('./httpMock/server');

var commonTasks = [
  'browserify:common',
  //'jshint',
  //'jscs',
  'copy:common',
  'sass:common',
  'concat:common',
  //'uglify:common',
  //'copy:tests',
  //'concat:tests',
  //'browserify:tests'
];

var prod = [
  //TODO separate prod and dev builds
];

var commonConcat   = [
  'bower_components/**/*.js',
  'vendor/**/*.js',
  '!bower_components/qunit/**/*.js',
  '!bower_components/qunit-once/**/*.js'
];

var babelWhiteList = [
  'strict',
  'es6.arrowFunctions',
  'es6.modules',
  'es6.parameters.rest',
  'es6.parameters.default',
  'es6.destructuring',
  'es6.spread',
  'es6.blockScoping',
  'es6.classes',
  'es6.constants',
  'es6.properties.shorthand',
  'es6.templateLiterals',
  'es6.properties.computed'
];

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.config('env', grunt.option('env') || process.env.GRUNT_ENV || 'development');
  grunt.initConfig({

    //Ensure that esnext features are backwards compatible
    browserify: {
      common: {
        options: {
          'transform': [
            [ 'babelify',
              {
              'presets': ['react', 'babel-preset-es2015']
              }
            ]
          ]
        },
        //$ browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

        files: {
          'build/assets/app.js' : 'app/app.js',
        }
      },
      tests: {
        options: {
          transform: [
            [ 'babelify',
              {
              'whitelist': babelWhiteList
              }
            ]
          ]
        },
        files: {
          'tests/assets/tests.js' : 'tests/tests.js'
        }
      }
    },

    //TODO update to eslint
    //Run jshint on all app js files
    jshint: {
      all: ['app/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    //Run jscs on all app js files
    jscs: {
      src: "app/**/*.js",
      options: {
        config: ".jscsrc"
      }
    },

    //Compile css
    sass: {
      common: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/assets/app.min.css': 'app/styles/app.scss',
          'build/assets/vendor.min.css': 'vendor/styles/vendor.scss'
        }
      }
    },

    //Flatten js
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

    //Uglify/Minify
    uglify: {
      options: {
        mangle: {
          except: []
        }
      },
      common: {
        files: {
          'build/assets/app.min.js': ['build/assets/app.js'],
          'build/assets/vendor.min.js': ['build/assets/vendor.js']
        }
      }
    },

    //Test with QUnit
    qunit: {
      all: ['tests/**/*.html']
    },

    //Copy assets from demo
    copy: {
      common: {
        files: [
          { src: ['demo/fonts/*'], dest: 'build/assets/' }
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
          { expand: true, cwd: 'build/', src:['*.*'], dest: 'login/' },
          { expand: true, cwd: 'build/assets', src:['*.*'], dest: 'login/assets' }
        ]
      }
    },

    //Serve project
    connect: {
      server: {
        options: {
          port: 1333,
          base: {
            path: 'build'
          },
          onCreateServer : httpMock.onCreateServer,
          middleware     : httpMock.middleware
        }
      },

      //Serve tests
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

    //Watch for changes
    watch: {
      all: {
        options: { livereload: 1337 },
        files: [ 'app/**/*', 'tests/**/*', 'config/**/*', 'demo/**/*', '!tests/utils/*', '!tests/assets/*', '!demo/assets/*', 'vendor/**/*'],
        tasks: commonTasks.concat([ 'bell' ])
      }
    },

    /**
      Deployment Tasks
       clean,
       htmlmin,
       compress
    */

    //Clean up demo assets
    clean: {
      demo: {
        src: ['build/assets/demo']
      },
      prod: {
        src: ['dist/']
      }
    },

    //Compress build to zip file
    compress: {
      build: {
        options: {
          archive: 'sites.zip'
        },
        files: [
          { src: ['./login/index.html', './login/assets/app.min.js', './login/assets/app.min.css', './login/assets/vendor.min.js', './login/assets/vendor.min.css'], dest: 'sites/' }
        ]
      }
    }
  });

  /*
    Build Task
      Execute common tasks and all deployment tasks
      Note: environment must be specified as production (eg, grunt build --env production)
      See README for more details
  */
  grunt.registerTask('build', commonTasks.concat([ 'copy:prod', 'compress:build', 'clean:prod', 'bell' ]));

  /**
    Init Task
      Execute all common tasks
  */
  grunt.registerTask('init', commonTasks.concat([ 'bell' ]));

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
    //'connect:tests',
    'init',
    'watch'
  ]);
};
