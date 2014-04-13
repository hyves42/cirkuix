'use strict';




/* Controllers */

angular.module('myApp.controllers', [])
  .controller('FiltersRC', ['$scope', function($scope) {

	$scope.r_str = "100k";
	$scope.c_str = "20µ";
	$scope.tau = 0.00001;

	
	$scope.updateCircuitValues = function () {
		//Dummy test
		$scope.tau += 1;
	};

	$scope.updateR = function () {
		
		var str = $scope.r_str;
		var r =0;

		try{
			r = floatFromUnitString(str);
			$scope.r = r;
			$scope.r_str = unitStringfromFloat(r);
		}
		catch(err){
			$scope.r_str = "err"
		}
	};

	$scope.updateC = function () {

		var str = $scope.c_str;
		var c=0;

		try{
			c = floatFromUnitString(str);
			$scope.c = c;
			$scope.c_str = unitStringfromFloat(c);
		}
		catch(err){
			$scope.c_str = "err"
		}
	};

  }])
  .controller('MyCtrl2', [function() {
  }]);
