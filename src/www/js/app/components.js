define(function (require) {
var app = require('gb24');

app.controller('gb24TabController', ['$scope', function ($scope) {
  $scope.tabs = [require('app/participants'), require('app/categories')];
  $scope.activeTab = 1;
  $scope.setTab = function (id) {
    $scope.activeTab = id;
    console.log('set tab %s', id);
  };
}]);
});
