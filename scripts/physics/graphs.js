class Graph {
  constructor(width,height,xBounds,yBounds){
    this.canvas = document.createElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.xBounds = xBounds;
    this.yBounds = yBounds;
  }
  translate(point){
    point.x *= (this.canvas.width / this.xBounds);
    point.y *= (this.canvas.height / this.yBounds);
    return point;
  }
  createGridlines(step){
    this.step = step;
    const boundsLength = new Vector((this.xBounds.y - this.xBounds.x),(this.yBounds.y - this.yBounds.x));
    //TODO: add the proper gridline styles here
    //Draw the vertical grid lines along the x-axis.
    for (var i = 0; i < boundsLength.x / this.step; i++){
      this.ctx.beginPath();
      this.ctx.moveTo(this.translate((this.step * i) + this.xBounds.x,0));
      this.ctx.lineTo(this.translate((this.step * i) + this.xBounds.x,canvas.height));
      this.ctx.stroke();
    }
    //Draw horizontal lines across y axis
    for (var i = 0; i < boundsLength.y / this.step; i++){
      this.ctx.beginPath();
      this.ctx.moveTo(this.translate((this.step * i) + this.yBounds.x,0));
      this.ctx.lineTo(this.translate((this.step * i) + this.yBounds.x,canvas.height));
      this.ctx.stroke();
    }
    return this;
  }
}
class DataSet {
  constructor(dataPoints){
    this.dataPoints = dataPoints;
    this.color = "red";
    this.bl
  }
  graph(width,height,connectDots){
    const graph = new Graph(width,height,getBounds(this.dataPoints),getBounds(this.dataPoints.y));
    /*if (width != undefined){
      this.width = width;
    } //maybe this will be used?
    if (height != undefined){
      this.height = height;
    }*//*
    canvas.width = width;
    canvas.height = height;*/
    //Creating lines on the graph
    graph.createGridlines(5);
    graph.plot(this.dataPoints,connectDots);
  }
  //Returns the bounds of the y data set in the form of (min,max)
}

function getBounds(dataPoints){
  var max;//TODO: make it so that this can take in dataPoints.x
    var min;
    for (var i = 0; i < dataPoints.length; i++){
      if (max == undefined || max < dataPoints.length[i].y){
        max = dataPoints.length[i].y;
      }
      if (min == undefined || min > dataPoints.length[i].y){
        min = dataPoints.length[i].y;
      }
    }
    return new Vector(min,max);
}
