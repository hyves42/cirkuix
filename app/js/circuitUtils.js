

function factorFromUnit(c){
	var mul = 0;

	switch(c){
		case 'T':
			mul = 1000000000000;
			break;
		case 'G':
			mul = 1000000000;
			break;
		case 'M':
			mul = 1000000;
			break;
		case 'k':
			mul = 1000;
			break;
		case 'm' :
			mul = 0.001;
			break;
		case 'µ':
		case 'u':
			mul = 0.000001;
			break;
		case 'n':
			mul = 0.000000001;
			break;
		case 'p':
			mul = 0.000000000001;
			break;
		default:
			throw("Invalid unit");
	}
	return mul;
}



function floatFromUnitString(str){
	var val = 0;
	var  multiplier = 0;

	if (isNaN(str)){
		var subStr  = str.substring(0, str.length-1) ;
		if (isNaN(subStr)) throw("Invalid format");
		
		val = Number(subStr);
		multiplier = factorFromUnit(str[str.length-1]);
		return val*multiplier;
	}
	else{
		val = Number(str);
		return val;
	}
}

function roundTwoFigures(num){
	var mul =1;
	while(num >=10){
		num /= 10;
		mul *= 10;
	}
	return mul*Math.round(num*10)/10;
}

function unitStringfromFloat(flt){
	var unit = -1;

	if (flt == 0) return "0";

	if (flt > 1){
		while (flt >= 1000){
			flt = flt/1000;
			unit++;
		}
		flt = roundTwoFigures(flt);

		if (unit >= 0){
			return flt+"kMGT"[unit];
		}
		else return flt + "";
	}
	else{
		while (flt < 1){
			flt = flt*1000;
			unit++;
		}

		flt = roundTwoFigures(flt);

		if (unit >= 0){
			return flt+"mµnpf"[unit];
		}
		else return flt+"";
	}
}