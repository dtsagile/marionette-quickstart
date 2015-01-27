(function () {
    'use strict';
    var SinglePostModel = Backbone.Model.extend();

    dts.SinglePostView = Backbone.Marionette.ItemView.extend({
        initialize: function (options) {
            this.model = new SinglePostModel();
            this.model.set('post', options.post);
        },

        template: '#single-post-template',
        tagName: 'div',
        className: 'my-class'
    });
})();