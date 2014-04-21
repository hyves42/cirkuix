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
							'color':'#00ff00',
							'width':1,
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

		updateGraph();
	}


	var updateGraph = function() {
		var startfreq = floatFromUnitString($scope.freq) / 1000;
		var endfreq = floatFromUnitString($scope.freq)*1000;
		var tau2 = Math.pow(2*Math.PI*floatFromUnitString($scope.tau), 2);

		//Find a good clean start frequency
		startfreq=Math.pow(10, Math.floor(Math.log10(startfreq)));
	//	startfreq=Math.min(startfreq, 1);

		$scope.amplitude_bode.data[0].points = [];

		for (var f = startfreq; f<endfreq; f *=1.2){
			$scope.amplitude_bode.data[0].points.push({
				'x':Math.log10(f), 
				'y':-10*Math.log10(1+tau2*f*f)
			});
		}

		$scope.amplitude_bode.xProperties.min = Math.log10(startfreq);
		$scope.amplitude_bode.xProperties.max = Math.log10(endfreq);

		$scope.amplitude_bode.yProperties.min = 20*Math.log10(0.0001);
		$scope.amplitude_bode.yProperties.max = 1;

		$scope.amplitude_bode.yGrid = [];
		for (var g = 0.1, gain = 20; g > 0.0001; g /= 10, gain +=20){
			$scope.amplitude_bode.yGrid.push({
				'label':'-'+gain+'dB',
				'y':20*Math.log10(g)
			});
		}

		$scope.amplitude_bode.xGrid = [];
		for (var f = startfreq; f<endfreq; f *=10){
			for (var ff = f; ff<f*10; ff+=f){
				$scope.amplitude_bode.xGrid.push({
					'label':(ff==f)?unitStringfromFloat(f):'',
					'x':Math.log10(ff)
				});
			}
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
