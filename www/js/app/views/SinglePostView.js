(function () {
    'use strict';
    var SinglePostModel = Backbone.Model.extend();

    dts.SinglePostView = Backbone.Marionette.ItemView.extend({
        initialize: function (options) {
            this.model = new SinglePostModel();
            this.model.set('post', options.post);
        },
		
        events: {
            'click a': 'openUrl'
        },

        onShow: function () {
            //after view is rendered, show the back button
            $('.navbar-back').removeClass('invisible');
        },

		// to open urls included in posts with the device browser not in-app - testing 6-23-2015
        // see here: http://stackoverflow.com/questions/17887348/phonegap-open-link-in-browser
		openUrl: function(evt) {
            evt.preventDefault();
            var url = evt.target.href;
    		if(window.device && window.device.platform === 'Android') {
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