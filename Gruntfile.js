module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            // Jotain tänne
            build: {
                src: ['src/app/app.js', 'src/app/services/*.js', 'src/app/controllers/*.js'],
                dest: 'src/app/app.min.js'
            }
        },
        cssmin: {
            build: {
                src: ['src/css/common/*.css'],
                dest: 'src/css/app.min.css'
            }
        },
        jshint: {
            src: ['web/app/**/**.js', 'test/**.js', 'web/app/app.js' ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);
};