(function () {
    'use strict';

    dts.HomeView = Backbone.Marionette.ItemView.extend({
        initialize: function (options) {
            options = options || {};
            this.model = new dts.HomeModel();
        },

        template: '#home-template',
        tagName: 'div',
        className: 'my-class'
    });
})();