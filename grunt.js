/*global module:false*/

module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        meta: {
            version: '0.1.0',
            banner: '/* PubSub - v<%= meta.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> Adam Zamozniewicz <zamozniewicz@gmail.com>\n' +
                '* Released under the MIT License */'
        },
        // Files to validate
        lint: {
            files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
        },
        // Tests
        test: {
            files: ['test/**/*.js']
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:lib/polyfills.js>', '<file_strip_banner:lib/pubsub.js>'],
                dest: 'dist/pubsub.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/pubsub.min.js'
            }
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint test'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                strict: true,
                undef: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },
        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint test concat min');

};
