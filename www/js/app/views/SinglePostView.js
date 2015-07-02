(function () {
    'use strict';
    var SinglePostModel = Backbone.Model.extend();

    dts.SinglePostView = Backbone.Marionette.ItemView.extend({
        initialize: function (options) {
            this.model = new SinglePostModel();
            this.model.set('post', options.post);
        },
		
		
        onShow: function () {
            //after view is rendered, show the back button
            $('.navbar-back').removeClass('invisible');

        },

		openURL: function(url) {
    		if(device.platform === 'Android') {
        		navigator.app.loadUrl(url, {openExternal:true});
    			} else {
        		window.open(url, '_system');
    		}
		},
		
        template: '#single-post-template',
        tagName: 'div',
        className: 'my-class'
    });
})();