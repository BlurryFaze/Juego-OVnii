
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Constraint = Matter.Constraint;
let world;
let engine;
var database;
var sueloinvisible;
var luna;
var constructor;
var cuerda;
var homebutton;
var resetbutton;
var titulo,tituloimg;
var avion;
var gamestate="Inicio";
var playbutton
function preload(){
  vacaimg = loadImage ("vacalevitando.png");
  lunaimg = loadImage ("luna.png");
  playbuttonimg= loadImage ("boton play.png");
  backgroundimg= loadImage ("fondo ovni.jpg");
  tituloimg= loadImage ("Ovnititulo.png");
  homeimg = loadImage ("botonhome.png");
  resetimg = loadImage ("reiniciarboton.png");
  avionimg = loadImage ("avioooon.png");
  ovniimg = loadImage ("ovni4luz.png");
}
function setup() {
  canvas = createCanvas(700,600);
  ovni = createSprite(200,100,50,50);
  playbutton = createSprite(350,420,20,20);
  playbutton.scale = 0.2;
  playbutton.addImage ("boton play.png", playbuttonimg);
  resetbutton = createSprite (90,30,80,80);
  resetbutton.addImage("reiniciarboton.png",resetimg);
  resetbutton.scale = 0.23;
  
  homebutton = createSprite (30,30,80,80);
  homebutton.addImage("botonhome.png",homeimg);
  homebutton.scale = 0.4;
  
  ovni.addImage("ovni4", ovniimg);
  ovni.scale = 0.2;
  // database = firebase.database();
  engine = Engine.create();
  world = engine.world;
  var v_o = {
    restitution: 0.8
    
  }

  titulo = createSprite(350,200,80,80);
  titulo.addImage(tituloimg);
  titulo.scale = 0.3;
  suelo =new Suelo(349,height-10,width,20);
  vaca = Bodies.circle(10,200,15,v_o);
  World.add(world,vaca);

  luna = createSprite(550,220,100,10);
  luna.addImage("lunaimg2",lunaimg);
  luna.scale=0.2;
  luna.visible=false;
  //ovni = createSprite(200,100,50,50);
  //ovni.addImage();
 // ovni.scale = 0.2;
 
 cuerda = new Rope(2,{x:ovni.x,y:ovni.y});
  
 constructor = new Link(cuerda,vaca);
 
}


function draw() 
{
 
  imageMode(CENTER);

  background(51);
  image(backgroundimg,width/2,height/2,width,height);   
  Engine.update(engine);
cuerda.pointA.x=ovni.x
cuerda.pointA.y=ovni.y
image(vacaimg,vaca.position.x,vaca.position.y,100,100)
 if (vaca.position.x>530&&vaca.position.x<570&&vaca.position.y>200<240){
gamestate= "Victoria";
 }

 if (gamestate=== "Gameover"){
  swal(
    {
      title: `GAMEOVER`,
      text: "¡Intentalo denuevo!",
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.es%2Ficono-gratis%2Fovni_275082&psig=AOvVaw0u4oadf3pk_xQLrUFK8fVV&ust=1669588137455000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDE_9DyzPsCFQAAAAAdAAAAABAE",
      imageSize: "150x150",
      confirmButtonText: "Intentar denuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
 }
 if (gamestate==="Victoria"){
  swal(
    {
      title: `¡Victoria!`,
      text: "¡Lo lograste!",
      imageUrl:
        "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55000/trophy-emoji-clipart-md.png",
      imageSize: "150x150",
      confirmButtonText: "Regresar"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
 }
if (gamestate === "Inicio"){
  ovni.visible= false;
  homebutton.visible = false;
  resetbutton.visible = false;
  }
  if (mousePressedOver(playbutton)){
   gamestate= "Jugando";
   playbutton.visible=false;
   titulo.visible= false;

   
  }
  if (mousePressedOver(homebutton)){
    gamestate= "Inicio";
    playbutton.visible= true;
    titulo.visible= true;
    
   }
  if (mousePressedOver(playbutton)){
    gamestate= "Jugando";
    playbutton.visible=false;
    titulo.visible= false;
    
 
   }
  if (gamestate === "Jugando"){
    suelo.show();
    
   
    cortarb = createImg('botonprendido.png');
  cortarb.position(10,530);
  cortarb.size(50,50);
  cortarb.mouseClicked(soltar);
  ovni.visible = true;
  homebutton.visible = true;
  resetbutton.visible = true;
  luna.visible = true;
  movimientosovni ();
  
  }
  pop();
  cuerda.show()

  
 // if(keyDown("space")&& fantasma.y >= 100) {
   // fantasma.velocityY = -12;
   drawSprites();
}//
  
function movimientosovni () {
  if(keyDown(LEFT_ARROW)){
    ovni.x -= 10;
  }
   if(keyDown(RIGHT_ARROW)){
    ovni.x += 10;
  }
  if(keyDown(UP_ARROW)){
    ovni.y -= 10;
  }
  if(keyDown(DOWN_ARROW)){
    ovni.y += 10;
  }
}
   //ovni.changeAnimation('apagado');


//if (cortarb.mouseClicked){
//cortarb.changeAnimation("botonA");
//}
function soltar()
{
  cuerda.break();
  constructor.dettach();
  console.log(1)
  constructor = null; 
}
function cortarcuerda()
{
  cuerda.break();
  constructor.dettach();
  constructor = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}


