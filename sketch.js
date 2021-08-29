var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car1, carImage;
var carsGroup, car2, car3, car4, car5;
var road, roadImg;
var crash, crashImg;
var gameOver, restart;

var distance = 0;
var score = 0;

function preload(){
    car1Image = loadImage("car1.png");
    car2Image = loadImage("car2.png");
    car3Image = loadImage("car3.png");
    car4Image = loadImage("car4.png");
    car5Image = loadImage("car5.png");

    roadImg = loadImage("road.png");
    fuelImg = loadImage("fuel.png");

    crashImg = loadImage("crash.png");
    gameOverImg = loadImage("gameOver.png");
   
    restartImg = loadImage("restart.png");

    gameSound = loadSound("gamesound.mp3")

    hornSound = loadSound("horn.mp3");

    fuelSound = loadSound("fuelsound.mp3");

    gameoverSound = loadSound("gameover.mp3");

}

function setup() {
    createCanvas(600, 800);

    gameSound.loop();


    road = createSprite(300, 400,600,800);
    road.addImage("road", roadImg);
    road.velocityY = (6 + 3*distance/100);
    road.scale = 2.3;
    
    car1 = createSprite(300, 620, 20, 50);
    car1.addImage("car1", car1Image);
    car1.scale = 0.2;
    
    
    gameOver = createSprite(300, 380);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.1;

    crash = createSprite(300, 190);
    crash.addImage(crashImg);
    crash.scale = 0.2;
    
    restart = createSprite(300, 510);
    restart.addImage(restartImg);
    restart.scale = 0.1;

    //gameOver.scale = 0.5;
    //restart.scale = 0.5;

    
    gameOver.visible = false;
    restart.visible = false;
    crash.visible = false;
    
    carsGroup = new Group();
    fuelGroup = new Group();

    distance = 0;
    score = 0;

    car1.setCollider("rectangle",0,0,450,1070);
    car1.debug = false;
}

function draw() {
  
  background(255);

  
  if (gameState===PLAY){
        distance = distance + Math.round(getFrameRate()/60);
        road.velocityY = (6 + 3*distance/100);
    
        if(keyDown("up") ) {
        car1.y = car1.y -(5 + 3*distance/100);

        }
        if(keyDown("down") ) {
            car1.y = car1.y +(5 + 3*distance/100);
        }
        if(keyDown("right") ) {
            car1.x = car1.x +(5 + 3*distance/100);
        }
        if(keyDown("left") ) {
            car1.x = car1.x -(5 + 3*distance/100);
        }
        if(keyDown("h")){
            hornSound.play();

        }
        
        
        if (road.y > 1040){
        road.y = road.height/2;
        }
        spawnCars();
        spawnFuel();

        if(fuelGroup.isTouching(car1)){
            fuelGroup.destroyEach();
            score = score + 20;
            fuelSound.play();
        }
    
        if(fuelGroup.isTouching(carsGroup)){
            fuelGroup.destroyEach();
        }
        if(carsGroup.isTouching(car1)){
            gameState = END;
            gameoverSound.play();
        }
    }
  else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        crash.visible = true;

        road.velocityY = 0;
        car1.velocityY = 0;
        carsGroup.setVelocityYEach(0);
        fuelGroup.setVelocityYEach(0);

                
        carsGroup.setLifetimeEach(-1);
        fuelGroup.setLifetimeEach(-1);


        if(mousePressedOver(restart)) {
        reset();
        }
    }
  
    distance.depth = road.depth;
    distance.depth = distance.depth + 1;

    score.depth = road.depth;
    score.depth = score.depth + 1;

  drawSprites();

  fill("red");
  stroke("red");
  textSize(30);
  text("Distance: "+ distance, 50, 50);

  fill("red");
  stroke("red");
  textSize(25);
  text("Score: "+ score, 400, 50);

  

}

function spawnCars() {
    if(frameCount % 60 === 0) {
      var car = createSprite(Math.round(random(100, 500), 0));
      car.velocityY = (6 + 3*distance/100);

      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: car.addImage(car2Image);
                break;
        case 2: car.addImage(car3Image);
                break;
        case 3: car.addImage(car4Image);
                break;
        case 4: car.addImage(car5Image);
                break;
        case 5: fuel.addImage(fuelImage);
                break;
        default: break;
      }
      
      car.scale = 0.29;
      car.lifetime = 300;
      carsGroup.add(car);

        gameOver.depth = car.depth;
        gameOver.depth = gameOver.depth + 1;

        crash.depth = car.depth;
        crash.depth = crash.depth + 1;

        restart.depth = car.depth;
        restart.depth = restart.depth + 1;

        distance.depth = car.depth;
        distance.depth = distance.depth + 1;

       
    } 
}
function spawnFuel(){
    if(frameCount % 60 === 0) {
        var fuel = createSprite(Math.round(random(100, 500), 0));
        fuel.velocityY = (6 + 3*distance/100);
        fuel.addImage("fuel", fuelImg);
        fuel.scale = 0.1;

        fuelGroup.add(fuel);
        gameOver.depth = fuel.depth;
        gameOver.depth = gameOver.depth + 1;


        crash.depth = fuel.depth;
        crash.depth = crash.depth + 1;

        restart.depth = fuel.depth;
        restart.depth = restart.depth + 1;

        distance.depth = fuel.depth;
        distance.depth = distance.depth + 1;

        
    }
}


function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    crash.visible = false;
    carsGroup.destroyEach();
    fuelGroup.destroyEach();

    car1.addImage("car1", car1Image);
    
    distance = 0;
    score = 0;
}