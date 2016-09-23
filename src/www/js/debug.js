var app = angular.module('gb24');

app.controller('debug', ['$scope', 'eventManager', function ($scope, eventManager) {
  $scope.events = [];

  $scope.addWatcher = function (eventName) {
    var entry = {
      name: eventName,
      data: null
    };
    entry.cancel = eventManager.watch(eventName, function (msg) {
      $scope.$apply(function () {
        entry.data = msg.data || 'Error: ' + msg.error;
      });
    });
    $scope.events.push(entry);
  };

  $scope.cancelWatcher = function (entry) {
    entry.cancel();
    $scope.events.splice($scope.events.indexOf(entry), 1);
  };
}]);

module.exports = {
  name: 'Debug',
  url: '/debug',
  parent: '/',
  socketStatus: true,
  templateUrl: '/debug.html',
  controller: 'debug'
};
