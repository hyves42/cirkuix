'use strict';




/* Controllers */

angular.module('myApp.controllers', [])
  .controller('FiltersRC', ['$scope', function($scope) {

	$scope.r1 = "100k";
	$scope.c1 = "20u";
	$scope.tau=0;
	
	$scope.updateCircuitValues = function () {
		//Dummy test
		$scope.tau += 1;
	};


  }])
  .controller('MyCtrl2', [function() {
  }]);
