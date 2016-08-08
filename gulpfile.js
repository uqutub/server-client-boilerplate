var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var chokidar = require('chokidar');
var sequence = require('gulp-sequence');
var webserver = require('gulp-webserver');
var serverTSConfig = require('./server/src/tsconfig.json');
var cilentTSConfig = require('./client/src/tsconfig.json');

var path = {
    server: {
        ts: './server/src/**/*.ts',
        dist: './server/build'
    },
    client: {

    }
};

// ### region Server

// Clean the Contents of the Distribution Directory
gulp.task('clean:server', function () {
    return del(path.server.dist);
});

// transpile function for server TS
function transpileServer(src, dist) {
    return gulp
        .src(src)
        .pipe(typescript(serverTSConfig.compilerOptions))
        .pipe(gulp.dest(dist));
}

// TypeScript Server Transpile
gulp.task('transpile:server', function () {
    transpileServer(path.server.ts, path.server.dist);
});

// watch server TS 
gulp.task('chokidar:server', function () {
    return chokidar.watch(path.server.ts).on('all', function (event, fileLocation) {
        // console.log(event, fileLocation)
        // chnage location from src to build and then remove file name...
        var fileDistination = fileLocation.replace("src", "build"); // replace src to dist
        fileDistination = fileDistination.replace(fileDistination.split('\\').pop(), ''); // remove file name from the end
        transpileServer(fileLocation, fileDistination);
    });
});

gulp.task('build:server', sequence('clean:server', 'transpile:server'));
gulp.task('buildNwatch:server', sequence('clean:server', 'chokidar:server'));


// ### endregion Server



// TypeScript Client Transpile
gulp.task('transpile:client', function () {
    return gulp
        .src(path.ts)
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest(path.distapp));
});