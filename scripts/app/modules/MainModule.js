(function () {
  'use strict';

  dts.App.module('Main', {
        startWithParent: false, //true starts with dts.App.start()--false requires manually starting the module
        define: function (Mod, App, Backbone, Marionette, $, _) {
          //define a controller for the router
          var MainController = Marionette.Controller.extend({

            initialize: function (options) {
              console.log('Main controller init!');
            },

            someMethod: function () {
              console.log('some method');
            }
          });
          //define the module's router
          var MainRouter = Marionette.AppRouter.extend({
              // "someMethod" must exist at controller.someMethod
              appRoutes: {
                "some/route": "someMethod"
              },

              /* standard routes can be mixed with appRoutes/Controllers above */
              routes : {
                "some/otherRoute" : "someOtherMethod"
              },

              someOtherMethod : function(){
                console.log('some other method');
              }

            });

          //listen for the module's start event, which passes in any options from app.js
          //then spin up a new instance of your controller and router and store them on
          //the module
          Mod.on('start', function (options) {

            console.log('Main module started!');

            Mod.controller = new MainController(options);
            Mod.router = new MainRouter({controller: Mod.controller});
          });
        }
      });
})();