'use strict';


// Declare app level module which depends on filters, and services
angular.module('cirkuix', [
  'ngRoute',
  'cirkuix.filters',
  'cirkuix.services',
  'cirkuix.directives',
  'cirkuix.controllers.filters',
  'cirkuix.controllers.pwm',  
  'plox'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: ''});
  $routeProvider.when('/filters/rc', {templateUrl: 'partials/filters-rc.html', controller: 'FiltersRC'});
  $routeProvider.when('/filters/pwm/rc', {templateUrl: 'partials/filters-pwm-rc.html', controller: 'FiltersRC'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
