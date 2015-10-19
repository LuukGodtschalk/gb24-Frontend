define(function (require, app) {
  var app = require('angular');
  console.log(require, app);
  app.module('gb24').controller('gb24TabController', ['$scope', function($scope) {
    $scope.tabs = [require('app/participants'), require('app/categories')];
    $scope.activeTab = 1;
    $scope.setTab = function(id) {
      $scope.activeTab = id;
      console.log('set %s', id);
    }
    console.log('declared setTab()');
  }]);
});
