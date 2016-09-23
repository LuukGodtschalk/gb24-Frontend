angular.module('gb24').controller('gb24SocketStatus', ['$scope', '$timeout', 'eventManager', function ($scope, $timeout, eventManager) {
  eventManager.watch('connection_status', function (msg, oldData) {
    $timeout(function () {
      $scope.status = msg.data;
    });
  });
}]);
