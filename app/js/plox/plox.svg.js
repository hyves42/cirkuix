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
			template: 
'<svg ng-attr-width="{{graph.width}}" ng-attr-height="{{graph.height}}">'
+	'<g ng-attr-transform="matrix('
+		'{{ graph.width / (graph.xProperties.max-graph.xProperties.min)}}, 0, 0,'
+		'{{ graph.height / (graph.yProperties.min-graph.yProperties.max)}},'
+		'{{ graph.xProperties.min * graph.width / (graph.xProperties.min-graph.xProperties.max)}},'
+		'{{ graph.yProperties.max * graph.height / (graph.yProperties.max-graph.yProperties.min)}})">'

+		'<g ng-switch="graph.xProperties.drawAxis">'
+			'<g ng-switch-when="true">'
+				'<path ng-attr-d="M {{graph.xProperties.min}} 0 H {{ graph.xProperties.max-graph.xProperties.min }}"'
+				' style="fill:none;stroke:#000000;stroke-width:{{(graph.xProperties.max-graph.xProperties.min)/graph.width}}"/>'

+				'<path ng-attr-d="M {{graph.xProperties.max - 3}} 1 l 3 -1 l -3 -1"'
+				' style="fill:none;stroke:#000000;stroke-width:{{(graph.xProperties.max-graph.xProperties.min)/graph.width}}"/>'

+			'</g>'			
+			'<g ng-switch-default>'
+			'</g>'
+		'</g>'

+		'<g ng-switch="graph.yProperties.drawAxis">'
+			'<g ng-switch-when="true">'
+				'<path ng-attr-d="M 0 {{graph.yProperties.min}} V {{ graph.yProperties.max-graph.yProperties.min }}"'
+				' style="fill:none;stroke:#000000;stroke-width:{{(graph.xProperties.max-graph.xProperties.min)/graph.width}}"/>'

+				'<path ng-attr-d="M 1 {{graph.yProperties.max - 3}} l -1 3 l -1 -3"'
+				' style="fill:none;stroke:#000000;stroke-width:{{(graph.xProperties.max-graph.xProperties.min)/graph.width}}"/>'

+			'</g>'			
+			'<g ng-switch-default>'
+			'</g>'
+		'</g>'

+		'<path ng-repeat="g in graph.xGrid" ng-attr-d="M {{g.x}} {{graph.yProperties.min}} V {{ graph.yProperties.max-graph.yProperties.min }}" '
+			'style="fill:none;stroke:#222222;stroke-width:{{(graph.xProperties.max-graph.xProperties.min)/graph.width}};stroke-dasharray:1,1"/>'

+		'<path ng-repeat="g in graph.yGrid" ng-attr-d="M {{graph.xProperties.min}} {{g.y}} H {{ graph.xProperties.max-graph.xProperties.min }}" '
+			'style="fill:none;stroke:#222222;stroke-width:{{(graph.xProperties.max-graph.xProperties.min)/graph.width}};stroke-dasharray:1,1"/>'


+		'<path ng-repeat="d in graph.data" ng-attr-d="{{ d.points | topath }}" '
+			'style="fill:none;stroke:#{{ d.color }};stroke-width:{{d.width*(graph.xProperties.max-graph.xProperties.min)/graph.width}};stroke-linecap:round"/>'
+	'</g>'
+'</svg>'
		};
	})

;

