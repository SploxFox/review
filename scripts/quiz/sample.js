//THIS IS NO LONGER UP-TO-DATE!!!!

window.onload = function(){
    var section = new Section(
        "Speeding Up and Slowing Down",
        [canvasToImage((/*new DataSet([
            new Vector(0,0),
            new Vector(1,1),
            new Vector(2,3),
            new Vector(3,6),
            new Vector(4,10),
        ])*/DataSet.generate(1,0,0,20)).graph(500,500,2,5,true,false,seconds,meters).canvas)],[
            new Question(new Prompt("The value of the position is:"), new MultipleChoiceAnswer("Positive",[
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
            new Question(new Prompt("The value of the position is:"), new MultipleChoiceAnswer("Increasing",[
                new TextOption("Constant"),
                new TextOption("Increasing"),
                new TextOption("Decreasing")
            ])),
            new Question(new Prompt("The SLOPE of the position vs. time graph is:"), new MultipleChoiceAnswer("Positive",[
                new TextOption("Zero"),
                new TextOption("Positive"),
                new TextOption("Negative")
            ])),
        ]);
    /*for (var i = 0; i < questions.length; i++) {
        document.body.appendChild(questions[i].element);
    }*/
    document.body.appendChild(section.element);
}
