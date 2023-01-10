var question;
var answer;

var contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
});

// function to generate new Flash Card
function flashcardMaker(text, delThisIndex) {
  const flashcard = document.createElement("div");
  question = document.createElement("h2");
  answer = document.createElement("h2");
  const delete_btn = document.createElement("button");
  const HideBtn = document.createElement("HideBtn");

  flashcard.className = "flashcard";
  question.setAttribute(
    "style",
    "border-top:1px solid red; font-size:30px; padding: 15px; margin-top:30px"
  );
  question.textContent = text.my_question;
  answer.setAttribute(
    "style",
    " display:none; font-size:20px; margin:10px 20px;"
  );
  answer.textContent = text.my_answer;

//   Hide answer button 
  HideBtn.innerText = "Hide / Show";
  HideBtn.style.marginLeft = "20px";
  HideBtn.style.color = "blue";
  HideBtn.style.fontWeight = "600";

//  delete card button 
  delete_btn.innerText = "Delete";
  delete_btn.style.float = "right";
  delete_btn.style.marginRight = "20px";
  delete_btn.style.marginTop = "50px";
  delete_btn.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem("items", JSON.stringify(contentArray));
    window.location.reload();
  });

  flashcard.appendChild(question);
  flashcard.appendChild(HideBtn);
  flashcard.appendChild(answer);
  flashcard.appendChild(delete_btn);

  HideBtn.addEventListener("click", () => {
    if (answer.style.display == "none") answer.style.display = "block";
    else answer.style.display = "none";
  });

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);

// Flash Card Function
addFlashcard = () => {
  question = document.querySelector("#question");
  answer = document.querySelector("#answer");

  // condition if the Question and Answer input is null then this condition will occure
  if (question.value == "" || answer.value == "") {
    document.querySelector("#showdata").innerHTML =
      "Please fill all the fields";

    $("#showdata").css("background-color", "pink");
    $("#showdata").css("font-size", "20px");
    $("#showdata").css("border", "solid 2px red");
    $("#showdata").css("padding", "10px");
    $("#showdata").css("border-radius", "5px");
  } else {
    let flashcard_info = {
      my_question: question.value,
      my_answer: answer.value,
    };

    //   clear the form after save data
    question.value = "";
    answer.value = "";
    $("#showdata").hide();

    // push the flashcard data into contentArray
    contentArray.push(flashcard_info);
    localStorage.setItem("items", JSON.stringify(contentArray));
    flashcardMaker(
      contentArray[contentArray.length - 1],
      contentArray.length - 1
    );
  }
};

// clear function to clear the form data
function clear_form() {
  $("#btn-1").on("click", function () {
    $("#form-1").show();
  });

  const questionInput = document.getElementById("question");
  const answerInput = document.getElementById("answer");

  questionInput.value = "";
  answerInput.value = "";
}

// JQuery to hide and show forms
$("#question_Btn").on("click", function () {
  $("#form-1").show();
});

$(document).ready(function () {
  $("#form-1").hide();
  $("#card").hide();
});

$("#cross_btn").on("click", function () {
  $("#form-1").hide();
  $("#showdata").hide();
});
