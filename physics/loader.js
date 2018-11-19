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
var accelorationPalette = new ColorPalette("blue",{
    light: "lightgray",
    normal: "gray",
    bold: "black"
},"black","black");

window.onload = function(){
    var script = document.createElement("script");
    script.src = "content/" + (new URLSearchParams(window.location.search.substring(1))).get('topic') + ".js";
    script.onload = start;
    document.body.appendChild(script);
    console.log("worked");
}
function start(){
    var quiz = getQuiz();
    document.body.appendChild(quiz.getElement());
}
