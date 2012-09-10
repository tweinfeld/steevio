define(["jquery", "underscore", "backbone"], function ($, _, Backbone) {
    return Backbone.View.extend({
        tagName: "body",
        initialize: function () {
            this.update();
            this.model.bind('change:theme', this.update, this);
        },
        update: function (presentation) {
            this.$el.removeClass(['theme-',this.model.previous('theme')].join('')).addClass(['theme-', this.model.get('theme')].join(''));
        }
    });
});