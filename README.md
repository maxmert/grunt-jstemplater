# grunt-jstemplater

Get all templates files (reqursively) from the directory and write it's contents to JSON. So if you had, for example, file /javascripts/templates/index/head.mustache, you would be able to find you template in var TEMPLATES.index.head (in dest file).

## Supported template engines

  All, but if you can get it out from JSON.

## Getting Started
    
install via npm

    npm install grunt-jstemplater


and in your grunt.js file:

    grunt.loadNpmTasks('grunt-jstemplater');

## Usage
    
Create a `template` task in your grunt config. Templater will guess the intended template engine based on the `src` filename. Pass the `engine` option to force a specific engine. 

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
      },
      ...
    });

run with:
      
    grunt template

or for a specific target:

    grunt template:dist

`src`, `dest`,are required. In variables you can pass 'name': the name of JSON, 'staticPath': folder where all you templates are.