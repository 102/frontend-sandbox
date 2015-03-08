function execute(string, input) {
	i = 0; //main counter
	q = 0; //input counter
	arr = [];
	brackets_total = 0;
	for (j = 0; j < 30000; ++j) {
		arr.push(0);
	}
	state = function(j) {
		console.log('i: ' + i + ', arr[i]: ' + arr[i] + ', com: ' + string.charAt(j) + ', j: ' + j);
	}
	if ((left = string.split('[').length) != (right = string.split(']').length))
		return 'amount of left brackets: ' + (left-1) + ' != amount of right brackets: ' + (right - 1);
	else brackets_total = left-1;
	
	output = '';
	j = 0;
	while (j < string.length && arr[i] < 128) {
		switch (string.charAt(j)) {
			case '>': state(j); i++; break;
			case '<': state(j); i--; break;
			case '+': state(j); arr[i]++; break;
			case '-': state(j); arr[i]--; break;
			case '.': state(j); output += String.fromCharCode(arr[i]); break;
			case ',': state(j); arr[i] = input.charCodeAt(q++); break;
			case '[': {
				state(j);
				if (arr[i] <= 0) {
					t = string.length-1;
					stack = [];
					while (t > j) {
						if (string.charAt(t) == ']')
							stack.push(t);
						if (string.charAt(t) == '[')
							stack.pop();
						t--;
					}
					console.log('['+j+' ]'+stack[stack.length-1]);
					j = stack[stack.length-1];
				}
				break;
			}
			case ']': {
				state(j);
				stack = [];
				t = 0;
				while (t < j) {
					if (string.charAt(t) == '[')
						stack.push(t);
					if (string.charAt(t) == ']')
						stack.pop();
					t++;
				}
				console.log(']'+j+' ['+(stack[stack.length-1]-1));
				j = stack[stack.length-1]-1;
				break;
			}
		}
		j++;
	}
	return output;
}

$(function(){
		$( '#run' ).click(function(){
			$( '#output' ).text(execute($( '#code' ).val(), $( '#input').val()));
		});
});
