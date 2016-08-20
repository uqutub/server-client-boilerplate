var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var chokidar = require('chokidar');
var nodemon = require('gulp-nodemon')
var sequence = require('gulp-sequence');
var webserver = require('gulp-webserver');
var serverTSConfig = require('./server/src/tsconfig.json');
var cilentTSConfig = require('./client/src/tsconfig.json');

var ng2AppFolder = 'ng2-rc5';

var path = {
    server: {
        ts: './server/src/**/*.ts'
        , dist: './server/build'
    },
    client: {
        libjs: [
            { dist: 'lib/@angular', src: 'node_modules/@angular/**' }
            , { dist: 'lib/angular2-in-memory-web-api', src: 'node_modules/angular2-in-memory-web-api/**' }
            , { dist: 'lib/rxjs', src: 'node_modules/rxjs/**' }
            , { dist: 'lib', src: 'node_modules/core-js/client/shim.min.js' }
            , { dist: 'lib', src: 'node_modules/core-js/client/shim.min.js.map' }
            , { dist: 'lib', src: 'node_modules/zone.js/dist/zone.js' }
            , { dist: 'lib', src: 'node_modules/reflect-metadata/Reflect.js' }
            , { dist: 'lib', src: 'node_modules/reflect-metadata/Reflect.js.map' }
            , { dist: 'lib', src: 'node_modules/systemjs/dist/system.src.js' }
            , { dist: 'lib', src: 'client/src/systemjs-config.js' }
            , { dist: 'lib', src: 'node_modules/immutable/dist/immutable.js' }
            // , { dist: 'lib/angularfire2', src: 'node_modules/angularfire2/**' }
            // , { dist: 'lib/ng2-img-cropper', src: 'node_modules/ng2-img-cropper/**' }
            // , { dist: 'lib', src: 'node_modules/angular2-tag-input/dist/tag-input.component.js' }
            // , { dist: 'lib', src: 'node_modules/angular2-tag-input/dist/tag-input-item.component.js' }
        ],
        libcss: [
            // 'node_modules/materialize-css/dist/mdl.css'
        ],
        libfonts: [
            // 'node_modules/materialize-css/dist/fonts/**/*'
            // , 'node_modules/mdi/fonts/**/*'
        ]
        , index: 'client/src/index.html'
        , indexcss: 'client/src/styles.css'
        , html: 'client/src/' + ng2AppFolder + '/**/*.html'
        , css: 'client/src/' + ng2AppFolder + '/**/*.css'
        , ts: 'client/src/' + ng2AppFolder + '/**/*.ts'
        , dist: 'client/build'
        , distapp: 'client/build/' + ng2AppFolder
        , distlib: 'client/build/lib'
        , distfonts: 'client/build/fonts'
    }
};

// transpile function for TS
function transpileTypeScript(src, dist, type) {
    return gulp
        .src(src)
        .pipe(typescript(
            (type === 'server') ? serverTSConfig.compilerOptions : cilentTSConfig.compilerOptions)
        ).pipe(gulp.dest(dist));
}

// copying function
function copyingFile(src, dist) {
    // console.log('copying', src, dist);
    return gulp.src(src)
        .pipe(gulp.dest(dist));
}

// modify path for destination
function modifyStringForDestination(path) {

    // chnage location from src to dist and then remove file name...
    // replace src to dist
    var fileDistination = path.replace("src", 'build');

    var arrayOfString = null;
    if (fileDistination.split('/').length > 1) {
        arrayOfString = fileDistination.split('/');
    } else {
        arrayOfString = fileDistination.split('\\');
    }

    // remove file name from the end
    fileDistination = fileDistination.replace(arrayOfString.pop(), '');

    return fileDistination;
}

// ### region Server

// Clean the Contents of the Server Build Directory
gulp.task('clean:server', function () {
    return del(path.server.dist);
});

// TypeScript Server Transpile
gulp.task('transpile:server', function () {
    transpileTypeScript(path.server.ts, path.server.dist, 'server');
});

// watch server TS 
gulp.task('chokidar:server', function () {
    return chokidar.watch(path.server.ts).on('all', function (event, fileLocation) {
        // console.log(event, fileLocation)
        // chnage location from src to build and then remove file name...
        var fileDistination = modifyStringForDestination(fileLocation);
        transpileTypeScript(fileLocation, fileDistination, 'server');
    });
});

// build server task
gulp.task('build:server', sequence('clean:server', 'transpile:server'));

// watch server
gulp.task('watch:server', sequence('clean:server', 'chokidar:server'));

// start server
gulp.task('start:server', function () {
    return nodemon({
        script: 'server/build/app'
        , ext: 'js'
        , watch: ['server/build/**/*.js']
        , env: { 'NODE_ENV': 'development' }
    }).once('start', function () {
        console.log('nodemon started!');
        // setTimeout(function(){
        //     gulp.start('serve:client');
        // },5000);
    }).on('restart', function () {
        console.log('server restarted!')
    })
});


// ### endregion Server

// ### region Client

// Clean the Contents of the Distribution Directory
gulp.task('clean:client', function () {
    return del(path.client.dist);
});

// Copy Index
gulp.task('copy:clientIndex', function () {
    return copyingFile(path.client.index, path.client.dist);
    // return gulp.src(path.client.index)
    //     .pipe(gulp.dest(path.client.dist));
});

// Copy Index CSS
gulp.task('copy:clientIndexCss', function () {
    return copyingFile(path.client.indexcss, path.client.dist);
    // return gulp.src(path.client.indexcss)
    //     .pipe(gulp.dest(path.client.dist));
});

// Copy Html
gulp.task('copy:clientHtml', function () {
    return copyingFile(path.client.html, path.client.distapp);
    // return gulp.src(path.client.html)
    //     .pipe(gulp.dest(path.client.distapp));
});

// Copy Css
gulp.task('copy:clientCss', function () {
    return copyingFile(path.client.css, path.client.distapp);
    // return gulp.src(path.client.css)
    //     .pipe(gulp.dest(path.client.distapp));
});

// copy Libs
gulp.task('copy:clientLibjs', function () {
    path.client.libjs.forEach(function (val, indx) {
        gulp.src(val.src)
            .pipe(gulp.dest(path.client.dist + '/' + val.dist));
    });
});
gulp.task('copy:clientLibcss', function () {
    return copyingFile(path.client.libcss, path.client.distlib);
    // return gulp.src(path.client.libcss)
    //     .pipe(gulp.dest(path.client.distlib));
});

// copy Fonts
gulp.task('copy:clientFonts', function () {
    return gulp.src(path.client.libfonts)
        .pipe(gulp.dest(path.client.distfonts));
});

// TypeScript Client Transpile
gulp.task('transpile:client', function () {
    transpileTypeScript(path.client.ts, path.client.distapp, 'client');
});

// watch client Index 
gulp.task('chokidar:clientIndex', function () {
    return chokidar.watch(path.client.index).on('all', function (event, fileLocation) {
        // console.log(event, fileLocation);
        var fileDistination = modifyStringForDestination(fileLocation);
        copyingFile(fileLocation, fileDistination); // coping files
    });
});

// watch client Index Css
gulp.task('chokidar:clientIndexCss', function () {
    return chokidar.watch(path.client.indexcss).on('all', function (event, fileLocation) {
        // console.log(event, fileLocation);
        var fileDistination = modifyStringForDestination(fileLocation);
        copyingFile(fileLocation, fileDistination); // coping files
    });
});

// watch client Html
gulp.task('chokidar:clientHtml', function () {
    return chokidar.watch(path.client.html).on('all', function (event, fileLocation) {
        // console.log(event, fileLocation);
        var fileDistination = modifyStringForDestination(fileLocation);
        copyingFile(fileLocation, fileDistination); // coping files
    });
});

// watch client C   ss
gulp.task('chokidar:clientCss', function () {
    return chokidar.watch(path.client.css).on('all', function (event, fileLocation) {
        // console.log(event, fileLocation);
        var fileDistination = modifyStringForDestination(fileLocation);
        copyingFile(fileLocation, fileDistination); // coping files
    });
});

// watch client TS 
gulp.task('chokidar:clientTS', function () {
    return chokidar.watch(path.client.ts).on('all', function (event, fileLocation) {
        // console.log(event, fileLocation);
        var fileDistination = modifyStringForDestination(fileLocation);
        transpileTypeScript(fileLocation, fileDistination, 'client'); // transpile function
    });
});

// build client task
gulp.task('build:client', sequence('clean:client', 'copy:clientIndex', 'copy:clientIndexCss', 'copy:clientHtml', 'copy:clientCss', 'copy:clientLibjs', 'copy:clientLibcss', 'copy:clientFonts', 'transpile:client'));

// watch client task
gulp.task('watch:client', sequence('clean:client', 'chokidar:clientIndex', 'chokidar:clientIndexCss', 'chokidar:clientHtml', 'chokidar:clientCss', 'copy:clientLibjs', 'copy:clientLibcss', 'copy:clientFonts', 'chokidar:clientTS'));

// // Serve Task
gulp.task('serve:client', function () {
    return gulp.src('client/build').pipe(webserver({
        livereload: true,
        open: true,
        port: 3000,
        directoryListing: {
            enable: true,
            path: '/index.html'
        },
        //   middleware: function(req, res, next) {
        //     var fileName = url.parse(req.url);
        //     fileName = fileName.href.split(fileName.search).join("");
        //     var fileExists = fs.existsSync("./client/build" + fileName);
        //     if (!fileExists) {
        //         req.url = "/index.html";
        //     }
        //     return next();
        //   }
    }));
});

// ### endregion Client

// watch client and server files
gulp.task('watch', function(){
  gulp.start('watch:server');
  gulp.start('watch:client');  
});

// task for development mode 
gulp.task('default', sequence('watch:server', 'watch:client'));
