/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
let wordslvls = {
  "Hard": [
    "Hello", "Code", "Java", "Town", "Country", "Testing", "Youtube", "Linkedin", "Twitter", "Github",
    "Leetcode", "Internet", "Python", "Scala", "Destructuring", "Paradigm", "Styling", "Cascade",
    "Documentation", "Coding", "Funny", "Working", "Dependencies", "Task", "Runner", "Roles",
    "Test", "Rust", "Playing"
  ],
  "Easy": [
    "Cat", "Dog", "Sun", "Car", "Pen", "Cup", "Tree", "Book", "Fish", "Ball",
    "Boy", "Girl", "Run", "Toy", "Bag", "Hat", "Egg", "Bed", "Box", "Map",
    "Key", "Red", "Blue", "Cow", "Duck", "Go", "Yes", "No", "Fan", "Bus"
  ],
  "Normal": [
    "Apple", "House", "School", "Chair", "Phone", "Water", "Table", "Music", "Happy", "Light",
    "Flower", "Smile", "Dream", "Story", "Game", "River", "Birds", "Train", "Cloud", "Beach",
    "Family", "Green", "Paper", "Window", "Bottle", "Horse", "Tiger", "Garden", "Planet", "Bridge"
  ]
};
console.log(wordslvls["Hard"])

let lvls = {
  "Easy":5,
  "Normal":3,
  "Hard":2
}
console.log(lvls["Easy"])
//var
let scoreNum = 0
let totalTime= 0
let count = true

let inpLvl = document.querySelectorAll("input[name='cho']")
let lvl = document.querySelector(".lvl")
let second = document.querySelector(".seconds")
let container = document.querySelector(".container")
let start = document.querySelector(".start");
let theWord = document.querySelector(".the-word")
let inp = document.querySelector(".input")
let wordsShow = document.querySelector(".upcoming-words")
let score = document.querySelector(".score .got")
let timeArea = document.querySelector(".time span")
let total = document.querySelector(".total")
let loseInfo = document.querySelector(".finish")




// timeArea.innerHTML=timeExam
inpLvl.forEach((e)=>{
  e.addEventListener("change",()=>{
    second.innerHTML=lvls[e.value]
    console.log(e.value)
  })
})

start.onclick = ()=>{
  let Select = document.querySelector("input[name='cho']")
  let SelectCHecked = document.querySelector("input[name='cho']:checked")
  
  if(SelectCHecked){
    Select.parentElement.textContent = SelectCHecked.value
    lvl.classList.remove ("highlight")
    
  start.remove()
  generate()
  }else{
    lvl.classList.add ("highlight")
  }
}

inp.addEventListener("input",()=>{
  if(count === true){
  timer()
  count = false
  }

  if(lvl.textContent === "Easy"){
    if(theWord.textContent.toUpperCase() === inp.value.toUpperCase()){
      generate()
      scoreNum++
      score.innerHTML=scoreNum
      inp.value=""
    }    
  }else{
    if(theWord.textContent === inp.value){
      generate()
      scoreNum++
      score.innerHTML=scoreNum
      inp.value=""
    }    
  }

});

function generate(){
  console.log(wordslvls[lvl.textContent])
  let words = wordslvls[lvl.textContent]
  // console.log(words)
  if(words.length >= 1){

    timeArea.innerHTML=second.textContent
    timeExam = second.textContent

    let randomNum = Math.floor((Math.random()*words.length))
    let newWord = words[randomNum]

    inp.focus()
    wordsShow.innerHTML=""
    words.forEach((e)=>{
    theWord.innerHTML = newWord

              //color word
          let arr =[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
          let colorParts = []
          for(let i =0; i<6; i++){
              let random = Math.floor(Math.random() * arr.length)
              let arrRandom = arr[random]
              colorParts.push(arrRandom)
          }
          theWord.style.color= `#${colorParts.join("")}`
          
    let word = document.createElement("div");
    word.innerHTML = e
    wordsShow.appendChild(word)
  })
    words.splice(randomNum,1)                      // ملحوظه للمراجعه
  }else{
    theWord.remove()
    inp.remove()
    wordsShow.innerHTML = "YOU WIN"
    wordsShow.classList.add("win")
  }
}
function timer(){
    timeExam = second.textContent

    total.innerHTML=`${totalTime}s`
  let x = setInterval(()=>{
    timeExam--
    totalTime++
    timeArea.innerHTML=timeExam
    total.innerHTML=`${totalTime}s`

    if(wordsShow.classList.contains("win")){
      clearInterval(x)
    }else{

    
    if(timeExam === 0){
      clearInterval(x)
      inp.disabled = true
      loseInfo.innerHTML="You lose"
    }
  }
  },1000)
  
}
