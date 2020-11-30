var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;
var cloudsGroup;
var obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver;
var gameOverImage;
var restart;
var restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
}


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);                  
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  trex.camera.position.x=displayWidth/2;
  trex.camera.position.y=trex.y;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  score=0;
  cloudsGroup=new Group()
  obstaclesGroup=new Group()
  gameOver=createSprite(300,50,50,50);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  restart=createSprite(300,100,50,50);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
}

function draw() {
  background(220);
  if(gameState===PLAY){
    if(keyDown("space") && trex.y>=159) {
    trex.velocityY = -10;
    
    } 
    trex.velocityY = trex.velocityY + 0.8 ; 
    

    if (ground.x < 0){ 
      ground.x = ground.width/2;
    }
    
    score=score+Math.round(getFrameRate()/60);
    
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if(gameState===END) {
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    ground.velocityX=0;
    cloudsGroup.setlifetimeEach=(-1);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    
  }
  
  if(mousePressedOver(restart)){
    reset();
    
  }

  text("score:"+score,500,50);
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60===0){
  var cloud=createSprite(600,120,40,10);
  cloud.y=random(80,120);
  cloud.addAnimation("cloud",cloudImage);
  cloud.scale=0.5;
  cloud.velocityX=-3;
  cloud.lifetime=200;
  cloudsGroup.add(cloud);
   cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
  }
  
  }


function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle=createSprite(600,165,10,40);
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);  
             break;
      case 2:obstacle.addImage(obstacle2);  
             break;  
      case 3:obstacle.addImage(obstacle3);  
             break;
      case 4:obstacle.addImage(obstacle4);  
             break;
      case 5:obstacle.addImage(obstacle5);  
             break;
      case 6:obstacle.addImage(obstacle6); 
             break;        
    }  
    
  obstacle.scale=0.5;
  obstacle.velocityX=-3;
  obstacle.lifetime=200;
  obstaclesGroup.add(obstacle);
    
  }
  
}

function reset(){         

gameState=PLAY;
cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
gameOver.visible=false;
restart.visible=false;
trex.changeAnimation("running",trex_running);
score=0;

}
