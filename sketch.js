var alien1,alien2,fruit1,fruit2,fruit3,fruit4,sword,gameOver,knife;
var alien1Image,alien2Image,fruit1Image,fruit2Image,fruit3Image,fruit4Image,swordImage,gameOverImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0 ;

function preload(){
  alienImage = loadAnimation("alien1.png","alien2.png")
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  gameOverImage = loadImage("gameover.png")
  swordImage = loadImage("sword.png")
  knifeSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
  
  
}
function setup(){
  createCanvas (400,400)
  
  knife = createSprite(40,200,20,20)
    knife.addImage(swordImage);
  knife.scale= 0.5;
  fruitGroup = new Group ();
  enemyGroup = new Group ();   
  gameOver = createSprite(200,200)
  gameOver.addImage(gameOverImage);
}
function draw(){

  background("lightblue");
  
  if (gameState === PLAY){
   spawnalien ();
    spawnfruit ();
    if(enemyGroup.isTouching(knife)){
        gameState = END;
        gameOverSound.play();
      
    }
    if (fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score +1
       knifeSound.play();
    }
    knife.y = World.mouseY;
     knife.x = World.mouseX;
     gameOver.visible = false;
  }
  
  if (gameState === END){
     gameOver.visible = true;
    fruitGroup.destroyEach();
    fruitGroup.setVelocityXEach(5);
    enemyGroup.destroyEach();
    enemyGroup.setVelocityXEach(15);
    
}
  
  drawSprites(); 

  
  
      text(" score :" + score,320,50)


}
function spawnfruit(){
 if (frameCount % 60 === 0){
   var fruit = createSprite(400,Math.round(random(20, 370)), 10, 10);
   fruit.velocityX = -(6 + score/100);
   
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(fruit4Image);
              break;
      default: break;
    }
 
 
    //assign scale and lifetime to the obstacle           
   fruit.scale = 0.1;
  fruit.lifetime = 300;
   
   //add each fruit to the group
    fruitGroup.add(fruit);
position = Math.round(random(1,2));
 if(position==1){
   fruit.x=400;
   fruit.velocityX=-(7+(score/4));
 }
  if(position==2){
     fruit.x=0;
   fruit.velocityX= (7+(score/4));
 }
 
 }
  
}

function spawnalien() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var  alien = createSprite(600,120,40,10);
    alien.y = Math.round(random(80,320));
    alien.addAnimation("alians",alienImage);
    alien.scale = 0.5;
    alien.velocityX = -9;
    
     //assign lifetime to the variable
    alien.lifetime = 200;
    

    
    
    //add each cloud to the group
 enemyGroup.add(alien);
  }
}
  