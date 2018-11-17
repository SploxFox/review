Array.prototype.getX = function(){
	var newArr = [];
	for(var i = 0; i < this.length; i++){
		newArr.push(this[i].x);
	}
	return newArr;
}
Array.prototype.getY = function(){
	var newArr = [];
	for(var i = 0; i < this.length; i++){
		newArr.push(this[i].y);
	}
	return newArr;
}

class Graph {
	constructor(width,height,xBounds,yBounds){
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext('2d');
		this.ctx.moveToVector = function(vec){
			this.moveTo(vec.x,vec.y);
		}
		this.ctx.lineToVector = function(vec){
			this.lineTo(vec.x,vec.y);
		}
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.style.maxWidth = width;
		this.canvas.style.maxHeight = height;
		this.xBounds = xBounds;
		this.yBounds = yBounds;
		this.colorPalette = {
			gridLine: {
				light: "lightgray",
				normal: "gray",
				axis: "black"
			},
			point: "red"
		}
	}
	translate(point){
		return new Vector(
			60 + (point.x - this.xBounds.x) * ((this.canvas.width - 120) / this.xBounds.diff()),
			-60 + (point.y - this.yBounds.x) * ((this.canvas.height - 120) / this.yBounds.diff()) * -1 + this.canvas.height
		);
	}
	createGridlines(step){
		this.step = step;
		const boundsLength = new Vector((this.xBounds.diff()),(this.yBounds.diff()));
		//TODO: add the proper gridline styles here
		this.ctx.strokeStyle = "lightgray";
		//console.log("Bounds length: " + boundsLength + ", step: " + this.step);
		if (this.step.x == 0 || this.step.y == 0){
			throw "Error: Step cannot be zero.";
		}
		this.ctx.font = "15px Source Sans Pro";

		//Draw the vertical grid lines along the x-axis.
		for (var i = 0; i < boundsLength.x / this.step.x; i++){
			this.flipColor(i,step.x);
			this.ctx.beginPath();
			this.ctx.moveToVector(this.translate(new Vector((this.step.x * i) + this.xBounds.x,this.yBounds.x)));
			this.ctx.lineToVector(this.translate(new Vector((this.step.x * i) + this.xBounds.x,this.yBounds.y)));
			this.ctx.stroke();
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "top";
			this.labelX && i % this.step.x == 0 && this.ctx.fillText(i + this.unitsX.abbr, this.translate(new Vector((this.step.x * i) + this.xBounds.x)).x, this.canvas.height - 30);
		}


		//Draw horizontal lines across y axis
		for (var i = 0; i < boundsLength.y / this.step.y; i++){
			this.flipColor(i,this.step.y);
			this.ctx.beginPath();
			this.ctx.moveToVector(this.translate(new Vector(this.xBounds.x,this.step.y * i + this.yBounds.x)));
			this.ctx.lineToVector(this.translate(new Vector(this.xBounds.y,this.step.y * i + this.yBounds.x)));
			this.ctx.stroke();
			this.ctx.textAlign = "right";
			this.ctx.textBaseline = "middle";
			this.labelY && i % this.step.y == 0 && this.ctx.fillText(i + this.unitsY.abbr,30,this.translate(new Vector(0,(this.step.y * i) + this.yBounds.x)).y);
			//console.log(this.translate(new Vector(0,(this.step.y * i) + this.yBounds.x)).y);
		}
		return this;
	}
	plot(points,connectDots){
		for(var i = 0; i < points.length; i++){
			var realPoint = this.translate(points[i]);
			this.ctx.beginPath();
			this.ctx.arc(realPoint.x,realPoint.y,5,0,2 * Math.PI);
			this.ctx.fillStyle = this.colorPalette.point;
			this.ctx.fill();
		}
	}
	flipColor(i,step){
		if (i == 0){
			this.ctx.strokeStyle = this.colorPalette.gridLine.axis;
		} else if(i % step == 0){
			this.ctx.strokeStyle = this.colorPalette.gridLine.normal;
		} else {
			this.ctx.strokeStyle = this.colorPalette.gridLine.light;
		}
	}
}
class Unit {
	constructor(multi,abbr,name){
		this.multi = multi;
		this.abbr = abbr;
		this.name = name;
	}
}
class DataSet {
	constructor(dataPoints,color){
		this.dataPoints = dataPoints;
		if (color == undefined){
			this.color = "red";
		} else {
			this.color = color;
		}
	}
	graph(width,height,stepX,stepY,forceZero,connectDots,unitsX,unitsY){
		var graph;
		if (forceZero){
			graph = new Graph(width,height,new Vector(0,getBounds(this.dataPoints.getX()).y),new Vector(0,getBounds(this.dataPoints.getY()).y));
		} else {
			graph = new Graph(width,height,getBounds(this.dataPoints.getX()),getBounds(this.dataPoints.getY()));
		}
		graph.unitsX = unitsX;
		graph.unitsY = unitsY;
		graph.labelX = true;
		graph.labelY = true;
		graph.createGridlines(new Vector(stepX,stepY),unitsX,unitsY);
		graph.plot(this.dataPoints,connectDots);
		return graph;
  }
  static generate(a,b,c,amount,color){
	  var newSet = new DataSet([],color);
	  for (var i = 0; i < amount; i++){
		  newSet.dataPoints.push(new Vector(i,(a * i * i) + (b * i) + c));
	  }
	  return newSet;
  }
}

function getBounds(arr){
    var max;
    var min;
    for (var i = 0; i < arr.length; i++){
      if (max == undefined || max < arr[i]){
        max = arr[i];
		//console.log(max + " = " + arr[i]);
      }
      if (min == undefined || min > arr[i]){
        min = arr[i];
      }
    }
    return new Vector(min,max);
}

const pixels = new Unit(1,"px","pixel","pixels");
const meters = new Unit(3779.5275590551,"m","meter","meters");
const centimeters = new Unit(37.7952755906,"cm","centimeter","centimeters");
const seconds = new Unit(1,"s","second","seconds");

function canvasToImage(canvas){
    var image = document.createElement("img");
    image.src = canvas.toDataURL("image/png");
    image.style.maxWidth = canvas.width + "px";
    image.style.maxHeight = canvas.height + "px";
    image.classList.add("scalableImage");
    return image;
}
