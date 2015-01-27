(function () {
    'use strict';
    dts.HomeModel = Backbone.Model.extend({

        defaults: {
            title: 'Bootstrap Starter Template',
            content: 'Use this document as a way to quickly start any new project.'
        },

        initialize: function (options) {
            options = options || {};
        }

    });

})();