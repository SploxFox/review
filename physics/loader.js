var positionPalette = new ColorPalette("red",{
    light: "lightgray",
    normal: "gray",
    bold: "black"
},"black","black");
var velocityPalette = new ColorPalette("green",{
    light: "lightgray",
    normal: "gray",
    bold: "black"
},"black","black");
var accelerationPalette = new ColorPalette("blue",{
    light: "lightgray",
    normal: "gray",
    bold: "black"
},"black","black");

var mods = [
	"Speeding Up and Slowing Down","speeding-up-slowing-down"
]
var hasMoved = false;
window.onload = function(){
	var hash = window.location.hash.substring(1);
	history.pushState({name: "", initial: true}, "Physics Review", "#");
	if (hash){
		load(hash,true)
	}
	for (var i = 0; i < mods.length - 1; i = i + 2){
		var modElement = document.createElement("div");
		modElement.classList.add("pop","question");
		
		var openElement = document.createElement("button");
		openElement.textContent = "Open";
		openElement.classList.add("rightAlign");
		
		var title = mods[i + 1];
		
		openElement.addEventListener("click",function(){
			load(title,false);
		});
		
		var labelElement = document.createElement("p");
		labelElement.textContent = mods[i];
		
		modElement.appendChild(labelElement);
		modElement.appendChild(openElement);
		document.getElementById("mods").appendChild(modElement);
	}
}
window.onpopstate = function(e){
	console.log(e.state);
	hasMoved = true;
	if (!e.state.initial){
		load(e.state.name,false);
	} else {
		var quizzes = document.getElementsByClassName("quiz");
		for (var i = 0; i < quizzes.length; i++){
			quizzes[i].style.top = "100vh";
			window.setTimeout(500,function(){
				document.body.removeChild(quizzes[i]);
			});
		}
		/*if (e.state.name != "") {
			history.replaceState({name: history.state.name, initial: false}, undefined, window.location);
			load(e.state.name,false);
		}*/
	}
}
function load(name,isInitial){
	var script = document.createElement("script");
	console.log(name);
    script.src = "content/" + name + ".js";
    script.onload = function(){start(isInitial)};
    document.body.appendChild(script);
	history.pushState({name: name, initial: isInitial}, undefined, "#" + name);
}
function start(noTransition){
    var quiz = getQuiz();
    document.body.appendChild(quiz.getElement(noTransition));
}
