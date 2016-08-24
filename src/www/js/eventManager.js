
var app = angular.module('gb24');
var io = require('socket.io-client');

app.factory('eventManager', ['$timeout', function ($timeout) {

  var WAITING = 'waiting';
  var OPEN = 'open';
  var socket = io.connect();
  var events = [];

  socket.on('update', function (msg) {
    var eventEntry = events[msg.event];
    if (eventEntry === undefined) {
      throw new Error('Unsollicited incoming update for event \'' + msg.event + '\'');
    }
    processUpdate(msg);
  });

  function processUpdate(msg) {
    var eventEntry = events[msg.event];
    var oldData = eventEntry.data;
    eventEntry.data = msg;
    eventEntry.listeners.forEach(function (cb) {
      cb(msg, oldData);
    });
  }

  return {
    watch: function (eventName, cb) {
      var eventEntry = events[eventName];
      if (eventEntry === undefined) {
        events[eventName] = eventEntry = {
          status: WAITING,
          data: null,
          listeners: [cb]
        };
        socket.emit('subscribe', eventName, function (ack) {
          console.log(ack);
          eventEntry.status = OPEN;
          processUpdate(ack);
        });
      } else {
        eventEntry.listeners.push(cb);
        if (eventEntry.status === OPEN) {
          $timeout(function () {
            cb(eventEntry.data, null);
          });
        }
      }
      return function cancel() {
        //remove the callback from the listeners array
        var listeners = events[eventName].listeners;
        listeners.splice(listeners.indexOf(cb), 1);
      };
    }
  };

}]);
