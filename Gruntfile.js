module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          optimize: 'none',
          uglify: {
            max_line_length: 1000,
            banner: '/*!<%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          baseUrl: 'src/www/js',
          mainConfigFile: 'src/www/js/main.js',
          name: 'main',
          out: 'build/www/js/main.js'
        }
      }
    },
    webpack: {
      dev: {
        context: __dirname + '/src/www/js',
        entry: './index.js',
        output: {
          path: __dirname + '/src/www/js',
          filename: 'bundle.js'
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['www/*', 'www/css/**', 'www/img/**', 'server/**', 'www/js/bundle.js'],
          dest: 'build/'
        }]
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['jshint', 'jscs', 'webpack']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('build', ['copy']);

};
