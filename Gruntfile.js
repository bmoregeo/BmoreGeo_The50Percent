module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({
        watch:{
            compilesrc:{
                files:["src/js/**/*", "src/less/**/*.less", "src/config.js", "src/index.html"],
                tasks:['single']
            }

        },
        requirejs:{
            // configuration for a multi-file build

            // configuration for a single-file build
            single:{
                options:{
                    baseUrl:'src/js',
                    name:'init',
                    out:'build/js/init.js',
                    paths:{
                        'jquery': 'lib/jquery-2.0.3.min',
                        'knockout': 'lib/knockout-2.3.0',
                        'Leaflet': 'lib/leaflet/leaflet',
                        'text':'../../deps/text/text',
                        'domReady':'../../deps/domReady/domReady'
                        //'globals': 'empty:'
                    },
                    exclude:[],
                    inlineText:true,
                    optimize:'uglify2'
                }
            }
        },
        less:{
            development:{
                options:{
                    paths:["src/less"],
                    compress:true,
                    yuicompress:true,
                    optimization:2
                },
                files:{
                    // target.css file: source.less file
                    "build/css/style.css":["src/less/style.less"],
                    "src/css/style.css":["src/less/style.less"]
                }

            }
        },

        replace:{
            // needed for inlined templated in single-file build
            "main":{
                src:['build/js/main.js'],
                dest:'build/js/main.js',
                replacements:[
                    {
                        from:'text!',
                        to:''
                    }
                ]
            },
            "proxy":{
                src:['build/proxy/proxy.config'],
                dest:'build/proxy/proxy.config',
                replacements:[
                    {
                        from:"oneviewGrunt/src",
                        to:"oneviewGrunt/build"
                    }
                ]
            }
        },

        // needed for single file build
        clean:{
            single:['build']
        },

        copy:{
            // needed for single file build
            single:{
                files:[
                    {expand:true, cwd:'src', src:['**', ['!js/main.js', '!less/**']], dest:'build/'}
                ]
            }
        }
    });

    grunt.registerTask("compile", ["requirejs:compile"]);
    grunt.registerTask("lesscompile", ["less"])
    grunt.registerTask("single", ["clean", "requirejs:single", "less", "replace", "copy"]);

};