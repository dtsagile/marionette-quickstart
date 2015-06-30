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
        },

        template: '#main-template',
        tagName: 'div',
        className: 'list-group'
    });
})();