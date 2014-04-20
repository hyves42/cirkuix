angular.module('plox', [])
	.filter('topath', function() {
		return function(data) {
			var out ="M "
			for (var i=0; i < data.length; i++){
				var p = data[i];
				out += p.x + ' ' + p.y + ' ';
			}
			return out;
		};
	})
	.directive('ploxSvg', function() {
		return {
			scope: {
				graph: '='
			},
			restrict: 'AE',
			replace: 'true',
			template: '<svg ng-attr-width="{{graph.width}}" ng-attr-height="{{graph.height}}">'
			+'<path ng-repeat="d in graph.data" ng-attr-d="{{ d.points | topath }}" style="fill:none;stroke:#{{ d.color }};stroke-width:1;"/>'
			+'</svg>'
		};
	})
;

