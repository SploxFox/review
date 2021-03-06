class Quiz {
    constructor(title,sections){
        this.title = title;
        this.sections = sections;
        this.element = this.getElement();
    }
    set sections(value){
        this._sections = value;
        this.element = this.getElement();
    }
    get sections(){
        return this._sections;
    }
    getElement(noTransition){
        var quizElement = document.createElement("div");
		var sectionsContainer = document.createElement("div");
		var header = document.createElement("h1");
		header.textContent = this.title;
        for(var i = 0; i < this.sections.length; i++){
            sectionsContainer.appendChild(this.sections[i].element);
        }
		quizElement.classList.add("quiz");
		if (noTransition == false) {
			quizElement.classList.add("slideIn");
			
		}
		console.log(noTransition);
		quizElement.appendChild(header);
		quizElement.appendChild(sectionsContainer);
        return quizElement;
    }
}
class Section {
    constructor(title,resources,questions){
        this.title = title;
        this.resources = resources;
        this.questions = questions;
        this.element = this.getElement();
    }
    getElement(){
        var sectionElement = document.createElement("div");
        sectionElement.classList.add("pop","section");
		var innerSectionElement = document.createElement("div");
		innerSectionElement.classList.add("innerSection");
		var questionsTitleElement = document.createElement("h1");
		questionsTitleElement.textContent = "Questions";
		var questionsWrapper = document.createElement("div");
		
        var titleElement = document.createElement("h1");
        titleElement.textContent = this.title;
        sectionElement.appendChild(titleElement);
		questionsWrapper.classList.add("pop");
		questionsWrapper.appendChild(questionsTitleElement);
		questionsWrapper.appendChild(innerSectionElement);
		
        if (this.resources.length != 0){
            var resourcesElement = document.createElement("div");
            var messageElement = document.createElement("p");
			var headerElement = document.createElement("h1");
			headerElement.textContent = "Resources";
            messageElement.textContent = "Use the following resources to complete the questions.";
            resourcesElement.classList.add("pop");
			resourcesElement.appendChild(headerElement);
            resourcesElement.appendChild(messageElement);
            for(var i = 0; i < this.resources.length; i++){
                //XSS Possibility
                resourcesElement.appendChild(this.resources[i]);
            }
            sectionElement.appendChild(resourcesElement)
        }

        for(var i = 0; i < this.questions.length; i++){
			innerSectionElement.appendChild(this.questions[i].element)
        }
		sectionElement.appendChild(questionsWrapper);
        return sectionElement;
    }
}
class Question {
    constructor(prompt,answer){
        this.prompt = prompt;
        this.answer = answer;
		this.indicator = new Indicator("unmarked");
        this.element = this.getElement();
		
		//Need to call this.check() for this value to update:
		this.isCorrect = false;
    }
    getElement(){
        var questionElement = document.createElement("div");
        questionElement.classList.add("question","pop");
		
		var controlPanel = document.createElement("div");
        controlPanel.classList.add("rightAlign");
		
        var submitElement = document.createElement("button");
        submitElement.textContent = "Check";
		submitElement.addEventListener("click",this.check.bind(this));
		
        controlPanel.appendChild(submitElement);
		
		questionElement.appendChild(this.prompt.element);
        questionElement.appendChild(this.answer.element);
        questionElement.appendChild(controlPanel);
		questionElement.appendChild(this.indicator.element);
        
        return questionElement;
    }
	check() {
		this.isCorrect = this.answer.value == this.answer.correctAnswer;
		this.indicator.isCorrect = this.isCorrect;
	}
}
class Indicator {
	constructor(state){
		this._state = "unmarked";
		this.element = this.getElement();
		this.state = state;
	}
	set isCorrect(value){
		if (value){
			this.state = "correct";
		} else {
			this.state = "incorrect";
		}
	}
	set state(value){
		this.element.classList.remove(this.state);
		this._state = value;
		this.element.classList.add(this.state);
	}
	get state() {
		return this._state;
	}
	getElement(){
		var indicatorElement = document.createElement("div");
		indicatorElement.classList.add("indicator","pop");
		return indicatorElement;
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
    constructor(value){
        this._selected = false;
		this.value = value;
        //Use this.element instead of this.getElement()
    }
    set selected(value /*Boolean*/){
        this._selected = value;
        if(value){
            this.element.classList.add("selected");
        } else {
            this.element.classList.remove("selected");
        }
    }
}
class TextOption extends Option {
    constructor(text){
        super(text);
        this.text = text;
        this.element = this.getElement();
    }
    //This just creates the element. For internal use only.
    getElement(){
        var optionElement = document.createElement("button");
        optionElement.classList.add("selectable","pop");
        optionElement.textContent = this.text;
        optionElement.id = uuidv4();
        return optionElement;
    }
}
class ImageOption extends Option {
    constructor(image){
        super(image);
        this.image = image;
        this.element = this.getElement();
    }
    getElement(){
        var optionElement = document.createElement("button");
        optionElement.classList.add("selectable","pop");
        this.image.classList.add("noPointer");
        optionElement.appendChild(this.image);
        optionElement.id = uuidv4();
        return optionElement;
    }
}
class MultipleChoiceAnswer extends Answer {
    constructor(correctAnswer /* String (for TextOptions)*/,options /* Array of Options */){
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
		this.value = option.value;
    }
}

//Generates unique idendifiers for stuff
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
