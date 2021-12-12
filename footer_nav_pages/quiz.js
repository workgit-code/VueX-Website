  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = [];
        // and for each available answer...
        for(letter in currentQuestion.answers){
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  function showResults(){
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // keep track of user's answers
    let numCorrect = 0;
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }
  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }
  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1.Star Wars IV: A New Hope: What species is character Admiral Ackbar?",
      answers: {
        a: "Tetramorium",
        b: "Mon Calmari",
        c: "Agathidium vaderi"
      },
      correctAnswer: "b"
    },
    {
      question: "2. Home Alone 2: Lost in New York: Which US President gives Kevin McAllister directions?",
      answers: {
        a: "Barack Obama",
        b: "George Bush",
        c: "Donald Trump"
      },
      correctAnswer: "c"
    },
    {
      question: "3. Mary Poppins Returns: How many children does Mary Poppins look after?",
      answers: {
        a: "4",
        b: "5",
        c: "3"
      },
      correctAnswer: "c"
    },
    {
      question: "4. Where is filmed 'The lord of the rings'",
      answers: {
        a: "Norway",
        b: "New Zeland",
        c: "Australia"
      },
      correctAnswer: "b"
    },
    {
      question: " 5. How many Matrix movie are there?",
      answers: {
        a: "4",
        b: "5",
        c: "3"
      },
      correctAnswer: "a"
    },
    {
      question: "6. For which movie Leonardo DiCaprio gets Oscar?",
      answers: {
        a: "Titanic",
        b: "Blood Diamond",
        c: "The revenant"
      },
      correctAnswer: "c"
    },
    {
      question: "7. When the Oscar are created?",
      answers: {
        a: "1929",
        b: "1930",
        c: "1945"
      },
      correctAnswer: "a"
    },
    {
      question: "8. Which is Tom Hanks last movie?",
      answers: {
        a: "Finch",
        b: "The circle",
        c: "Greyhound"
      },
      correctAnswer: "a"
    },
    {
      question: "9. How much movies are 'Harry Potter'?",
      answers: {
        a: "7",
        b: "8",
        c: "9"
      },
      correctAnswer: "b"
    },
    {
      question: "10. Which actress is behind the voice oif Tigress from Kung Fu Panda?",
      answers: {
        a: "Angelina Jolie",
        b: "Sandra Bulock",
        c: "Selena Gomez",
      },
      correctAnswer: "a"
    },{
      question: "11. When was created the first Pirates of the Caribbean?",
      answers: {
        a: "2003",
        b: "2004",
        c: "2008",
      },
      correctAnswer: "a"
    },
    {
      question: "12. Is it true that Clownfish Vanished After Finding Nemo",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a"
    }
  ];

 // Kick things off
 buildQuiz();

 // Pagination
 const previousButton = document.getElementById("previous");
 const nextButton = document.getElementById("next");
 const slides = document.querySelectorAll(".slide");
 let currentSlide = 0;

 // Show the first slide
 showSlide(currentSlide);

 // Event listeners
 submitButton.addEventListener('click', showResults);
 previousButton.addEventListener("click", showPreviousSlide);
 nextButton.addEventListener("click", showNextSlide);


