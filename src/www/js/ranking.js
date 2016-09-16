console.log(app);
var app = angular.module('gb24');

app.controller('gb24Ranking', ['$scope', 'eventManager', '$routeParams', function ($scope, eventManager, $routeParams) {
  var categoryId = $routeParams.categoryId;
  $scope.participants = [];
  eventManager.watch('ranking/' + categoryId, function (msg) {
    console.log(msg.data);
    $scope.participants = msg.data;
  });
}]);

module.exports = {
  name: 'Deelnemers',
  url: '/klassement/:categoryId',
  parent: '/',
  templateUrl: '/ranking.html',
  controller: 'gb24Ranking'
};
