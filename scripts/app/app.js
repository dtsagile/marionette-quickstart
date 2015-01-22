(function (Backbone, Marionette) {
    'use strict';

    dts.App = new Backbone.Marionette.Application();

    dts.App.on('before:start', function () {
        console.log('App starting!');
    });

    dts.App.on('start', function(options) {
        console.log('App started!');
        dts.App.module('Main').start(options);

        if (Backbone.history) {
            Backbone.history.start();
        }

    });

    //debugging events
    dts.App.vent.on('all', function (evt, model) {
        console.log('APP:DEBUG: Event Caught: ' + evt, model);
    });

})(Backbone, Marionette);