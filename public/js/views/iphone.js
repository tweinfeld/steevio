define(["jquery", "underscore", "backbone", "text!views/iphone.html"], function ($, _, Backbone, IphoneTemplate) {

    var onTransitionEnd = (function () {
        var eventName = {
            "WebkitTransition": "webkitTransitionEnd",
            "MozTransition": "transitionend",
            "OTransition": "oTransitionEnd",
            "msTransition": "msTransitionEnd",
            "transition": "transitionEnd"
        }[Modernizr.prefixed('transition')];

        return eventName ? function (element, listener) {
            $(element).one(eventName, listener);
        } : function (element, listener) {
            _.defer(listener);
        }
    })();

    return Backbone.View.extend({
        tagName: "section",
        template: _.template(IphoneTemplate),
        initialize: function () {
            this.model.bind('change', this.update, this);
        },
        render: function () {
            Modernizr.csstransitions ? this.setElement(this.template({
                url: (this.model.get('url') || "about:blank"),
                orientation: (this.model.get('orientation') === 'landscape' ? ' horizontal' : ''),
                caption: this.model.get('caption')
            })) : this.setElement($(this.make()).text('Your browser is not supported')[0]);
            return this;
        },

        update: function (presentation) {
            this.$('h1').text(this.model.get('caption'));
            if (presentation.previous('url') !== presentation.get('url')) this.$('.viewport').prop({ "src": this.model.get('url') });
            if (presentation.previous('orientation') !== presentation.get('orientation')) {
                this.$el.toggleClass('horizontal', this.model.get('orientation') === 'landscape');
                this.$('.viewport').addClass('mute');
                var _this = this;
                
                onTransitionEnd(this.$('.background')[0], function () {
                    _this.$('.viewport').removeClass('mute');
                });
            }
        }
    });
});