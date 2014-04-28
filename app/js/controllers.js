'use strict';




/* Controllers */

angular.module('myApp.controllers', [])
  .controller('FiltersRC', ['$scope', function($scope) {


	$scope.r1 = "100k";
	$scope.c1 = "20u";
	$scope.tau="0";

	$scope.filterOptions = ["Low Pass", "High Pass"];
	$scope.filterType = "High Pass";

	$scope.constrain_r= true;
	$scope.constrain_c= true;
	$scope.constrain_freq = false;
	$scope.constrain_tau = false;
	$scope.last_constrain = "c";


	$scope.amplitude_bode = {
		'width': 400, 
		'height': 400,
		'xProperties':{'drawAxis':true, 'grid':'dashed', 'gridColor':'#888888', 'min':-1, 'max':1000},
		'yProperties':{'drawAxis':true, 'grid':'dashed', 'gridColor':'#333333', 'min':-100, 'max':10},
		'xGrid':[],
		'yGrid':[],
		'data':[
			{
							'name':'Amplitude',
							'color':'#1533ad',
							'width':3,
							'points':[]
			}
		]
	};	


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
		if (countCountraints() != 2) return;

		var constrainFreq = $scope.constrain_freq;

		if ($scope.constrain_tau){
			var tau = floatFromUnitString($scope.tau);
			var f = 1/(2*Math.PI*tau);
			$scope.freq = unitStringfromFloat(f);
			constrainFreq = true;
		}

		if ($scope.constrain_r && $scope.constrain_c){
			var r = floatFromUnitString($scope.r1);
			var c = floatFromUnitString($scope.c1);
			var tau = r*c;
			var f = 1/(2*Math.PI*tau);

			$scope.freq = unitStringfromFloat(f);
			$scope.tau = unitStringfromFloat(tau);
		}

		if ($scope.constrain_r && constrainFreq){
			var r = floatFromUnitString($scope.r1);
			var f = floatFromUnitString($scope.freq);
			var c = 1/(2*Math.PI*r*f);
			var tau = r*c;
			var f = 1/(2*Math.PI*tau);

			$scope.r1 = unitStringfromFloat(r);
			$scope.c1 = unitStringfromFloat(c);
			$scope.freq = unitStringfromFloat(f);
			$scope.tau = unitStringfromFloat(tau);
		}

		if ($scope.constrain_c && constrainFreq){
			var c = floatFromUnitString($scope.c1);
			var f = floatFromUnitString($scope.freq);
			var r = 1/(2*Math.PI*c*f);
			var tau = r*c;
			var f = 1/(2*Math.PI*tau);

			$scope.r1 = unitStringfromFloat(r);
			$scope.c1 = unitStringfromFloat(c);
			$scope.freq = unitStringfromFloat(f);
			$scope.tau = unitStringfromFloat(tau);
		}

		var f = floatFromUnitString($scope.freq);
		var tau = floatFromUnitString($scope.tau);
		if ($scope.filterType === "Low Pass"){
			ploxAmplitudeBode($scope.amplitude_bode, [1], [1, tau], f/1000, f*1000);
		}
		else{
			ploxAmplitudeBode($scope.amplitude_bode, [0,1], [1/tau, 1], f/1000, f*1000);
		}
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
