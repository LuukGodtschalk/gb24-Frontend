console.log(app);
var app = angular.module('gb24');

app.controller('gb24Participants', ['$scope', 'eventManager', function ($scope, eventManager) {
  $scope.participants = [];
  eventManager.watch('participants', function (msg) {
    console.log(msg.data);
    $scope.participants = msg.data;
  });
}]);

module.exports = {
  name: 'Deelnemers',
  url: '/deelnemers',
  parent: '/',
  templateUrl: '/participants.html',
  controller: 'gb24Participants'
};
