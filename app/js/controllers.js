'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

	$scope.r_str = "100k";
	$scope.c_str = "20µ";
	$scope.tau = 0.00001;

	
	$scope.updateCircuitValues = function () {
		//Dummy test
		$scope.tau += 1;
	};


  }])
  .controller('MyCtrl2', [function() {
  }]);
