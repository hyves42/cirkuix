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
								scope[attrs.ngModel+"_float"] = r

								ngModel.$setViewValue(unitStringfromFloat(r));
								ngModel.$render();
							}
							catch(err){
								ngModel.$setValidity('format', false);
								scope[attrs.ngModel+"_float"] = undefined;
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
						scope[attrs.ngModel+"_float"] = r
						return filteredInput;
					}
					catch(err){
						ngModel.$setValidity('format', false);
						scope[attrs.ngModel+"_float"] = undefined;
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
	});

