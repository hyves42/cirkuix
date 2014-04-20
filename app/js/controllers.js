'use strict';




/* Controllers */

angular.module('myApp.controllers', [])
  .controller('FiltersRC', ['$scope', function($scope) {


	$scope.r1 = "100k";
	$scope.c1 = "20u";
	$scope.tau="0";
	

	$scope.constrain_r= true;
	$scope.constrain_c= true;
	$scope.constrain_freq = false;
	$scope.constrain_tau = false;
	$scope.last_constrain = "c"

	$scope.updateCircuitValues = function () {
		//Dummy test
		$scope.tau_float += 1;
	};


	$scope.update_r = function () {
		$scope.constrain_r= true;
		$scope.updateConstrain_r();
	}

	$scope.update_c = function () {
		$scope.constrain_c= true;
		$scope.updateConstrain_c();
	}

	$scope.update_freq = function () {
		$scope.constrain_freq = true;
		$scope.updateConstrain_freq();
	}

	$scope.update_tau = function () {
		$scope.constrain_tau = true;
		$scope.updateConstrain_tau();
		$scope.r1 = "120k";
	}


	$scope.updateConstrain_r = function () {
		if ($scope.constrain_r == false) return;

		if (countCountraints() <= 2){
			$scope.last_constrain = "r"
			return;
		}

		if ( $scope.constrain_freq && $scope.last_constrain !== "freq"){
			$scope.constrain_freq = false;
		}
		if ( $scope.constrain_tau && $scope.last_constrain !== "tau"){
			$scope.constrain_tau = false;
		}		
		if ( $scope.constrain_c && $scope.last_constrain !== "c"){
			$scope.constrain_c = false;
		}

		$scope.last_constrain = "r"
	}

	$scope.updateConstrain_c = function () {
		if ($scope.constrain_c == false){
			console.log("nooope");
			return;
		}

		if (countCountraints() <= 2){
			$scope.last_constrain = "c"
			return;
		}

		if ( $scope.constrain_freq && $scope.last_constrain !== "freq"){
			$scope.constrain_freq = false;
		}
		if ( $scope.constrain_tau && $scope.last_constrain !== "tau"){
			$scope.constrain_tau = false;
		}		
		if ( $scope.constrain_r && $scope.last_constrain !== "r"){
			$scope.constrain_r = false;
		}
		$scope.last_constrain = "c"

	}

	$scope.updateConstrain_freq = function () {
		if ($scope.constrain_freq == false) return;

		if ($scope.constrain_tau == true){
			$scope.constrain_tau = false;
			$scope.last_constrain = "freq"
			return;
		}

		if (countCountraints() <= 2){
			$scope.last_constrain = "freq"
			return;
		} 

		if ( $scope.constrain_c && $scope.last_constrain !== "c"){
			$scope.constrain_c = false;
		}
		if ( $scope.constrain_r && $scope.last_constrain !== "r"){
			$scope.constrain_r = false;
		}
		$scope.last_constrain = "freq";
	}

	$scope.updateConstrain_tau = function () {
		
		if ($scope.constrain_tau == false) return;

		if ($scope.constrain_freq == true){
			$scope.constrain_freq = false;
			$scope.last_constrain = "tau";
			return;
		}

		if (countCountraints() <= 2){
			$scope.last_constrain = "tau"
			return;
		}

		if ( $scope.constrain_c && $scope.last_constrain !== "c"){
			$scope.constrain_c = false;
		}
		if ( $scope.constrain_r && $scope.last_constrain !== "r"){
			$scope.constrain_r = false;
		}
		$scope.last_constrain = "tau";
	}

	$scope.computeCircuit = function() {

	}

	var countCountraints = function(){
		var count = 0;
		if ($scope.constrain_r) count++;
		if ($scope.constrain_c) count++;
		if ($scope.constrain_freq) count++;
		if ($scope.constrain_tau) count++;

		return count;
	}


  }])
  .controller('MyCtrl2', [function() {
  }]);
