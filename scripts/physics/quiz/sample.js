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
                new Option("Positive"),
                new Option("Negative")
            ])),
            new Question(new Prompt("The value of the position is:"), new MultipleChoiceAnswer("Increasing",[
                new Option("Constant"),
                new Option("Increasing"),
                new Option("Decreasing")
            ])),
            new Question(new Prompt("The SLOPE of the position vs. time graph is:"), new MultipleChoiceAnswer("Positive",[
                new Option("Zero"),
                new Option("Positive"),
                new Option("Negative")
            ])),
        ]);
    /*for (var i = 0; i < questions.length; i++) {
        document.body.appendChild(questions[i].element);
    }*/
    document.body.appendChild(section.element);
}
function canvasToImage(canvas){
    var image = document.createElement("img");
    image.src = canvas.toDataURL("image/png");
    image.style.maxWidth = canvas.width + "px";
    image.style.maxHeight = canvas.height + "px";
    image.classList.add("scalableImage");
    return image;
}
