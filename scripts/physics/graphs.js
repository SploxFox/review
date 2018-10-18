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
    //Draw the vertical grid lines along the x-axis.
    for (var i = 0; i < boundsLength.x / this.step; i++){
      this.ctx.beginPath();
      this.ctx.moveTo(this.translate(this.step * i),0);
      this.ctx.lineTo(this.translate(this.step * i),canvas.height);
      this.ctx.stroke();
    }
  }
}
class DataSet {
  constructor(dataPoints){
    this.dataPoints = dataPoints;
  }
  graph(width,height,connectDots){
    const graph = new Graph(width,height,getBounds(this.dataPoints.x),getBounds(this.dataPoints.y));
    /*if (width != undefined){
      this.width = width;
    } //maybe this will be used?
    if (height != undefined){
      this.height = height;
    }*/
    canvas.width = width;
    canvas.height = height;
    //Creating lines on the graph
    for (var i = 0; i < this.dataPoints.length; i++){
      
    }
  }
  //Returns the bounds of the y data set in the form of (min,max)
}

function getBounds(dataPoints){
  var max;
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
