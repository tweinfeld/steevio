define(["underscore", "backbone"], function (_, Backbone) {

    return Backbone.Model.extend({

        defaults: {
            "orientation": "portrait",
            "url": "http://jquerymobile.com/demos/1.0.1/docs/pages/index.html",
            "theme": "blue",
            "caption": "Demonstrate your mobile web app with Steve's finesse!"
        }

    });

});