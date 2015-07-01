(function () {
  'use strict';

  dts.App.module('Main', {
        startWithParent: false, //true starts with dts.App.start()--false requires manually starting the module
        define: function (Mod, App, Backbone, Marionette, $, _) {
          //define a controller for the router
          var MainController = Marionette.Controller.extend({
            //initialize function called automatically when instantiated
            initialize: function (options) {
              //options are passed to the controller here
              //regions are specified in app.js
              this.region = dts.App.mainRegion;
              console.log('Main controller init!');
            },

            someMethod: function () {
              alert('Some method called!');
              console.log('some method called!');
            },

            showPostListView: function (data) {
              //you could then pass the data to the view to render it to the DOM
              this.region.show(new dts.PostListView({ data: data, category: this.category }));
            },

            showCategoryView: function (category) {
              _.each($('.cat'), function (li) {
                if ($(li).data('category').toString() === category) {
                  this.category = $(li).find('a').text();
                }
              }, this);
              var rootURL = 'http://www.auctionreport.com/wp-json';
              $.ajax({
                type: 'GET',
                url: rootURL + '/posts?filter[cat]=' + category + '&filter[posts_per_page]=10&page=1&filter[orderby]=date&filter[order]=desc',
                dataType: 'json',
                success: _.bind(this.getPostsCallback, this),
                error: this.errorCallback
              });
            },

            showSinglePostView: function (id) {
              //if we havent stored the posts
              //there will not be any data to search
              if (!this.postListData) {
                this.getPosts();
              }
              var post = _.findWhere(this.postListData, {ID: parseInt(id, 10)});
              if (!post) {
                alert('Post ' + id + ' could not be found!');
                //no post found, send them to the homepage
                window.location.hash = '';
              }
              this.region.show(new dts.SinglePostView({post: post}));
            },

            getPosts: function () {
              //if we have the posts already, just show them
              if (this.postListData) {
                this.showPostListView(this.postListData);
                return;
              }
              //make ajax call
              var rootURL = 'http://www.auctionreport.com/wp-json';
              $.ajax({
                type: 'GET',
                url: rootURL + '/posts',
                dataType: 'json',
                success: _.bind(this.getPostsCallback, this),
                error: this.errorCallback
              });
            },

            getPostsCallback: function (response, status) {
              if (status === 'success') {
                //do something with the data
                //call a function to show the view with the new data
                this.showPostListView(response);
                //store the posts for later use
                this.postListData = response;
              } else {
                //do something else
              }
            },

            errorCallback: function (response) {
              console.log(response.message || 'ERROR!');
            }

          });
          //define the module's router
          var MainRouter = Marionette.AppRouter.extend({
              // all methods must exist on controller
              //'route/name': 'methodName'
              appRoutes: {
                //when hitting main page, get all posts
                '': 'getPosts',
                ':postId': 'showSinglePostView',
                'category/:id': 'showCategoryView'
              },

              // If it exists, AppRouters will call the onRoute method whenever a user navigates within your app. The
              // callback receives three arguments: the name, path, and arguments of the route.
              onRoute: function (name, path, args) {
                console.log('onRoute called: ', name, path, args);
              }

            });

          //listen for the module's start event, which passes in any options from app.js
          //then spin up a new instance of your controller and router and store them on
          //the module
          Mod.on('start', function (options) {

		// Close navigation on category click/tap
		$('.oc-toggle-left').on('click', function () {
              	$('.navmenu-fixed-left').offcanvas('toggle');
          });
		  
		  $('.oc-toggle-right').on('click', function () {
              	$('.navmenu-fixed-right').offcanvas('toggle');
          });
				
	$('html, body').scrollTop(0);
	
            console.log('Main module started!');
            //you can pass options to the controller/router here
            Mod.controller = new MainController(options);
            Mod.router = new MainRouter({controller: Mod.controller});
          });
        }
      });
})();