module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            browserify: {
                files: ['src/**/*.js', 'example.js'],
                tasks: ['browserify:dev']
            },
            options: {
                nospawn: true
            }
        },

        browserify: {
            dev: {
                src: 'example.js',
                dest: 'example/bundle.js',
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [
                        ['reactify', {
                            'es6': true
                        }]
                    ]
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['browserify', 'watch']);
};