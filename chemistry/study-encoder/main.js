const words = [
	"you ",
	"should ",
	"stud", "y "
];

window.onload = function() {
  const reg = document.getElementById("reg");
  const enc = document.getElementById("enc");
  window.addEventListener("keyup",function(){
    var inactiveElement;
    if (document.activeElement == reg) {
      inactiveElement = enc;
	  enc.value = encode(reg.value);
    } else if (document.activeElement == enc) {
      inactiveElement = reg;
	  reg.value = decode(enc.value);
    }
    //inactiveElement.value = document.activeElement.value;
  });
}

function encode(string){
	var byteString = "";
	var finalString = "";
	for (var i = 0; i < string.length; i++){
		try {
			byteString += toByteString(string.charCodeAt(i));
		} catch (e) {
			console.log(e);
		}
	}
	
	for (var i = 0; i < byteString.length; i++){
		finalString += byteString[i] == "1" ? words[i % words.length].toUpperCase() : words[i % words.length].toLowerCase();
	}
	
	console.log(byteString);
	
	return finalString
}

function decode(string){
	var byteString = "";
	var finalString = "";
	var segments = [string];
	
	var i = 0;
	var j = 0;
	//var s = 0;
	while (segments[segments.length - 1].length > words[i % words.length].length/*|| s > 1000*/) {
		j = words[i % words.length].length;
		var split = splitString(segments[segments.length - 1], j);
		segments.pop();
		segments.push(split[0]);
		segments.push(split[1]);
		i++;
		//s += 1;
	}
	console.log(segments);
	
	for (var n = 0; n < segments.length; n++) {
		if (segments[n][0] == segments[n][0].toUpperCase()){
			//It's upper case
			byteString += "1";
		} else {
			byteString += "0";
		}
	}
	
	console.log(byteString);
	
	for (var n = 0; n < byteString.length; n += 8) {
		finalString += String.fromCharCode(parseInt(byteString.substring(n, n + 8),2));
	}
	console.log(finalString);
	return finalString;
}

function splitString(value, index) {
    return [value.substring(0, index), value.substring(index)];
}

function toByteString(n) {
  if (n < 0 || n > 255 || n % 1 !== 0) {
      throw new Error(n + " does not fit in a byte");
  }
  return ("000000000" + n.toString(2)).substr(-8)
}