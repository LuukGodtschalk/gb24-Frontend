module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      context: __dirname + '/src/www/js',
      entry: './index.js',
      dev: {
        context: __dirname + '/src/www/js',
        entry: './index.js',
        output: {
          path: __dirname + '/src/www/js',
          filename: 'bundle.js'
        }
      },
      build: {
        context: __dirname + '/src/www/js',
        entry: './index.js',
        output: {
          path: __dirname + '/build/www/js',
          filename: 'bundle.js'
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['www/*', 'www/css/**', 'www/img/**', 'server/**'],
          dest: 'build/'
        }]
      }
    },
    clean: {
      dev: ['src/www/js/bundle.js'],
      build: ['build/*'],
      options: {
        'no-write': false
      }
    },
    jshint: {
      files: ['src/www/js/*.js', '!src/www/js/bundle.js', 'src/www/js/app/**.js', 'src/server/**.js'],
    },
    jscs: {
      src: ['<%= jshint.files %>'],
      options: {
        config: '.jscsrc'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      files: ['src/www/**'],
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'jscs', 'webpack']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['check', 'clean:dev', 'webpack:dev']);
  grunt.registerTask('check', ['jshint', 'jscs']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('build', ['check', 'clean:build', 'copy', 'webpack:build']);

};
