toClr = function(color) {
	color = color.toUpperCase();
	clr = color.split(' ');
	if (clr.length == 1)
		clr = color.split(',');
	if (clr.length == 1)
		clr = color.split(';');
	if (clr.length == 1) {
		clr = clr[0].split('');
		if (clr[0] == '#')  {
			if (clr.length == 4 || clr.length == 7) {
				symbols = '0123456789ABCDEF';
				wrongsymbols = [];
				for (i = 1; i < clr.length; ++i) {
					if (symbols.indexOf(clr[i]) == -1)
						wrongsymbols.push(clr[i]);
				}
				if ((len = wrongsymbols.length) != 0){
					errorString = '';
					for (i = 0; i < len; ++i)
						errorString += wrongsymbols[i] + ' ';
					throw ('Wrong symbol(s) in Hex color: ' + errorString);
				}
				return color;
			} else throw('Wrong amount of symbols: should be #xxx or #xxxxxx');
		} else throw('Hex color should start with #');
	} else {
		if (clr.length == 3) {
			color = '#';
			for (i = 0; i < 3; ++i) {
				clr[i].replace(',',' ').replace(';',' ').replace('  ',' ');
				num = parseInt(clr[i]);
				if (num > 255 || num < 0 || isNaN(num))
					throw ('RGB color values should be from 0 to 255');
				num = num.toString(16);
				if (num.length < 2) num = '0' + num;
				color += num;
			}
			return color;
		}
		else throw('RGB color should consist three numbers');
	}
}
invertClr = function(color) {
	symbols = '0123456789ABCDEF'.split('');
	arr = color;
	arr = arr.toUpperCase().split('');
	clr = '';
	for (i = 0; i < arr.length; ++i) {
		for (j = 0; j < symbols.length; ++j) {
			if (arr[i] == symbols[j]) {
				arr[i] = symbols[15-j];
				break;
			}
		}
		clr = clr + arr[i];
	}
	return clr;	
}
function toRGB(color) {
	if (color.length == 7) return '' + parseInt(color.slice(1,3),16) + ' ' + parseInt(color.slice(3,5),16) + ' ' + parseInt(color.slice(5,7),16);
	else return '';
}
$(function(){
	$invert = $( '#invert' );
	$userdiv = $( '#userdiv' );
	$invertdiv = $( '#invertdiv' );
	$input = $( '#input' );
	$error = $( '#errorMessage' );
	$invert.click(function(){
		try {
			clr = toClr($input.val());
			$error.hide();
			$userdiv.css('background-color', clr.toUpperCase()).text(clr + '\n' + toRGB(clr)).css('color',invertClr(clr)).css('border-color',clr);
			$invertdiv.css('background-color', clr).text(clr + '\n' + toRGB(clr)).css('color', invertClr(clr)).css('border-color',clr);
		} catch(e) {
			$error.text(e).show();
		}
	});
});
