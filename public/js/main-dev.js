// Configure paths (notice that these are not read by r.js and are needed to be manually specified in it - see build.bat)
requirejs.config({
    paths: {
        text: "libs/requirejs/plugins/text",
        order: "libs/requirejs/plugins/order",
        jquery: "libs/jquery/jquery-min",
        underscore: "libs/underscore/underscore",
        backbone: "libs/backbone/backbone"
    }
});

require(["order!jquery", "order!underscore", "order!backbone", "order!application", "configuration"], function ($, _, Backbone, Application, Configuration) {
    // Removes any globally set AMD-incompatible handles (restores previously values)
    $.noConflict();     // jquery uses "define" but also leave it's garbage on the global namespace
    _.noConflict();
    Backbone.noConflict();
    
    // Starts the application up
    var application = new Application(Configuration);
});