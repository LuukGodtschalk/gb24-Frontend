define(function (require) {

var angular = require('angular');
console.log(angular);
var gb24 = angular.module('gb24', []);
gb24.controller('gb24Participants', ['$scope', '$http', require('app/participants')]);

});