function getQuiz(){
	class Explanation {
	constructor(sign,trend,slopeSign,slopeTrend,magnOfSlopeTrend){
		this.sign = sign;
		this.trend = trend;
		this.slopeSign = slopeSign;
		this.slopeTrend = slopeTrend;
		this.magnOfSlopeTrend = magnOfSlopeTrend;
	}
}
    var quiz = new Quiz("Speeding Up and Slowing Down",[]);
    for (var i = 0; i < 4; i++){
        var a,b,c,correctVelGraph;
		/*var posTrend = "Getting Steeper";
		var posSlopeSign = "Positive";
		var slopeTrend = "Getting Steeper";
		var slopeMagnTrend = "Increasing";*/
		var posExp = new Explanation("Positive","Increasing","Positive","Getting Steeper","Increasing");
		var velExp = new Explanation("Positive","Increasing","Positive","Constant","Constant");
		var accExp = {sign: "Positive", trend: "Constant"}
		
        var velocityTimeGraphs = [
            canvasToImage(new Graph(DataSet.generate(0,0,0,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
            canvasToImage(new Graph(DataSet.generate(0,1,0,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
			canvasToImage(new Graph(DataSet.generate(0,-1,0,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
			canvasToImage(new Graph(DataSet.generate(0,1,-20,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
			canvasToImage(new Graph(DataSet.generate(0,-1,20,21,velocityPalette,"Velocity vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
        ]
		
		var accelerationTimeGraphs = [
			canvasToImage(new Graph(DataSet.generate(0,0,18,21,accelerationPalette,"Acceleration vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas),
            canvasToImage(new Graph(DataSet.generate(0,0,-18,21,accelerationPalette,"Acceleration vs. Time"),new Vector(0,-30),new Vector(20,30),500,500,2,3).canvas)
		]
        
        switch(i){
			case 1:
				a = -0.5;
				b = 20;
				c = 0;
				posExp.slopeTrend = "Getting Shallower";
				posExp.magnOfSlopeTrend = "Decreasing";
				velExp.trend = "Decreasing";
				velExp.slopeSign = "Negative";
				accExp.sign = "Negative";
				correctVelGraph = 4;
				correctAccGraph = 1;
				break;
			case 2:
				a = -0.5;
				b = 0;
				c = 200;
				posExp.trend = "Decreasing";
				posExp.slopeSign = "Negative";
				velExp.sign = "Negative";
				velExp.trend = "Decreasing";
				velExp.slopeSign = "Negative";
				accExp.sign = "Negative";
				correctVelGraph = 2;
				correctAccGraph = 1;
				break;
			case 3:
				a = 0.5;
				b = -20;
				c = 200;
				posExp.trend = "Decreasing";
				posExp.slopeSign = "Negative";
				posExp.slopeTrend = "Getting Shallower";
				posExp.magnOfSlopeTrend = "Decreasing";
				velExp.sign = "Negative";
				correctAccGraph = 0;
				correctVelGraph = 3;
				break;
            default:
                a = 0.5;
                b = 0;
                c = 0;
                correctVelGraph = 1;
				correctAccGraph = 0;
        }
		var dataSet = DataSet.generate(a,b,c,21,positionPalette,"Position vs. Time");
		var canvas = new Graph(dataSet,new Vector(0,0),new Vector(20,200),500,500,2,6).canvas
		var image = [canvasToImage(canvas)];
        quiz.sections.push(new Section("Section " + (i + 1),image,[
            new Question(new Prompt("The value of the position is:"), new MultipleChoiceAnswer("Positive",[
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
            new Question(new Prompt("The value of the position is:"), new MultipleChoiceAnswer(posExp.trend,[
                new TextOption("Constant"),
                new TextOption("Increasing"),
                new TextOption("Decreasing")
            ])),
            new Question(new Prompt("The slope of the position vs. time graph is:"), new MultipleChoiceAnswer(posExp.slopeSign,[
                new TextOption("Zero"),
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
			new Question(new Prompt("The slope of the position vs. time graph is:"), new MultipleChoiceAnswer(posExp.slopeTrend,[
                new TextOption("Constant"),
                new TextOption("Getting Steeper"),
                new TextOption("Getting Shallower")
            ])),
            new Question(new Prompt("What does the slope of the position vs. time graph represent?"), new MultipleChoiceAnswer("Velocity",[
                new TextOption("Position"),
                new TextOption("Velocity"),
                new TextOption("Acceleration")
            ])),
			new Question(new Prompt("The value of the magnitude of of the position vs. time slope is:"), new MultipleChoiceAnswer(posExp.magnOfSlopeTrend,[
                new TextOption("Constant"),
                new TextOption("Increasing"),
                new TextOption("Decreasing")
            ])),
            new Question(new Prompt("Select the best velocity vs. time graph for the position vs. time graph."), new MultipleChoiceAnswer(velocityTimeGraphs[correctVelGraph],[
                new ImageOption(velocityTimeGraphs[0]),
                new ImageOption(velocityTimeGraphs[1]),
                new ImageOption(velocityTimeGraphs[2]),
				new ImageOption(velocityTimeGraphs[3]),
                new ImageOption(velocityTimeGraphs[4])
            ])),
            new Question(new Prompt("The value of the velocity is:"), new MultipleChoiceAnswer(velExp.sign,[
                new TextOption("Zero"),
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
			new Question(new Prompt("The value of the velocity is:"), new MultipleChoiceAnswer(velExp.trend,[
                new TextOption("Constant"),
                new TextOption("Increasing"),
                new TextOption("Decreasing")
            ])),
			new Question(new Prompt("The value of the slope of the velocity vs. time graph is:"), new MultipleChoiceAnswer(velExp.slopeSign,[
                new TextOption("Zero"),
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
			new Question(new Prompt("The slope of the velocity vs. time graph is:"), new MultipleChoiceAnswer(velExp.slopeTrend,[
                new TextOption("Constant"),
                new TextOption("Getting Steeper"),
                new TextOption("Getting Shallower")
            ])),
			new Question(new Prompt("The value of the magnitude of of the velocity vs. time slope is:"), new MultipleChoiceAnswer(velExp.magnOfSlopeTrend,[
                new TextOption("Constant"),
                new TextOption("Increasing"),
                new TextOption("Decreasing")
            ])),
			new Question(new Prompt("What does the slope of the velocity vs. time graph represent?"), new MultipleChoiceAnswer("Acceleration",[
                new TextOption("Position"),
                new TextOption("Velocity"),
                new TextOption("Acceleration")
            ])),
			new Question(new Prompt("Select the best acceleration vs. time graph for the position vs. time graph."), new MultipleChoiceAnswer(accelerationTimeGraphs[correctAccGraph],[
                new ImageOption(accelerationTimeGraphs[0]),
                new ImageOption(accelerationTimeGraphs[1])
            ])),
			new Question(new Prompt("The value of the acceleration is:"), new MultipleChoiceAnswer(accExp.sign,[
                new TextOption("Zero"),
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
			new Question(new Prompt("The value of the acceleration is:"), new MultipleChoiceAnswer(accExp.trend,[
                new TextOption("Constant"),
                new TextOption("Increasing"),
                new TextOption("Decreasing")
            ])),
			new Question(new Prompt("What does the area under the acceleration vs. time curve represent?"), new MultipleChoiceAnswer("\u0394v",[
                new TextOption("v"),
                new TextOption("\u0394v"),
				new TextOption("a"),
				new TextOption("\u0394a"),
                new TextOption("\u0394x")
            ])),
        ]));
    }
    return quiz;
}
