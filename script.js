const gameBoard=document.querySelector('#gameBoard');
const ctx=gameBoard.getContext("2d");
const scoreText=document.querySelector("#scoreText");
const reset=document.querySelector("resetBtn");
const gamewith =gameBoard.width;
const gameheight=gameBoard.height;
const boardBackground ="green";
const snakeColor="lightgreen";
const snakeBorder="white";
const foodColor="red";
const unitSize=35;
let running =true;
let xVelocity=unitSize;
let yVelocity=0;
let foodX;
let foodY;
let score=0;
let snake=[
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize*1,y:0},
    {x:unitSize*4,y:0},
    {x:unitSize*5,y:0},
    {x:0,y:0}

];
window.addEventListener("keydown",changedirection);
resetBtn.addEventListener("click",resetGame);
gameStart();

function gameStart()
{
    running=true;
    scoreText.textContent=score;
    createfood();
    drawfood();
    nextTick();
    
};
function nextTick()
{
    if(running)
    {
        setTimeout(()=>{
            clearBoard();
            drawSnake();
            moveSnake();
            drawfood();
            checkGameOver();
            nextTick();
            
        },130)
    }
    else{
        displayGame();
    }
};
function clearBoard()
{
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gamewith,gameheight);
};
function createfood()
{
    function randomFood(min,max)
    {
        const randNum=Math.round((Math.random() *(max-min)+min)/unitSize)*unitSize
        return randNum;
    }
    foodX=randomFood(0,gamewith-unitSize);
    foodY=randomFood(0,gamewith-unitSize);

    console.log(foodX);
};
function drawfood()
{
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
};
function moveSnake()
{

    const head={x:snake[0].x +xVelocity,y:snake[0].y+yVelocity}
    snake.unshift(head);
    if(snake[0].x==foodX &&snake[0].y==foodY)
    {
        score+=1;
        scoreText.textContent=score;
        createfood()
    }
    else{
        snake.pop();
    }
};
function drawSnake()
{
   ctx.fillStyle=snakeColor ;
   ctx.strokeStyle=snakeBorder;
   snake.forEach(snakePart=>
    {
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)

    })
};
function changedirection(event)
{
    const keypressed=event.keyCode;
    const left=37;
    const up=38;
    const right=39;
    const down=40;
    const goingup=(yVelocity==-unitSize);
    const goingdown=(yVelocity==unitSize);
    const goingleft=(xVelocity==-unitSize);
    const goingright=(xVelocity==unitSize);
    switch(true)
    {
        case(keypressed==left &&  !goingright):
        xVelocity=-unitSize;
        yVelocity=0;
        break;
        case(keypressed==up &&  !goingup):
        xVelocity=0;
        yVelocity=-unitSize;
        break;
        case(keypressed==right &&  !goingleft):
        xVelocity=unitSize;
        yVelocity=0;
        break;
        case(keypressed==down &&  !goingdown):
        xVelocity=0;
        yVelocity=unitSize;
        break;
        

    }
};
function checkGameOver()
{
    switch(true)
    {
        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x>=gamewith):
        running=false;
        break;
        case(snake[0].y<0):
        
            running=false;
            break;
        case(snake[0].y>=gameheight):
        running=false;
        break;

    }
    // for(let i=1;i<snake.length;i+=1)
    // {
    //     if(snake[i].x==snake[0].x &&snake[i].y==snake[0].y)
    //     {
    //         running=false;
    //     }
    // }
};
function displayGame()
{
    ctx.font="50px Arail";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER",gamewith/2,gameheight/2)
    running=flase;
};
function resetGame()
{
    score=0;
    xVelocity=unitSize;
    yVelocity=0;
    snake=[
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize*4,y:0},
        {x:unitSize*5,y:0},
        {x:0,y:0}
    
    ];
    gameStart();
};