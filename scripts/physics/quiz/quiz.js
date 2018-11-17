class Section {
    constructor(title,resources,questions){
        this.title = title;
        this.resources = resources;
        this.questions = questions;
        this.element = this.getElement();
    }
    getElement(){
        var sectionElement = document.createElement("div");
        sectionElement.classList.add("pop");
        var titleElement = document.createElement("p");
        titleElement.textContent = this.title;

        sectionElement.appendChild(titleElement);
        if (this.resources.length != 0){
            var resourcesElement = document.createElement("div");
            var messageElement = document.createElement("p");
            messageElement.textContent = "Use the following resources to complete the questions.";
            resourcesElement.classList.add("pop");
            resourcesElement.appendChild(messageElement);
            for(var i = 0; i < this.resources.length; i++){
                //XSS Possibility
                resourcesElement.appendChild(this.resources[i]);
            }
            sectionElement.appendChild(resourcesElement)
        }
        for(var i = 0; i < this.questions.length; i++){
            sectionElement.appendChild(this.questions[i].element)
        }
        return sectionElement;
    }
}
class Question {
    constructor(prompt,answer){
        this.prompt = prompt;
        this.answer = answer;
        this.element = this.getElement();
    }
    getElement(){
        var questionElement = document.createElement("div");
        questionElement.appendChild(this.prompt.element);
        questionElement.appendChild(this.answer.element);
        var controlPanel = document.createElement("div");
        controlPanel.classList.add("rightAlign");
        var submitElement = document.createElement("button");
        submitElement.textContent = "Check";
        controlPanel.appendChild(submitElement);
        questionElement.appendChild(controlPanel);
        questionElement.classList.add("question","pop");
        return questionElement;
    }
}
class Prompt {
    constructor(text /* String */){
        this.text = text;
        this.element = this.getElement();
    }
    getElement(){
        var promptElement = document.createElement("div");
        promptElement.classList.add("prompt");
        var promptText = document.createElement("p");
        promptText.textContent = this.text;
        promptElement.appendChild(promptText);
        return promptElement;
    }
}
class Answer {
    constructor(correctAnswer){
        this.correctAnswer = correctAnswer;
        this.value = "";
    }
}
class Option {
    constructor(text){
        this.text = text;
        this.element = this.getElement();
        this.selected = false;
        //Use this.element instead of this.getElement()

    }
    //This just creates the element. For internal use only.
    getElement(){
        var optionElement = document.createElement("button");
        optionElement.classList.add("selectable","pop");
        optionElement.textContent = this.text;
        optionElement.id = uuidv4();
        return optionElement;
    }
    set selected(value /*Boolean*/){
        console.log(this);
        this._selected = value;
        if(value){
            this.element.classList.add("selected");
        } else {
            this.element.classList.remove("selected");
        }
    }
}
class MultipleChoiceAnswer extends Answer {
    constructor(correctAnswer /* String */,options /* Array of Options */){
        super(correctAnswer);
        this.options = options;
        this.element = this.getElement();
    }
    getElement(){
        var answerElement = document.createElement("div");
        for (var i = 0; i < this.options.length; i++){
            answerElement.appendChild(this.options[i].element);
        }
        answerElement.addEventListener("click",function(e){
            if (e.target != this.element){
                this.select(this.options.filter(option => option.element.id == e.target.id)[0]);
            }
        }.bind(this))
        return answerElement;
    }
    select(option){
        var index = this.options.indexOf(option);
        for (var i = 0; i < this.options.length; i++){
            this.options[i].selected = (i == index)
        }
    }
}

//Generates unique idendifiers for stuff
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
