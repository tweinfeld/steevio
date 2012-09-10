define(["jquery", "underscore", "backbone", "models/presentation", "views/atmosphere", "views/iphone", "libs/logger/logger"], function ($, _, Backbone, Presentation, Atmosphere, Iphone, Logger) {

    var app = function (configuration) { this.config = configuration; this.initialize(); };

    app.prototype = {
        config: {
            debugMode: false
        },

        initialize: function () {
            var logger = new Logger();
            logger.info('Initialized!');
            
            // Create a default presentation
            var presentation = top.presentation = new Presentation(this.config.defaultPresentation);
            var atmosphereView = new Atmosphere({ el: $('body')[0], model: presentation });
            var iphoneView = new Iphone({ model: presentation });

            atmosphereView.$el.append(iphoneView.render().el);

        }
    }

    return app;
});