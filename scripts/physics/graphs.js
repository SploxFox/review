class DataSet {
  constructor(dataPoints){
    this.dataPoints = dataPoints;
  }
  graphPosition(width,height,connectDots){
    const canvas = document.createElementById("canvas");
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
  get yBounds(){
    var max;
    var min;
    for (var i = 0; i < this.dataPoints.length; i++){
      if (max == undefined || max < this.dataPoints.length[i].y){
        max = this.dataPoints.length[i].y;
      }
      if (min == undefined || min > this.dataPoints.length[i].y){
        min = this.dataPoints.length[i].y;
      }
    }
    return new Vector(min,max);
  }
}
