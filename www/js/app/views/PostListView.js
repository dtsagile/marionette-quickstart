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
            this.model.set('categoryId', options.categoryId);
        },

        onBeforeDestroy: function () {
            if (this.myScroll) {
                // cleanup
                this.myScroll.off('scrollEnd');
                this.myScroll.destroy();
                $('#main-content').removeClass('iscroll');

            }
        },

        onShow: function () {
            this.initScrollRefresh();
            //uncomment to update title text in header
            //issue with size of title text causing wrap probably needs addressed
            $('.nav-title a').text(this.model.get('category'));
            
            //after view is rendered, hide the back button
            $('.navbar-back').addClass('invisible');
        },

        initScrollRefresh: function () {
            var $this = this;
            // the CSS for iscroll affects the single post view
            // so we are just adding a class for the list views and then
            // removing before the view is destroyed
            $('#main-content').addClass('iscroll');
            this.myScroll = new IScroll('#main-content', { 
                probeType: 1, 
                click: true
            });
            this.myScroll.on('scrollEnd', function () {
                // if not at the top of the page on scroll end,
                // then dont call refresh
                if (this.y !== 0) {
                    return;
                }
                // else trigger refresh for current category
                dts.App.vent.trigger('category:refresh', $this.model.get('categoryId'));
            });

        },

        template: '#main-template',
        tagName: 'div',
        className: 'list-group'
    });
})();