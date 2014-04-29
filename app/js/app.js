'use strict';


// Declare app level module which depends on filters, and services
angular.module('cirkuix', [
  'ngRoute',
  'cirkuix.filters',
  'cirkuix.services',
  'cirkuix.directives',
  'cirkuix.controllers',
  'plox'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: ''});
  $routeProvider.when('/filters/rc', {templateUrl: 'partials/filters-rc.html', controller: 'FiltersRC'});
  $routeProvider.when('/filters/pwm/rc', {templateUrl: 'partials/filters-pwm-rc.html', controller: 'FiltersRC'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
