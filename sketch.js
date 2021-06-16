var bullet,edges;
var count = 0;
var lives = 3;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload()
{
  Zombies1img = loadAnimation("sprites/SPOOKYPIE1.png","sprites/SPOOKYPIE2.png","sprites/SPOOKYPIE3.png","sprites/SPOOKYPIE4.png","sprites/SPOOKYPIE5.png","sprites/SPOOKYPIE6.png");
  Zombies2img = loadAnimation("sprites/SPOOKER1.png","sprites/SPOOKER2.png","sprites/SPOOKER4.png");
  Zombies3img = loadAnimation("sprites/zombspookes1.png","sprites/zombspookes2.png","sprites/zombspookes3.png","sprites/zombspookes4.png","sprites/zombspookes5.png","sprites/zombspookes6.png");
  backgroundImg = loadImage("sprites/Background.png")
  trevorStand = loadAnimation("sprites/shooting2.png")
  trevorGeneral = loadAnimation("sprites/playerRun1.png","sprites/playerRun2.png","sprites/playerRun3.png","sprites/playerRun4.png","sprites/playerRun5.png","sprites/playerRun6.png");
  Bullets = loadImage("sprites/Bullets.png");
}




function setup() {
  createCanvas(1500,700);

 trevor = createSprite(300, 500, 50, 50);
 trevor.addAnimation("trevorStand",trevorStand);
 trevor.addAnimation("trevor",trevorGeneral);

 bullet = createSprite(370, 460, 25, 25);
 bullet.addImage(Bullets);
 bullet.visible= false;
   trevor.scale = 0.4;

 zombiesGroup = new Group()
 edges= createEdgeSprites();
 


}

function draw() {
  background(backgroundImg);  
  textSize(25);
  fill("black");
  text("Zombies killed = "+score,1200,100);
  text("Trevor Lives "+lives,70,100);
  if(gameState === PLAY)
  {
    if(keyDown("space"))
    {
      bullet = createSprite(370, 460, 25, 25);
      bullet.addImage(Bullets);
      bullet.scale = 0.2;
      bullet.velocityX = 3;
      bullet.x=trevor.x+100;
      bullet.y=trevor.y-40;
    }
      for(var i = 0; i<zombiesGroup.length; i++)
      {
        if(zombiesGroup.get(i).isTouching(bullet))
        {
          zombiesGroup.get(i).destroy();
          bullet.destroy();
          score = score+10;
        }
      }
      if(keyWentDown(LEFT_ARROW))
      {
        trevor.velocityX= -2;
        trevor.changeAnimation("trevor",trevorGeneral);
        trevor.scale = 0.3;
      }
      if(keyWentUp(LEFT_ARROW))
      {
        trevor.velocityX= 0;
        trevor.changeAnimation("trevorStand",trevorStand);
        trevor.scale = 0.3;
      }
      if(keyWentDown(RIGHT_ARROW))
      {
        trevor.velocityX= 2;
        trevor.changeAnimation("trevor",trevorGeneral);
        trevor.scale = 0.3;
      }
      if(keyWentUp(RIGHT_ARROW))
      {
        trevor.velocityX= 0;
        trevor.changeAnimation("trevorStand",trevorStand);
        trevor.scale = 0.3
      }
      if(keyWentDown(UP_ARROW))
      {
        trevor.velocityY= -12;
        trevor.changeAnimation("trevor",trevorGeneral);
        trevor.scale = 0.3;
      }
      if(keyWentUp(UP_ARROW))
      {
        trevor.velocityY= 0;
        trevor.changeAnimation("trevorStand",trevorStand);
        trevor.scale = 0.3
      }
      spawnZombies();
      trevor.velocityY = trevor.velocityY + 0.5;

      if(zombiesGroup.isTouching(trevor))
      {
        count = count+1;
       // lives = lives-1;

      }
    // lives = lives-1;
     if(lives === 0)
     {
      // gameState = END;
     }
    
  }
  else if(gameState === END)
  {

  }
 
  trevor.collide(edges[3]); 
  
  drawSprites();
}



function spawnZombies()
{
  

  if(frameCount%100===0)
  {
    var rand = Math.round(random(1,3))
    var randomY = Math.round(random(100, 1300))
   Zombies1 = createSprite(1500,randomY,65,65);
   switch(rand)
   {
     case 1: Zombies1.addAnimation("Zombies1",Zombies1img);
     break;
     case 2: Zombies1.addAnimation("Zombies2",Zombies2img);
     break;
     case 3: Zombies1.addAnimation("Zombies3",Zombies3img);
     break;
   }
   Zombies1.velocityX = -1;
   zombiesGroup.add(Zombies1);
  }
}
