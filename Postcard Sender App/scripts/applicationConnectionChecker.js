/// <reference path="..//cordova.js/cordova.android.js" />
/*global window, navigator*/
var app = app || {};
app.Connection = app.Connection || {};

(function (scope) {
    scope.isConnected = function () {
        'use strict';
        var networkState = navigator.connection.type;

        var states = {};
    
        states[Connection.NONE] = 'Check your \nnetwork connection';

        if (states[networkState] === states[Connection.NONE]) {
            navigator.notification.alert('Cannot send postcard due to no connection!');
            navigator.notification.vibrate(1000);
            return false;
        }

        return true;
    };
}(app.Connection))


