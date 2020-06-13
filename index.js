const STORE = [
    {
        question: "What do humpback whales have for breakfast, lunch, and dinner?",
        answers: [
            "Coral, bull-kelp, and sea sponges",
            "Herring, plankton, and krill",
            "Small children, coastal marmots, and people named Noah",
            "Squid, tuna, and seal pups"
            ],
        correctAnswer:
            "Herring, plankton, and krill",
        funFact: "A humpback can't eat anything to big because their throat is about the size of a grapefruit."
    },
    {
        question: "On average, how much does a full grown humpback whale weigh?",
        answers: [
            "1 ton (the weight of a car)",
            "7 tons (the weight of an elephant)",
            "15 tons (the weight of an average anchor of a cruise ship)",
            "45 tons (the weight of a fully loaded semi-truck)"
        ],
        correctAnswer: "45 tons (the weight of a fully loaded semi-truck)",
        funFact: "They can eat up to a ton of food a day!"
    },
    {
        question: "I want to see a Humpback whale, where can I go to find one?",
        answers: [
            "Mediterranean Sea",
            "Pacific Ocean",
            "Gulf of Mexico",
            "All of the above"
        ],
        correctAnswer: "All of the above",
        funFact: "This migratory species can be found in every ocean on Earth!"
    },
    {
        question: "On average, how long does a Humpback whale live?",
        answers: [
            "Up to 15 years",
            "Up to 50 years",
            "Up to 80 years",
            "Up to 120 years"
        ],
        correctAnswer: "Up to 80 years",
        funFact: "We know this by studying growth layers in a waxy structure within the animals' ears. Kind of like counting rings on a tree!"
    },
    {
        question: "How many Humpback whales exist today?",
        answers: [
            "Around 10,000 and numbers are declining",
            "Around 20,000 and numbers are steady",
            "At Least 40,000 and numbers are increasing",
            "At Least 80,000 and numbers are steady"
            
        ],
        correctAnswer: "At Least 80,000 and numbers are steady",
        funFact: "This is great news because the species faced extinction only a few decades ago."
    }
    ];

let score = 0;
let questionNumber = 0;

function generateQuestion(){
    if (questionNumber < STORE.length) {
        return createForm(questionNumber);
    } else {
        $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(5);
    }
    //this function is responsible for generating the next question
    console.log('`generateQuestion` ran');
}

function updateScore() {
    score++;
    $('.score').text(score);
}

function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
  }

function resetStats() {
    score = 0;
    questionNumber = 0;
    $(".score").text(0);
    $(".questionNumber").text(0);
}

function startQuiz(){
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
    //this function is responsible for the starting 
    //the quiz when the start button is clicked.
    console.log('`startQuiz` ran');
}

function submitAnswer(){
    $(".ocean").on("submit", function (event){
        event.preventDefault();
        $(".altBox").hide();
        $(".response").show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
    //this function is responsible for submitting the question and taking 
    //you to the correct answer page or the wrong answer page
    console.log('`submitQuestion` ran');
}

function createForm(questionIndex){
    let formMaker = $(`<form>
        <fieldset>
            <legend class = "questionIndex">
                ${STORE[questionIndex].question}
            </legend>
        </fieldset>
    </form>`)

    let fieldSelector = $(formMaker).find("fieldset");

    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex){
        $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
}

function correctAnswer(){
    //let explanation = STORE[questionNumber].funFact
    $(".response").html(
        `<h3>That answer is correct!</h3>
        <img src="images/correct-whale.jpg" alt="breaching humpback whale" class="images" width="200px">
        <p class="sizeMe">Good Job</p>
        <p class="sizeMe">${STORE[questionNumber].funFact}</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
}

function wrongAnswer(){
    $(".response").html(
        `<h3>Whoops! Wrong answer.</h3>
        <img src="images/wrong-fish.jpg" alt="close up of grouper" class="images" width="200px">
        <p class="sizeMe">It's Actually:</p>
        <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
        <p class="sizeMe">${STORE[questionNumber].funFact}</p>
        <button type="button" class="nextButton button">Next</button>`
    );
}

function nextQuestion(){
    $(".ocean").on("click", ".nextButton", function (event) {
        if (questionNumber < STORE.length) {
            $(".altBox").hide();
            $('.questionBox').show();
            updateQuestionNumber();
            $(".questionBox form").replaceWith(generateQuestion());
        } 
    });
    //this function is responsible for taking you to the next question 
    //after you are sent to the correct or wrong answer page
    console.log('`nextQuestion` ran');
}
function finalScore() {
    $(".final").show();

    const great = [
        "Great job",
        "images/win-humpback.jpg",
        "humpback breaching in the clouds",
        "You're swimming with knowledge!"
    ];

    const good = [
        "Pretty good.",
        "images/good-humpback.jpg",
        "humpback booping the camera",
        "This humpback is proud, but wishes you would learn more."
    ];

    const bad = [
        "Oh nooo! Not so good.",
        "images/lose-humpback.jpg",
        "humpback diving",
        "You have made the humpbacks sad."
    ];
    if (score === 5) {
        array = great;
    } else if (score < 5 && score >= 3) {
        array = good;
    } else {
        array = bad;
    }
    return $(".final").html(
        `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your score is ${score} / 5</h3>
        <p class="sizeMe">${array[3]}</p>
        <button type="submit"
        class="restartButton button">Restart</button>`
    );
}

function restartQuiz(){
    $(".ocean").on("click", ".restartButton", function (event){
        event.preventDefault();
        resetStats();
        $(".altBox").hide();
        $(".startQuiz").show();
    });
    //this function is responsible for restarting the quiz
    console.log('`restartQuiz` ran');
}

function makeQuiz(){
    //this function is responsible for initially rendering the startQuiz
    //running the functions responsible for generating the questions, submitting 
    //the answers, clicking to the next question, and restarting the quiz
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(makeQuiz);