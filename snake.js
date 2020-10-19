
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

//load images 
const ground = new Image();
ground.src = "ground.png"; //pakshi1.jpg ground.png

const foodimg = new Image();
foodimg.src = "food.png";

// create the snake 
 let snake = [];
 snake[0]={
     x : 9 * box,
     y : 10 * box
 }

 // create the foodconst cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
 let food = {
     x : Math.floor(Math.random()*17+1)*box,
     y : Math.floor(Math.random()*15+3)*box
 }

 // create the score 
 let score = 0;

 //control the snake 
 let d;
 document.addEventListener("keydown",direction); 
 function direction(event){
     if(event.keyCode == 37 && d != "RIGHT"){
         d = "LEFT";
     }else if(event.keyCode == 38 && d != "DOWN"){
         d = "UP";
     }
     else if(event.keyCode == 39 && d !=  "LEFT"){
         d = "RIGHT";
     }
     else if(event.keyCode == 40 &&  d !=  "UP"){
        d = "DOWN";
    }
}

//collision function
function collision(head,array){
    for(let i=0; i<array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
            
        }
    }
      return false;
    }    

 // draw everything to the function
function draw(){
    ctx.drawImage(ground,0,0);
    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = (i==0)?"blue":"pink";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodimg,food.x,food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;
    
    //if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food  = {
            x : Math.floor(Math.random()*17+1)*box,
            y : Math.floor(Math.random()*15+3)*box
        }
        //we don't remove the tail
    }  else{
        //remove the tail
        snake.pop();
    }

        //new head
        let newhead = {
            x : snakeX,
            y : snakeY
        }

    //game over 
    if(snakeX < box || snakeX > 17*box  || snakeY < 3*box || snakeY > 17*box ||
         collision(newhead,snake)){
        clearInterval(game);
        //alert("gameover");
    } 

    snake.unshift(newhead);

    //score
    ctx.fillStyle = "white";
    ctx.font = "40px arial";
    ctx.fillText(score,2*box,1.6*box);
}

// call the draw function every 100 milliseconds
let game = setInterval(draw,100);