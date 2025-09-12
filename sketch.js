let playerSprite;
let floor;
let jumpSwitch = false;
let backgroundImg;
let plataformas;
let gravity = 500;
let key;
let uWin;
let winSwitch = false;
let obstacles;
let obstaclesSwitch = false;
let heart;
let lives = 3;
let gameOver;
let gameOverSwitch = false;
let obstaculoX = 200;

function preload(){
backgroundImg = loadImage("assets/back2.png");
uWin = loadImage("assets/uWIN.jpg");
heart = loadImage("assets/heart.png");
gameOver = loadImage("assets/gameOver.jpg");
}

function setup() {
    new Canvas(windowWidth, windowHeight);
    playerSprite = new Sprite();
    playerSprite.addAni('standing', 'assets/standing.png');
    playerSprite.addAni('left','assets/walkingLeft1.png','assets/walkingLeft2.png');
    playerSprite.addAni('right','assets/walkingRight1.png','assets/walkingRight2.png')
    playerSprite.addAni('jumping', 'assets/jumping.png');
    playerSprite.width = 60;
    playerSprite.debug = false;
    playerSprite.scale = 2;
    playerSprite.x = 1350;
    playerSprite.y = 100;
    playerSprite.mass = 1;
    floor = new Sprite(width/2,windowHeight+10,windowWidth,50,STATIC);
    floor.opacity = 0;
    world.gravity.y = gravity;
    key = new Sprite();
    key.addAni('key','assets/key.png');
    key.x = 80;
    key.y = 100;
    key.static = true;
    key.debug = true;
    key.scale = 0.6;

    cliff = new Sprite();
cliff.x = 1350;
cliff.y = 380;
cliff.addAni('cliff','assets/cliff.png');
cliff.scale = 3;
cliff.width = 250;
cliff.height = 380;
cliff.collider = 'rect';
cliff.static = true;
cliff.rotationLock = true;
cliff.mass = 0;
cliff.gravityScale = 0;
plataformas = new Group();
    plataformas.color = 'red';
    while (plataformas.length < 3) {
        let plataforma = new plataformas.Sprite();
        plataforma.x = plataformas.length * 200;
        plataforma.y = plataformas.length * height/6+200;
        plataforma.addAni('plataforma','assets/metalPlatform.png');
        plataforma.scale = 0.65;
        plataforma.debug = false;
        plataforma.width = 100;
        plataforma.static = true;
    }

obstacles = new Group();
while (obstacles.length < 3){
    let obstacle = new obstacles.Sprite();
    obstacle.x = 260;
    obstacle.y = 50;
    obstacle.scale = 0.2;
    obstacle.addAni('obstaculo','assets/obs0.png');
    obstacle.radius = 20;
    obstacle.debug = true;
    obstacle.mass = 0.5;
    obstacle.gravityScale = 0.1;

}



}
function update() {

    let delayFrames = 80; 
    for (let i = 0; i < obstacles.length; i++) {
        if (frameCount > i * delayFrames) {
        obstacles[i].visible = true;
    }
}

   image(backgroundImg,0,0,windowWidth,windowHeight);
      playerSprite.rotation = 0;

//Sistema de Vidas
   if(lives == 3){
       image(heart,width-100,50,50,50);
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 2){
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 1){
       image(heart,width-200,50,50,50);
   }

   if(playerSprite.collides(obstacles)){
       lives -= 1;
   }

   if(lives == 0){
       gameOverSwitch = true;
   }

//sistema de Colisiones

    if(playerSprite.collides(plataformas[2])){
        plataformas[2].position.x += random(-5,5);
   
    }
    if(playerSprite.collides(plataformas[1])){
        plataformas[1].position.x += random(-5,5);
       
    }
    if(playerSprite.collides(plataformas[0])){
        plataformas[0].position.x += random(-5,5);
       
    }

   

    if (playerSprite.collides(floor) || playerSprite.collides(plataformas) || playerSprite.collides(cliff)) {
    jumpSwitch = true;
    }



for(var i = 0; i<obstacles.length; i++){
    if(obstacles[i].collides(floor) || obstacles[i].collides(playerSprite))
        {
        obstacles[i].x = random(200, 260);
        obstacles[i].y = random(-600, -800);
        obstacles[i].velocity.x = 0;
        //obstacles[i].velocity.y = gravity;
    }
}

    //key Interaction

    if(playerSprite.collides(key)){
        winSwitch = true;
       
    }
    if(winSwitch){
        image(uWin,0,0,width,height);
        for(var i = 0;i<3;i++){
            plataformas[i].position.x = -500;
            obstacles[i].position.x = -1000;
                   cliff.x = -1000;

        }
        key.position.x = -500;
    }
    //playerSprite.speed = 3;

    if (kb.released('d')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('a')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('w')) {
        playerSprite.changeAni('standing');
    }

    if (kb.pressing('w')&&jumpSwitch==true) {
        playerSprite.velocity.y = -50;
        playerSprite.changeAni('jumping');
        jumpSwitch = false;
       
    }  else if (kb.pressing('a')) {
        playerSprite.velocity.x = -10;
        playerSprite.changeAni('left');
    } else if (kb.pressing('d')) {
        playerSprite.velocity.x = 10;
        playerSprite.changeAni('right');
    } else {
      playerSprite.speed = 0;
    }

//Mecánica final del juego
    if(gameOverSwitch){
       image(gameOver,0,0,width,height);
       plataformas[0].x = -1000;
       plataformas[1].x = -1000;
       plataformas[2].x = -1000;
       cliff.x = -1000;
       playerSprite.x = -2000;
       playerSprite.y = -1000;
       key.x = -1000;
       obstacles[0].x = -1000;
       obstacles[1].x = -1000;
       obstacles[2].x = -1000;
   }

   print(obstacles[0]);

}