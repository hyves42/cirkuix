'use strict';




/* Controllers */

angular.module('myApp.controllers', [])
  .controller('FiltersRC', ['$scope', function($scope) {

	$scope.r1 = "100k";
	$scope.c1 = "20u";
	$scope.tau=0;
	$scope.constrain_r= true;
	
	$scope.updateCircuitValues = function () {
		//Dummy test
		$scope.tau_float += 1;
	};

	$scope.updateCircuitConstraints = function () {
		$scope.tau_float += 10;
	};


  }])
  .controller('MyCtrl2', [function() {
  }]);
