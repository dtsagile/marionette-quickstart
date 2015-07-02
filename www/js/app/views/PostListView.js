(function () {
    'use strict';

    dts.PostListView = Backbone.Marionette.ItemView.extend({
        initialize: function (options) {
        	var data = options.data;
        	//create a model
        	this.model = new dts.MainModel();
        	//set the data on the model
        	//the data is looped in the main-template in
        	//index.html and rendered to the dom
        	this.model.set('data', data);


            this.model.set('category', options.category);
        },

        onShow: function () {
            //uncomment to update title text in header
            //issue with size of title text causing wrap probably needs addressed
             $('.nav-title a').text(this.model.get('category'));
            
            //after view is rendered, hide the back button
            $('.navbar-back').addClass('invisible');
        },

        template: '#main-template',
        tagName: 'div',
        className: 'list-group'
    });
})();