class DataSet {
  constructor(dataPoints){
    this.dataPoints = dataPoints;
  }
  get canvas(width,height){
    if (width != undefined){
      this.width = width;
    }
    if (height != undefined){
      this.height = height;
    }
    const canvas = document.createElementById("canvas");
  }
}
