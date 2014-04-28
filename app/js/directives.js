'use strict';

/* Directives */


angular.module('myApp.directives', [])
	.directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
		elm.text(version);
		};
	}])

	.directive('elecNumbersOnly', function(){
		return {
			restrict: 'AE',
			require: 'ngModel',

			link: function(scope, element, attrs, ngModel) {

				element.on('blur', function() {
					if (ngModel.$valid){
						scope.$apply(function () {
							try{
								var r = floatFromUnitString(ngModel.$viewValue);
								ngModel.$setValidity('format', true);

								ngModel.$setViewValue(unitStringfromFloat(r));
								ngModel.$render();
							}
							catch(err){
								ngModel.$setValidity('format', false);
							}
						});
					}
				});

				ngModel.$parsers.push(function (inputValue) {

					if (inputValue == undefined) return '' 

					var filteredInput = inputValue.replace(/[^0-9,^TGMkmunp,^\\.,^µ]/g, ''); 
					if (filteredInput!=inputValue) {
						ngModel.$setViewValue(filteredInput);
						ngModel.$render();
					}


					try{
						var r = floatFromUnitString(filteredInput);
						ngModel.$setValidity('format', true);
						return filteredInput;
					}
					catch(err){
						ngModel.$setValidity('format', false);
						return undefined;
					}

					return filteredInput;

				});

			}
		};
	})

	.directive('btnCheckbox', function() {
		return {    
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {

				element.bind("click", function() {
					scope.$apply(function() {
						ngModel.$setViewValue(element.hasClass("active") ? false : true);
					});
				});

				scope.$watch(function() {
					return ngModel.$modelValue;
				}, function(modelValue) {
					if (angular.equals(modelValue, true)) {
						element.addClass("active");  
					} else {
						element.removeClass("active");  
					}
				});


			}
		};
	})

	.directive('buttonsRadio', function() {
		return {
			restrict: 'E',
			scope: { model: '=', options:'='},
			controller: function($scope){
				$scope.activate = function(option){
					console.log("activate "+option);
					$scope.model = option;
				};
			},
			template: "<button type='button' class='btn' "+
				"ng-class='{active: option == model}'"+
				"ng-repeat='option in options' "+
				"ng-click='activate(option)'>{{option}} "+
				"</button>"
		};
	});