function getQuiz(){
    var quiz = new Quiz("Speeding Up and Slowing Down",[]);
    for (var i = 0; i < 4; i++){
        var a,b,c,correctGraph;

        var velocityTimeGraphs = [
            canvasToImage(new Graph(DataSet.generate(0,0,0,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
            canvasToImage(new Graph(DataSet.generate(0,1,0,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
            canvasToImage(new Graph(DataSet.generate(0,0,-6,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas)
        ]
        
        switch(i){
			case 1:
				a = -0.5;
				b = 20;
				c = 0;
				break;
			case 2:
				a = -0.5;
				b = 0;
				c = 200;
				break;
			case 3:
				a = 0.5;
				b = -20;
				c = 200;
				break;
            default:
                a = 0.5;
                b = 0;
                c = 0;
                correctGraph = 1;
        }
		var dataSet = DataSet.generate(a,b,c,21,positionPalette,"Postition vs. Time");
		var canvas = new Graph(dataSet,new Vector(0,0),new Vector(20,200),500,500,2,6).canvas
		var image = [canvasToImage(canvas)];
        quiz.sections.push(new Section("Section " + (i + 1),image,[
            new Question(new Prompt("The value of the position is:"), new MultipleChoiceAnswer("Positive",[
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
            new Question(new Prompt("The value of the position is:"), new MultipleChoiceAnswer(a != 0 && a > 0 ? "Increasing" : "Decreasing",[
                new TextOption("Constant"),
                new TextOption("Increasing"),
                new TextOption("Decreasing")
            ])),
            new Question(new Prompt("The SLOPE of the position vs. time graph is:"), new MultipleChoiceAnswer(a != 0 && a > 0 ? "Positive" : "Negative",[
                new TextOption("Zero"),
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
            new Question(new Prompt("What does the slope of the position vs. time graph represent?"), new MultipleChoiceAnswer("Velocity",[
                new TextOption("Position"),
                new TextOption("Velocity"),
                new TextOption("Acceloration")
            ])),
            new Question(new Prompt("Select the best velocity vs. time graph for the position vs. time graph."), new MultipleChoiceAnswer(velocityTimeGraphs[correctGraph],[
                new ImageOption(velocityTimeGraphs[0]),
                new ImageOption(velocityTimeGraphs[1]),
                new ImageOption(velocityTimeGraphs[2])
            ])),
            new Question(new Prompt("The value of the velocity is:"), new MultipleChoiceAnswer("Positive",[
                new TextOption("Zero"),
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
        ]));
    }
    return quiz;
}
