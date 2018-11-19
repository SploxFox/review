class ColorPalette {
    constructor(points,gridlines,labels,titles){
        this.points = points;
        //Gridlines needs a Light, Normal, and Bold value
        this.gridlines = gridlines;
        this.labels = labels;
        if (this.titles != undefined){
            this.titles = titles;
        } else {
            this.titles = this.labels;
        }
    }
}
class DataSet {
    constructor(points,colors,title){
        this.points = points;
        this.colorPalette = colors;
        this.title = title;
    }
    static generate(a,b,c,amount,colors,title){
  	  var newSet = new DataSet([],colors,title);
  	  for (var i = 0; i < amount; i++){
  		  newSet.points.push(new Vector(i,(a * i * i) + (b * i) + c));
  	  }
  	  return newSet;
    }
}
class Graph {
    constructor(dataSet,minPoint,maxPoint,width,height,stepX,stepY){
		this.padding = new Vector(30,30);
        this.dataSet = dataSet;
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.dotSize = "10px";
        this.connectDots = false;
        this.step = new Vector(Math.max(1,stepX),Math.max(1,stepY));
		this.drawGridlinesOn();
		this.drawPoints();
        
    }
    transformToCanvas(point){
        //Shifts a point so that it will fit on the canvas.
		var pointWithoutPadding = new Vector(
			(  (point.x * this.canvas.width) / (this.maxPoint.x - this.minPoint.x)), //x
			( ((point.y - this.minPoint.y ) * this.canvas.height)/ (this.maxPoint.y - this.minPoint.y)  ) * -1 + this.canvas.height //y
		)
		var pointWithPadding = new Vector(
			((this.canvas.width - (this.padding.x * 2)) / this.canvas.width) * pointWithoutPadding.x + (this.padding.x),
			((this.canvas.height - (this.padding.y * 2)) / this.canvas.height) * pointWithoutPadding.y + (this.padding.y)
		)
        return pointWithPadding;
    }
	drawPoints() {
		for (var i = 0; i < this.dataSet.points.length; i++){
			var realPoint = this.transformToCanvas(this.dataSet.points[i]);
			this.ctx.beginPath();
			this.ctx.arc(realPoint.x,realPoint.y,5,0,2 * Math.PI);
			this.ctx.fillStyle = this.dataSet.colorPalette.points;
			this.ctx.fill();
			//console.log("Drew:");
			//console.log(realPoint);
		}
		//console.log("done");
	}
    drawGridlinesOn(){
        //Draw the gridlines and labels HORIZANTALLY along the Y-axis
        //We need to do the % operation so that 0 is a gridline.
		//this.ctx.fillRect(0,0,50,50);
		
        for (var yValue = this.minPoint.y - (this.minPoint.y % this.step.y); yValue <= this.maxPoint.y /*+ this.minPoint.y*/; yValue += this.step.y){
            //This is the y-value that we are currently drawing the gridline on.

            //Left point
            var pL = this.transformToCanvas(new Vector(this.minPoint.x,yValue));

            //Right point
            var pR = this.transformToCanvas(new Vector(this.maxPoint.x,yValue));

            //Deciding colors
			
            var color = this.dataSet.colorPalette.gridlines.light;
			if (yValue == 0) {
                color = this.dataSet.colorPalette.gridlines.bold;
			} else if (yValue % (this.step.y * this.step.y) == 0){
                color = this.dataSet.colorPalette.gridlines.normal;
            }

            //draw it on!
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(pL.x,pL.y);
            this.ctx.lineTo(pR.x,pR.y);
            this.ctx.stroke();

            //TODO: labels
        }		
        //Draw the gridlines VERTICALLY along the x-axis
        for (var xValue = this.minPoint.x - (this.minPoint.x % this.step.x); xValue <= this.maxPoint.x; xValue += this.step.x){
            //This is the x-value that we are currently drawing the gridline on.

            //Left point
            var pL = this.transformToCanvas(new Vector(xValue,this.minPoint.y));

            //Right point
            var pR = this.transformToCanvas(new Vector(xValue,this.maxPoint.y));

            //Deciding colors
            var color = this.dataSet.colorPalette.gridlines.light;
			if (xValue == 0) {
                color = this.dataSet.colorPalette.gridlines.bold;
			} else if (xValue % (this.step.x * this.step.x) == 0){
                color = this.dataSet.colorPalette.gridlines.normal;
            }

            //draw it on!
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(pL.x,pL.y);
            this.ctx.lineTo(pR.x,pR.y);
            this.ctx.stroke();

            //TODO: labels
        }
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		var style = getComputedStyle(document.querySelector("*"));
		this.ctx.fillStyle = style.getPropertyValue("--theme-dark");
		this.ctx.font = style.getPropertyValue("--font-size") + " " + style.getPropertyValue("--font-family");
		this.ctx.fillText(this.dataSet.title,this.canvas.width / 2, this.padding.y / 2);
		return this;
    }
}

function canvasToImage(canvas){
    var image = document.createElement("img");
    image.src = canvas.toDataURL("image/png");
    image.style.maxWidth = canvas.width + "px";
    image.style.maxHeight = canvas.height + "px";
    image.classList.add("scalableImage");
    return image;
}
