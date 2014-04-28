
// N : nominator of the laplace function. ex : [1]
// D : denominator of laplace function ex : [1, 2] for 1/(1+2p)
function ploxAmplitudeBode (plox, N, D, startFreq, endFreq) {
	//Find a good clean start frequency
	startFreq=Math.pow(10, Math.floor(log10(startFreq)));

	if (startFreq > 1){
		startFreq = 1;
	}

	plox.data[0].points = [];
	var ymax = 0, ymin = 0;


	// Draw amplitude graph
	for (var f = startFreq; f<endFreq; f *=1.2){
		var Nr = 0, Ni = 0, Dr = 0, Di = 0;

		var sign = 1;
		for (var i = 0; i<N.length; i+=2){
			Nr += sign*N[i]*Math.pow(2*Math.PI*f, i);
			sign = -sign;
		}

		sign = 1;
		for (var i = 1; i<N.length; i+=2){
			Ni += sign*N[i]*Math.pow(2*Math.PI*f, i);
			sign = -sign;
		}		

		sign = 1;
		for (var i = 0; i<D.length; i+=2){
			Dr += sign*D[i]*Math.pow(2*Math.PI*f, i);
			sign = -sign;
		}		

		sign = 1;
		for (var i = 1; i<D.length; i+=2){
			Di += sign*D[i]*Math.pow(2*Math.PI*f, i);
			sign = -sign;
		}		

		var y = 10*log10(Nr*Nr+Ni*Ni)-10*log10(Dr*Dr+Di*Di);
		if (y < ymin){
			ymin = y;
		}
		if (y > ymax){
			ymax = y;
		}

		plox.data[0].points.push({
			'x':log10(f), 
			'y':y
		});
	}

	// Set graph dimensions
	plox.xProperties.min = log10(startFreq);
	plox.xProperties.max = log10(endFreq);

	plox.yProperties.min = ymin-5;
	plox.yProperties.max = ymax+5;


	// Draw grid
	plox.yGrid = [];
	for (var g = 0.1, gain = 20; g > 0.0001; g /= 10, gain +=20){
		plox.yGrid.push({
			'label':'-'+gain+'dB',
			'y':20*log10(g)
		});
	}

	plox.xGrid = [];
	for (var f = startFreq; f<endFreq; f *=10){
		for (var ff = f; ff<f*10; ff+=f){
			plox.xGrid.push({
				'label':(ff==f)?unitStringfromFloat(f):'',
				'x':log10(ff)
			});
		}
	}
}