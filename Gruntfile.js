module.exports = function(grunt) {
  
  grunt.loadTasks('tasks');

  grunt.initConfig({
    template: {
        dev: {
          src: 'test/**/*.mustache',
          dest: 'test/templates.js',
          variables: {
            name: 'TMPL',
            staticPath: 'test'
          }
        }
      }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'template');
};
