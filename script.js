class Question {
    #QuestionID;
    #QuestionText;
    #QuestionAnswers;
    #RightAnswer;
    constructor(QID,Qtext,Qanswers,RightAns){
        this.#QuestionID = QID;
        this.#QuestionText = Qtext;
        this.#QuestionAnswers = Qanswers;
        this.#RightAnswer = RightAns;
    }
    get QuestionText() {
        return this.#QuestionText;
    }
    get RightAnswer() {
        
        return this.#RightAnswer;
    }
    get QuestionID(){
        return this.#QuestionID;
    }
    get Answers(){
        return  this.#QuestionAnswers;
    }
    set Answers(answers){
        if (answers.length<3 || typeof answers!="object")
            throw("answers shouldn't be less than 3 ")
        else
            this.#QuestionAnswers=answers;
    }
    set RightAnswer(answer){
        this.#RightAnswer=answer;
    }
    set QuestionText(text){
        this.#QuestionText=text;
    }
    set QuestionID(id){
        this.#QuestionID=id;
    }

}
function shuffle(array){
    for(let i=array.length-1; i>=0; i--){
        var number = Math.random();
        // console.log(number);
        // console.log(number * (i + 1));
        const j = Math.floor(number * (i + 1));
        // console.log(j);
        [array[i], array[j]] = [array[j], array[i]]
    }
}

var QuestionsArr=[
    new Question(1,"this is a test question1",["answer1","answer2","answer3","answer4","answer5"],"answer1"),
    new Question(2,"this is a test question2",["answer1","answer2","answer3","answer4","answer5"],"answer2"),
    new Question(3,"this is a test question3",["answer1","answer2","answer3","answer4","answer5"],"answer3"),
    new Question(4,"this is a test question4",["answer1","answer2","answer3","answer4","answer5"],"answer4"),
    new Question(5,"this is a test question5",["answer1","answer2","answer3","answer4","answer5"],"answer5")
]

let CurrentQuestion =0;
$(document).ready(()=>{
    
    $(".question-number").text(CurrentQuestion+1);
    shuffle(QuestionsArr);//shuffle allQuestions
    //================================================
    // 1st Question display
    $(".question span").text(QuestionsArr[CurrentQuestion].QuestionText)
    //================================================
    //1st answers display
    QuestionsArr[0].Answers.forEach((element,index)=>{
        var label = $(`<label for="answer${index}">${element}</label>`);
        var radio=$(`<input type="radio" name="choices" id="answer${index}">`);
        var answersDiv=$("<div></div>").append(label).append(radio)
        $(".answers").append(answersDiv);
    });
    //============================================================================================
    //Next Button functionality 
    $("#next").on("click",()=>{
        CurrentQuestion++;
        if(CurrentQuestion>0)
        $("#previous").fadeIn(); //Show previous Button after moving out from the 1st question 
        
        if(CurrentQuestion+1==QuestionsArr.length)
            $("#next").fadeOut(); //Hide next Button at the last Index
        
            shuffle(QuestionsArr[CurrentQuestion].Answers);
            $(".question span").fadeOut(function(){
                $(this).text(QuestionsArr[CurrentQuestion].QuestionText).fadeIn(); // adds some smoothness to the transaction 
            });
            $(".answers").fadeOut(function() {
                $(this).empty(); // clearing the answers div  
                QuestionsArr[CurrentQuestion].Answers.forEach((element,index)=>{
                    var label = $(`<label for="answer${index}">${element}</label>`);
                    var radio=$(`<input type="radio" name="choices" id="answer${index}">`);
                    var answersDiv=$("<div></div>").append(label).append(radio)
                    $(".answers").append(answersDiv);
                    answersDiv.fadeIn();
                    $(".question-number").text(CurrentQuestion+1);
                });
                $(this).fadeIn();
            });
    })
    if(CurrentQuestion==0){
        $("#previous").hide();
    }
    $("#previous").on("click",()=>{
        CurrentQuestion--;
        if(CurrentQuestion < QuestionsArr.length)
        $("#next").fadeIn();
        if(CurrentQuestion==0)
        $("#previous").fadeOut();
        
        shuffle(QuestionsArr[CurrentQuestion].Answers);
        $(".question span").fadeOut(function(){
            $(this).text(QuestionsArr[CurrentQuestion].QuestionText).fadeIn();
        });
        $(".answers").fadeOut(function() {
            $(this).empty();
            QuestionsArr[CurrentQuestion].Answers.forEach((element,index)=>{
                var label = $(`<label for="answer${index}">${element}</label>`);
                var radio=$(`<input type="radio" name="choices" id="answer${index}">`);
                var answersDiv=$("<div></div>").append(label).append(radio)
                $(".answers").append(answersDiv);
                answersDiv.fadeIn();
                $(".question-number").text(CurrentQuestion+1);
            });
            $(this).fadeIn();
        });
    
    })
});
