module.exports = function(grunt) {

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
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['www/*', 'www/css/**', 'server/**', 'www/js/lib/require.js'],
          dest: 'build/'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'requirejs']);

};