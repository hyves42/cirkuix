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
					scope.$apply(function () {
						ngModel.$setViewValue(unitStringfromFloat(scope[attrs.ngModel+"_float"]));
						ngModel.$render();
						ngModel.$setValidity('format', true);
					});
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
					//	return undefined;
					}

					return filteredInput;

				});

			}
		};
	});

