(function () {
    'use strict';

    dts.App.module('Main', {
        startWithParent: false, //true starts with dts.App
        define: function (Mod, App, Backbone, Marionette, $, _) {

            var MainController = Marionette.Controller.extend({

                initialize: function (options) {

                    console.log('Main controller init!');
                },

                someMethod: function () {
                    console.log('some method');
                }
            });

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

            Mod.on('start', function (options) {

                console.log('Main module started!');

                Mod.controller = new MainController(options);
                Mod.router = new MainRouter({controller: Mod.controller});

            });
        }
    });
})();