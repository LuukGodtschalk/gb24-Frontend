var app = angular.module('gb24');

app.controller('gb24ParticipantDetails', ['$scope', 'eventManager', '$routeParams', function ($scope, eventManager, $routeParams) {
  var participantId = $routeParams.participantId;
  $scope.data = [];
  eventManager.watch('participants/' + participantId, function (msg) {
    $scope.data = msg.data;
  });
}]);

module.exports = {
  name: 'Details',
  url: '/deelnemers/:participantId',
  parent: '/deelnemers/',
  socketStatus: true,
  templateUrl: '/participantDetails.html',
  controller: 'gb24ParticipantDetails'
};
