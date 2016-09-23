var app = angular.module('gb24');

app.controller('gb24ParticipantDetails', ['$scope', 'eventManager', '$routeParams', function ($scope, eventManager, $routeParams) {
  var participantId = $routeParams.participantId;
  $scope.data = [];
  eventManager.watch('participants/' + participantId, function (msg) {
    var laps = msg.data.laps;
    for (var n = 0; n < laps.length; n++) {
      laps[n].lapnum = n+1;
      if (n>0) {
        laps[n].laptime = (new Date(laps[n].time)) - (new Date(laps[n-1].time));
      }
    }
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
