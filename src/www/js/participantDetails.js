var app = angular.module('gb24');

app.controller('gb24ParticipantDetails', ['$scope', 'eventManager', '$routeParams', function ($scope, eventManager, $routeParams) {
  var participantId = $routeParams.participantId;
  $scope.data = [];
  eventManager.watch('participants/' + participantId, function (msg) {
    var laps = msg.data.laps;
    var lapTotal = 0;
    for (var n = 0; n < laps.length; n++) {
      laps[n].lapnum = n+1;
      var lapStart;
      var lapEnd = new Date(laps[n].time);
      if (n>0) {
        lapStart = new Date(laps[n-1].time);
      } else {
        //TODO: use start time from categories.json
        console.log(msg.data);
        if (msg.data.categoryId === 4) {
          lapStart = new Date(2016, 8, 25, 8, 0);
        } else {
          lapStart = new Date(2016, 8, 24, 12, 59, 40);
        }
      }
      laps[n].laptime = lapEnd - lapStart;
      lapTotal += laps[n].laptime;
    }
    if (laps.length > 0) {
      msg.data.lapAvg = lapTotal / laps.length;
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
