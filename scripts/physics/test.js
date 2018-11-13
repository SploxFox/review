window.onerror = function(error,url,line){
  const p = document.createElement("p");
  p.textContent = "[ERROR]: " + error + " [URL]: " + url + " [LINE]: " + line;
  document.body.appendChild(p);
}
var data = new DataSet([
	//new Vector(0,0),
	new Vector(1,10),
	new Vector(2,30),
	new Vector(3,60),
	new Vector(4,100),
	new Vector(5,150),
	new Vector(6,210)
]);
//         new DataSet([new Vector(0,0),new Vector(10,10)])

window.onload = function(){
  /*const input = document.createElement("input");
  input.type = "text";
  document.body.appendChild(input);
  const button = document.createElement("button");
  button.onclick = function(){
    eval(input.value);
    input.value = "";
  }
  document.body.appendChild(button);*/
  window.setTimeout(function(){var graph = data.graph(500,500,1,5,true,false,seconds,meters);document.body.appendChild(graph.canvas);},1000);
  
}
