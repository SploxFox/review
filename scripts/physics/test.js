const data = new DataSet([
  new Vector(0,0),
  new Vector(10,10),
  new Vector(20,20),
  new Vector(30,30),
  new Vector(40,40)
]);
const graph = data.graph(500,500,false);
window.onload = function(){
  document.body.appendChild(graph.canvas);
}
