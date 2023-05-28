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

  
  
  
  //celestialContainer.push(new Body(1, -100, 2.6, 0, 10, 5));
  celestialContainer.push(new Body(-100, 0, 0, 0.1, 10000000000000, 10, "yellow"));
  celestialContainer.push(new Body(100, 0, 0, -1, 10, 5, "orange", true));
  //celestialContainer.push(new Body(0, 0, 0, 0, 0, 0));
  

  //console.log(celestialContainer[0].r);

  
  
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
  

  
  //console.log(celestialContainer[0].fg);
  
  if(keyIsPressed && key=='d'){
    f += 0.001;
    ap.set(p);
    pe.set(p);
  }
  if(keyIsPressed && key=='a'){
    f -= 0.001;
    ap.set(p);
    pe.set(p);
  }
  
  
  vel.add(gx * f, gy * f);
  p.add(vel.x, vel.y);
  
  
  
  sv.add(sx, sy);
  s.add(sv);

  if(dist(s.x, s.y, p.x, p.y) > dist(s.x, s.y, ap.x, ap.y)){
    ap.set(p.x, p.y);
  }
  if(dist(s.x, s.y, p.x, p.y) < dist(s.x, s.y, pe.x, pe.y)){
    pe.set(p.x, p.y);
  }


 
  
  
  translate(width/2, height/2);

  celestialContainer[0].update();
  celestialContainer[0].display();

  celestialContainer[1].update();
  celestialContainer[1].display();

  // celestialContainer[2].update();
  // celestialContainer[2].display();

  

  // fill("cyan");
  // text("apoapsis", ap.x, ap.y);
  // circle(ap.x, ap.y, 5);
  // text("periapsis", pe.x, pe.y);
  // circle(pe.x, pe.y, 5);
  
   let r = dist(s.x, s.y, p.x, p.y);
    gm = (6.77*(10**-11))*(10000000000000/(r**2));
    gs = (6.77*(10**-11))*(10/(r**2));
    a = atan2(s.y - p.y, s.x - p.x);
    gx = gm * cos(a);
    gy = gm * sin(a);
  
  
    sx = gs * cos(a);
    sy = gs * sin(a);
    
  
  // fill("yellow");
  // circle(s.x, s.y, 100);
  
  // fill("white");
  // circle(p.x, p.y, 10);
  
  
noStroke();
  
  
  // arr.push({x:p.x, y:p.y});
  // for(let i = 1; i < 100; i++){
  //     if(arr.length > 100){
  //       //circle(arr[arr.length - (100-i)].x, arr[arr.length - (100-i)].y, 1);
  //     }
  // }
 
  
  
  

}
 
