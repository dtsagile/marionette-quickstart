(function (Backbone, Marionette) {
    'use strict';
    dts.App = new Marionette.Application();

    //this event is fired before the application starts if
    //any logic needs to happen first
    dts.App.on('before:start', function (options) {
        //options are passed in on app.start() from index.html
        //add additional options if needed here
        options.foo = 'Bar';
        console.log('App starting!');
    });

    //this event is fired when the app starts
    //this is where we can spin up the app's modules
    //and start listening 
    dts.App.on('start', function(options) {
        //options are passed in on app.start() from index.html
        //you can add additional options in the before:start event and 
        //they will end up here
        options = options || {};
        console.log('App started!');
        //application regions
        dts.App.addRegions({
          mainRegion: "#main-content"
        });
        //this starts the MainModule
        //you can pass in options to the module, we will just send them all along
        dts.App.module('Main').start(options);

        //Per backbone.js docs: During page load, after your application has finished creating all of its routers, 
        //be sure to call Backbone.history.start(), or Backbone.history.start({pushState: true}) to route the initial URL.
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    //this will catch all app events and log them
    //*used for debugging purposes only
    dts.App.vent.on('all', function (evt, model) {
        console.log('APP:DEBUG: Event Caught: ' + evt, model);
    });

})(Backbone, Marionette);