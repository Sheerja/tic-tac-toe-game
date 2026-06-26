const p1score=document.getElementById("p1score");
const p2score=document.getElementById("p2score");
const turn=document.getElementById("turnof");
const resetbtn=document.getElementById("reset");
const newbtn=document.getElementById("newgame");

const statustext=document.querySelector(".status h3");
const boxes=document.querySelectorAll(".box");

let currentPlayer="X";
let gameOver=false;
let p1_score=0;
let p2_score=0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],
];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(box.innerText!==""||gameOver)
        {
            return;
        }
        box.innerText=currentPlayer;
   
     if(currentPlayer === "X"){
            box.style.color = "#00bfff";
            box.style.textShadow = "0 0 10px #00bfff";
        }
        else{
            box.style.color = "#ff4fd8";
            box.style.textShadow = "0 0 10px #ff4fd8";
        }
        checkWinner();
        if(!gameOver)        
        {
          switchTurn();
          checkDraw();  
        }
    });

});
function switchTurn(){
        if(currentPlayer==="X")
        {   currentPlayer="O"
            turn.innerText="2";
        }
        else{
            currentPlayer="X";
            turn.innerText="1";
        }
}
function checkWinner()
{
    for(let pattern of winPatterns){
        let a=boxes[pattern[0]].innerText;
        let b=boxes[pattern[1]].innerText;
        let c=boxes[pattern[2]].innerText;
        if(a!=="" && a===b && b===c)
        {
           gameOver= true;
           if(a==="X")
            {
                p1_score++;
                p1score.innerText=p1_score;
                statustext.innerText="🎉 Player 1 Wins!";
            } 
            else{
                p2_score++;
                p2score.innerText=p2_score;
                statustext.innerText="🎉 Player 2 Wins!";
            }
            highlightpattern(pattern);
            return;
        }
}
}
function highlightpattern(pattern){
    pattern.forEach((index)=>{
        boxes[index].style.backgroundColor = "#22c55e";
        boxes[index].style.boxShadow = "0 0 20px #22c55e";
    });
}
function  checkDraw(){
    let filled=true;
    boxes.forEach((box)=>{
        if(box.innerText=="")
        {
            filled=false;
        }
    });
    if(filled && !gameOver)
    {
        gameOver=true;
        statustext.innerText="🤝 Match Draw";
    }
}
function resetBoard()
{
    boxes.forEach((box)=>{
        box.innerText="";
        box.style.backgroundColor = "#ebe2e962";
        box.style.boxShadow = "none";
    });
    currentPlayer = "X";
    gameOver = false;
 
    turn.innerText = "1";
    statustext.innerText = "No Winner Yet";

}
resetbtn.addEventListener("click", () => {

    resetBoard();

});
newbtn.addEventListener("click",()=>{
    resetBoard();
    p1score.innerText=0;
    p2score.innerText=0;
    p1_score=0;
    p2_score=0;
});

