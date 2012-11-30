module.exports = function(grunt) {
  
  grunt.loadTasks('tasks');

  grunt.initConfig({
    template: {
        dist: {
          src: 'public/javascripts/templates/**/*.mustache',
          dest: 'public/javascripts/templates.js',
          variables: {
            name: 'TMPL',
            staticPath: 'javascripts/templates'
          }
        }
      }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'template');
};
