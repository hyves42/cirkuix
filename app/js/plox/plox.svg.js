angular.module('plox', [])
	.filter('topath', function() {
		return function(data, graph) {
			var h = graph.height;
			var ymin = graph.yProperties.min;
			var ymax = graph.yProperties.max;

			var w = graph.width;
			var xmin = graph.xProperties.min;
			var xmax = graph.xProperties.max;	

			var out ="M "
			for (var i=0; i < data.length; i++){
				var p = data[i];

				var x = p.x * (w-20) / (xmax-xmin) + 10 +xmin*(w-20)/(xmin-xmax);
				var y = p.y * (h-20) / (ymin-ymax) + 10 + ymax * (h-20) / (ymax-ymin);

				out += x + ' ' + y + ' ';
			}
			return out;
		};
	})
	.filter('convertX', function() {
		return function(x, graph) {
			var w = graph.width;
			var xmin = graph.xProperties.min;
			var xmax = graph.xProperties.max;			

			return x * (w-20) / (xmax-xmin) + 10 +xmin*(w-20)/(xmin-xmax);
		};
	})
	.filter('convertY', function() {
		return function(y, graph) {
			var h = graph.height;
			var ymin = graph.yProperties.min;
			var ymax = graph.yProperties.max;

			return y * (h-20) / (ymin-ymax) + 10 + ymax * (h-20) / (ymax-ymin);
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

+	'<g ng-switch="graph.xProperties.grid">'
+		'<g ng-switch-when="dashed">'
+			'<path ng-repeat="g in graph.xGrid" '
+				'ng-attr-d="M {{g.x | convertX:graph}} {{graph.yProperties.min | convertY:graph}} '
+					'L {{g.x | convertX:graph}} {{graph.yProperties.max | convertY:graph}}" '
+				'style="fill:none;stroke:#{{graph.xProperties.gridColor}};'
+				'stroke-width:1;stroke-dasharray:3,3"/>'
+		'</g>'
+		'<g ng-switch-when="solid">'
+			'<path ng-repeat="g in graph.xGrid" '
+				'ng-attr-d="M {{g.x | convertX:graph}} {{graph.yProperties.min | convertY:graph}} '
+					'L {{g.x | convertX:graph}} {{graph.yProperties.max | convertY:graph}}" '
+				'style="fill:none;stroke:#{{graph.xProperties.gridColor}};'
+				'stroke-width:1;"/>'
+		'</g>'
+		'<g ng-switch-when="caret">'
+			'<path ng-repeat="g in graph.xGrid" '
+				'ng-attr-d="M {{g.x | convertX:graph}} {{(0 | convertY:graph) - 2}} '
+					'l 0 4" '
+				'style="fill:none;stroke:#000000;'
+				'stroke-width:1;"/>'
+		'</g>'
+		'<g ng-switch-default>'
+		'</g>'
+	'</g>'

+	'<g ng-switch="graph.yProperties.grid">'
+		'<g ng-switch-when="dashed">'

+			'<path ng-repeat="g in graph.yGrid" '
+				'ng-attr-d="M {{graph.xProperties.min | convertX:graph}} {{g.y | convertY:graph}} '
+					' L {{graph.xProperties.max | convertX:graph}} {{g.y | convertY:graph}}" '
+				'style="fill:none;stroke:#{{graph.yProperties.gridColor}};'
+				'stroke-width:1;stroke-dasharray:3,3"/>'
+		'</g>'
+		'<g ng-switch-when="solid">'
+			'<path ng-repeat="g in graph.yGrid" '
+				'ng-attr-d="M {{graph.xProperties.min | convertX:graph}} {{g.y | convertY:graph}} '
+					' L {{graph.xProperties.max | convertX:graph}} {{g.y | convertY:graph}}" '
+				'style="fill:none;stroke:#{{graph.yProperties.gridColor}};'
+				'stroke-width:1;"/>'
+		'</g>'
+		'<g ng-switch-when="caret">'
+			'<path ng-repeat="g in graph.yGrid" '
+				'ng-attr-d="M {{(0 | convertX:graph)-2 }} {{g.y | convertY:graph}} '
+					' l 4 0" '
+				'style="fill:none;stroke:#000000;'
+				'stroke-width:1;"/>'
+		'</g>'
+		'<g ng-switch-default>'
+		'</g>'
+	'</g>'

+	'<g ng-switch="graph.xProperties.drawAxis">'
+		'<g ng-switch-when="true">'
+			'<path ng-attr-d="M {{graph.xProperties.min | convertX:graph }} {{ 0| convertY:graph }} '
+				'L {{(graph.xProperties.max | convertX:graph) + 6}} {{ 0| convertY:graph }}"'
+			' style="fill:none;stroke:#000000;stroke-width:1"/>'

+			'<path ng-attr-d="M {{(graph.xProperties.max | convertX:graph) + 6 }} {{ 0 | convertY:graph }} l -5 -2"'
+			' style="fill:none;stroke:#000000;stroke-width:1"/>'
+			'<path ng-attr-d="M {{(graph.xProperties.max | convertX:graph) + 6 }} {{ 0 | convertY:graph }} l -5 2"'
+			' style="fill:none;stroke:#000000;stroke-width:1"/>'

+		'</g>'			
+		'<g ng-switch-default>'
+		'</g>'
+	'</g>'

+	'<g ng-switch="graph.yProperties.drawAxis">'
+		'<g ng-switch-when="true">'
+			'<path ng-attr-d="M {{ 0 | convertX:graph }} {{graph.yProperties.min | convertY:graph}} '
+				' L {{0 | convertX:graph }} {{ (graph.yProperties.max| convertY:graph) -6 }}"'
+			' style="fill:none;stroke:#000000;stroke-width:1"/>'

+			'<path ng-attr-d="M {{ 0 | convertX:graph }} {{(graph.yProperties.max | convertY:graph) -6}} l -2 5"'
+			' style="fill:none;stroke:#000000;stroke-width:1"/>'

+			'<path ng-attr-d="M {{ 0 | convertX:graph }} {{(graph.yProperties.max | convertY:graph) -6}} l 2 5"'
+			' style="fill:none;stroke:#000000;stroke-width:1"/>'

+		'</g>'			
+		'<g ng-switch-default>'
+		'</g>'
+	'</g>'

+	'<path ng-repeat="d in graph.data" ng-attr-d="{{ d.points | topath:graph }}" '
+		'style="fill:none;stroke:#{{ d.color }};stroke-width:{{d.width}};stroke-linecap:round"/>'

+'</svg>'
		};
	})

;

