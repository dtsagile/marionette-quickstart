(function () {
    'use strict';

    dts.HelloView = Backbone.Marionette.ItemView.extend({
        initialize: function (options) {
            if (options.name) {
                this.model.set('name', options.name);
            }
        },

        template: '#hello-template',
        tagName: 'div',
        className: 'my-class'
    });
})();