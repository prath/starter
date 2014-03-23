### Usage
---
1. Install Gulpjs : [gulp getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)
2. Buat sebuah direktori/folder
3. Clone atau download repo ini, dan simpan di dalam direktori yang sebelumnya telah dibuat.
4. Navigate ke folder clone/download dari cmd/terminal, ex: `cd gulp-starter`
5. Jalankan npm install dari cmd/terminal : `npm install`
6. Jalankan gulp : `gulp`

### Gulp Command
---

Semua Gulp command outputnya akan berada di folder `../assets/front/`

1. `gulp` ini default task, digunakan untuk compile less ke css, merapikan output css dengan [csscomb](https://github.com/csscomb/csscomb), meng-copy semua file css, js dan images ke folder assets, menjalankan [jshint](https://github.com/jshint/jshint/), dan minimize file js dan css.

2. `gulp csslint` ini adalah task yang digunakan untuk manjalankan csslint untuk mengecek code css. [ref: csslint](https://github.com/stubbornella/csslint)

3. `gulp jscs` ini adalah task yang digunakan dalam menjalankan jscs untuk mengecek code style js. [ref: jscs](https://github.com/mdevils/node-jscs)
