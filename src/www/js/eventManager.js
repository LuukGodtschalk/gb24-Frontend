
var app = angular.module('gb24');
var io = require('socket.io-client');

app.factory('eventManager', ['$timeout', '$http', function ($timeout, $http) {

  var WAITING = 'waiting';
  var OPEN = 'open';
  var CONNECTING = 'connecting';
  var CONNECTED = 'connected';
  var LOADING = 'loading';
  var MODE_SOCKET = 'socket';
  var MODE_AJAX = 'ajax';

  var socket = io.connect();
  var events = {
    'connection_status': {
      status: OPEN,
      data: {event: 'connection_status', data: CONNECTING},
      listeners: []
    }
  };
  var status = {
    connection: CONNECTING,
    mode: MODE_SOCKET
  };

  socket.on('connect', function () {
    status.connection = CONNECTED;
    status.mode = MODE_SOCKET;
    updateStatus();
  });


  socket.on('disconnect', function () {
    status.connection = CONNECTING;
    refreshAll();
  });

  socket.on('connection_error', function () {
    status.connection = CONNECTING;
    status.mode = MODE_AJAX;
    updateStatus();
  });

  socket.on('update', function (msg) {
    var eventEntry = events[msg.event];
    if (eventEntry === undefined) {
      throw new Error('Unsollicited incoming update for event \'' + msg.event + '\'');
    }
    processUpdate(msg);
  });

  function updateStatus() {
    if (status.connection === LOADING || status.connection === CONNECTED) {
      var newStatus = CONNECTED;
      for (var eventName in events) {
        if (events[eventName].status !== OPEN) {
          newStatus = LOADING;
        }
      }
      status.connection = newStatus;
    }
    processUpdate({event: 'connection_status', data: status.connection});
  }

  function refreshAll() {
    for (var eventName in events) {
      if (eventName !== 'connection_status') {
        events[eventName].status = LOADING;
        socket.emit('subscribe', eventName, function (ack) {
          //warning: eventName can be pointing to something else at this point.
          //use ack.event instead.
          events[ack.event].status = OPEN;
          processUpdate(ack);
        });
      }
    }
    updateStatus();
  }

  function processUpdate(msg) {
    var eventEntry = events[msg.event];
    var oldData = eventEntry.data;
    eventEntry.data = msg;
    eventEntry.listeners.forEach(function (cb) {
      cb(msg, oldData);
    });
    if (msg.event !== 'connection_status') {
      updateStatus();
    }
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
        updateStatus();

        if (false) {
          $http({
            method: 'GET',
            url: '/api/' + eventName + '.json'
          }).then(function (res) {
            eventEntry.status = OPEN;
            processUpdate({event: eventName, data: res.data});
          });
        } else {
          socket.emit('subscribe', eventName, function (ack) {
            eventEntry.status = OPEN;
            processUpdate(ack);
          });
        }
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
    },
    getConnectionStatus: function () {
      return this.connectionStatus;
    }
  };

}]);
