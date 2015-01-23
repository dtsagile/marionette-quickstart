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
              this.region = dts.App.mainRegion;
              console.log('Main controller init!');
            },

            someMethod: function () {
              alert('Some method called!');
              console.log('some method called!');
            },

            showMainView: function () {
              this.region.show(new dts.MainView());
              console.log('Main view shown!');
            },

            showAboutView: function () {
              this.region.show(new dts.AboutView());
              console.log('About view shown');
            },

            showHelloView: function (name) {
              //name is whatever is after /hello/ in the URL
              //if none, use No Name
              //the view's model is responsible for handling the data
              //in this case, a name attribute is passed the the view's template
              this.region.show(new dts.HelloView({
                model: new dts.HelloModel({
                  name: name || 'No Name'
                })
              }));
            }
          });
          //define the module's router
          var MainRouter = Marionette.AppRouter.extend({
              // all methods must exist on controller
              //'route/name': 'methodName'
              appRoutes: {
                '': 'showMainView',
                'hello/:name': 'showHelloView',
                'hello': 'showHelloView',
                'about': 'showAboutView',
                'some/route': 'someMethod'
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

            console.log('Main module started!');
            //you can pass options to the controller/router here
            Mod.controller = new MainController(options);
            Mod.router = new MainRouter({controller: Mod.controller});
          });
        }
      });
})();