(function () {
    'use strict';
    var SinglePostModel = Backbone.Model.extend();

    dts.SinglePostView = Backbone.Marionette.ItemView.extend({
        initialize: function (options) {
            this.model = new SinglePostModel();
            this.model.set('post', options.post);
        },
		
		// to open urls included in posts with the device browser not in-app - testing 6-23-2015
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