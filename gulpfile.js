
//NPX es para llamar tareas
//done es un CALLBACK (avisa a Gulp cundo termina la ejecucion de la funcion)

const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext')

//IMAGENES
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const gulpTerser = require('gulp-terser-js');

function css(done) {
    //Para compilar un archivo SASS se siguen los siguientes pasos (3)
    //Identificar el archivo 
    src('src/scss/**/*.scss')
        //Compilarlo
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        //Almacenarlo en disco
        .pipe(dest('build/css'));
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/scss/**/*.{png, jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done) {
    const calidad = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(calidad))
        .pipe(dest('build/img'))
    done();
}

function versionAvif(done) {
    const calidad = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg,webp}')
        .pipe(avif(calidad))
        .pipe(dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(javascript, dev);