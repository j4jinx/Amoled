module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		copy : {
			dist : {
				files : [ {
					src : 'index.html',
					dest : 'dist/index.html'
				}, {
					expand : true,
					src : [ 'Amoled/fonts/**/*' ],
					dest : 'dist/'
				}, {
					expand : true,
					src : [ 'Amoled/images/**/*' ],
					dest : 'dist/'
				}, {
					expand : true,
					src : [ 'Amoled/scripts/*.js' ],
					dest : 'dist/'
				}, {
					expand : true,
					src : [ 'Amoled/views/**/*' ],
					dest : 'dist/'
				} ]
			}
		},

		jshint : {
			all : [ 'Gruntfile.js', 'Amoled/scripts/**/*.js' ]
		},

		clean : {
			temp : {
				src : [ 'tmp', '.tmp' ]
			}
		},

		'useminPrepare' : {
			options : {
				dest : './dist'
			},
			html : 'index.html'
		},

		usemin : {
			html : [ 'dist/index.html' ]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', [ 'useminPrepare', 'copy', 'concat',
			'cssmin:generated', 'uglify', 'usemin', 'clean:temp' ]);
};