let p, s;
let arr = [];
let vel, sv, f;
let g, a, gx, gy, sx, sy;
let st;



let celestialContainer = [];


let ap, pe;
function setup() {
  f = 1;
  p = createVector(0, -100);
  createCanvas(800, 800);
  vel = createVector(2.6, 0);
  sv = createVector(0, 0);
  s = createVector(0, 0);

  ap = createVector(p.x, p.y);
  pe = createVector(p.x, p.y);

  st = new Stars(1000);

  

  
  
  
  //new Body(x pos, y pos, init vel x, init vel y, mass, radius, atmosphere rad, color, show apsidies(opt));

  celestialContainer.push(new Body(0, 0, 0, 0,1500000000000, 50, 0, "yellow"));
  celestialContainer.push(new Body(100, 0, 0, -0.7, 1, 5, 0, "blue"));
  
  celestialContainer.push(new Body(200, 0, 0, -0.4,1 , 5, 0, "blue"));
  
  
  // celestialContainer.push(new Body(200,-200, 0, -0.05,100000000000, 5, 0, "yellow"));
  // celestialContainer.push(new Body(100,  -300, 0.25,0, 1, 5, 0, "orange", true));

  // celestialContainer.push(new Body(-200,200, 0,0, 1000000000000, 5, 0, "orange"));
  
  //             atmosphere radius set to 0 by default               //

  
  
}

function draw(){
 // if(keyIsPressed){
    ok();
 //}
}



function ok() {


  frameRate(120);
  background(10);

  st.update();


  fill("#00FF00");
  text("FPS: " + round(frameRate()), 50, 50);
  

  
  translate(width/2, height/2);


  for(let i = 0; i < celestialContainer.length; i++){
    celestialContainer[i].update();
    celestialContainer[i].display();
  }

noStroke();
}
 
