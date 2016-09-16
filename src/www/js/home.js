
angular.module('gb24').controller('gb24Home', ['$rootScope', 'eventManager', function ($rootScope, eventManager) {
  //$rootScope.endtime = new Date(2016, 8, 24, 13, 0);
}]);

module.exports = {
  id: 1,
  name: 'Welkom op GB24!',
  url: '/',
  parent: null,
  templateUrl: '/home.html',
  iconUrl: '/img/home.png',
  controller: 'gb24Home'
};
