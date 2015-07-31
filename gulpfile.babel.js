/*global __dirname */
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpwatch from 'gulp-watch';
import gutil from 'gulp-util';
import historyApiFallback from 'connect-history-api-fallback';
import sequence from 'run-sequence';
import source from 'vinyl-source-stream';
import stringify from 'stringify';
import watchify from 'watchify';
import {server as karma} from 'karma';
import browsersync from 'browser-sync';

function handleError(task){
	return function(err) {
		gutil.beep();
		gutil.log(err);
		this.emit('end');
	};
}

function Build(watch, done){
	var b;
	function transform(){
		if( !b ){
			b = browserify('./app/index.js', {
				debug: true,
				paths: ['./node_modules', './app/'],
				cache: {},
				packageCache: {},
				fullPaths: true
			});

			if(watch){
				b = watchify(b);
			}

			b.transform(babelify.configure({
				stage: 0
			}));

			b.transform(stringify(['.html']));
		}

		function bundle(){
			let stream = b.bundle()
					.on('error', handleError('Browserify'))
				.pipe(source('bundle.js'))
				.pipe(buffer())
				.pipe(gulp.dest('./dist'));

			stream.on('end', browsersync.reload);

			return stream;
		}

		return bundle();
	}

	gulp.task('bundle', ['lint'], function bundleTask(){
		return transform();
	});

	gulp.task('bundle-light', function bundleLightTask(){
		return transform();
	});

	gulp.task('test', function(done){
		karma.start({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		}, done);
	});

	function tdd(){
		karma.start({
			configFile: __dirname + '/karma.conf.js',
			singleRun: false,
			reporters: ['mocha']
		});
	}

	gulp.task('setup-watchers', function(){
		gulpwatch(['app/**/*.js', 'app/**/*.html', 'node_modules/ng-forward/**/*.js'], function(){
			gulp.run('bundle');
		});

		gulp.run('serve');
		tdd();
	});

	if(watch)
	{
		sequence('bundle', 'setup-watchers', done);
	}
	else
	{
		sequence('bundle', 'test', done);
	}
}

function serve(){
	browsersync.init({
		port: 2000,
		ui: {
			port: 2001
		},
		server: {
			baseDir: './dist',
			middleware: [historyApiFallback]
		}
	});
}

gulp.task('serve', serve);

gulp.task('default', function(done){
	Build(true, done);
});

gulp.task('build', function(done){
	Build(false, done);
});

gulp.task('lint', function(){
	return gulp.src(['app/**/*.js', '!app/**/*.spec.js', '!app/**/*.e2e.js'])
		.pipe(eslint())
		.pipe(eslint.format());
});
