var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleimage,spawn_obsticals;
var FoodGroup, obstacleGroup;
var survivalTime=0
var score=0;
var gamestate="PLAY"

function preload(){
monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  ground=createSprite(400,170,1300,10); 
  //chnaged the length of ground to be more than 1200
  ground.velocityX=-4
  ground.x=ground.width/2;
  
  monkey=createSprite(90,169,20,20);
  monkey.addAnimation('running',monkey_running);
  monkey.scale=0.11        
  //Chnaged the scale
  FoodGroup = new Group();      
  //Created the group

}

function draw() {
  background(200,240,260)
  if(gamestate==="PLAY"){
    
    textSize(17)
    stroke("white")
    text("survivalTime: " + survivalTime,120,20)
    survivalTime=survivalTime+Math.round(frameRate()/60); 
    //added Math.round and changed 600 to 60
    
    
    textSize(17)
    stroke("white")
    text("score: " + score,300,20)

    spawn_obstacles();
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+1
    }
    
    //Changed the monkey.y number in line 46 below
    if(keyDown("space") && monkey.y > 130) {
      monkey.velocityY = -10;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    
    //changed ground.x<190 to 0
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
} 
  spawn_food();           
  //added the line
  monkey.collide(ground);
  drawSprites();
}
function spawn_obstacles(){
  
  if(frameCount%100===0){
   obstacle=createSprite(550,160,10,10);
   //obstacle.addImage(obstacleimage);
   //obstacleGroup.add(obstacle);
   obstacle.scale=0.5
   obstacle.velocityX=-(4+survivalTime/100);
   obstacle.lifetime=190
  }
}

function spawn_food(){
  
  if(frameCount%100===0){
   banana=createSprite(600, Math.round(random(100,150)),10,10);  
   banana.addImage(bananaImage);
   FoodGroup.add(banana);     
   banana.scale=0.085
   banana.velocityX=-(4+survivalTime/100); 
   banana.lifetime=190
  }
}