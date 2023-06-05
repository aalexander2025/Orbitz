let st;
let scl = 1;
let w = (h = 0);
let spd = 5;
let clearTarget = true;
let overlap = [];
let isPaused = false;
let toggle = false;
let rs = 1;
let inc = 1;
let font;
let cam;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  st = new Stars(1000);
}

function preload() {
  // font = loadFont("libraries/arial.ttf");
}

let x, y, px, py;

let celestialContainer = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //textFont(font);

  st = new Stars(1000);

  document.oncontextmenu = function () {
    return false;
  };

  //new Body(x pos, y pos, init vel x, init vel y, mass, radius, atmosphere rad, color, show apsidies(opt));

  //these are the default bodies in the sketch, feel free to change them

  celestialContainer.push(
    new Body(0, 0, 0, 0, 100000000000000, 50, 0, "#ffff00", false, "Sun")
  );

  // celestialContainer.push(
  //   new Body(-10000, 0, 0, 0, 100000000000000, 50, 0, "#ffff00", false, "Sun")
  // );

  celestialContainer.push(
    new Body(300, 0, 0, -5.3, 10000000000, 10, 0, "#0000ff", false, "Blu")
  );

  celestialContainer.push(
    new Body(350, 0, 0, -4, 10000, 10, 0, "#00A0ff", false, "Cyan")
  );

  celestialContainer.push(
    new Body(400, 0, 0, -2.3, 10000000000, 15, 0, "#AFA0ff", false, "Purp")
  );

  celestialContainer.push(
    new Body(450, 0, 0, -5.2, 100000, 10, 0, "#0AA00f", false, "Gren")
  );

  celestialContainer.push(
    new Body(200, 0, 0, -3.8, 100000, 5, 0, "#9F400f", false, "Brun")
  );

  

  // celestialContainer.push(
  //   new Body(280, 0, 0, -2, 1, 2, 0, "#00ff00", false, "Mun")
  // );

  //celestialContainer.push(new Body(0, 0, 0, 0, 0, 0, 0, "#888888", false));

  frameRate(60);

  //             atmosphere radius set to 0 by default               //
}
let a = 0;
function draw() {
  spd = 5 / scl;

  //running the simulation
  background(10);

  push();
  //drawing stars

  st.update();
  simulator();

  //context menu
  fill("#00FF00");
  text("FPS: " + round(frameRate()), 50, 50);
  fill("#FFFF00");
  text("Zoom:in/out: - / + " + round(scl, 2) + "x", 50, 75);
  text("Reset Zoom: Backspace ", 50, 90);
  text("Move Cursor: wasd (" + round(w, 2) + "," + round(h, 2) + ")", 50, 105);
  text("Reset Cursor: R ", 50, 120);
  text("Reset All: Shift + R ", 50, 135);
  text("Pause: P (" + isPaused + ")", 50, 150);
  text("Time Warp inc/dec: t / g  " + inc + "x", 50, 165);

  //cursor
  stroke("white");
  fill("black");
  rectMode(CENTER);
  rect(width / 2, height / 2, 2.5, 20);
  rect(width / 2, height / 2, 20, 2.5);
  stroke("black");
  rect(width / 2, height / 2, 2.5, 2.5);
  // line(width / 2, height / 2 - 10, width / 2, height / 2 + 10);
  // line(width / 2 - 10, height / 2, width / 2 + 10, height / 2);
  rectMode(CORNER);

  pop();

  noStroke();

  //cursor movement
  if (keyIsDown(83)) {
    h -= spd;
  }
  if (keyIsDown(87)) {
    h += spd;
  }
  if (keyIsDown(68)) {
    w -= spd;
  }
  if (keyIsDown(65)) {
    w += spd;
  }
  if (keyIsDown(8)) {
    scl = 1;
  }
  if (keyIsDown(82)) {
    w = 0;
    h = 0;
  }
  if (keyIsDown(82) && keyIsDown(16)) {
    w = 0;
    h = 0;
    scl = 1;
    clearTarget = true;
  }
}

function mousePressed() {}

function keyPressed() {
  // celestialContainer.push(
  //   new Body(xpos, ypos, xvel, yvel, mass, radius, atmos, color, false, name)
  // );

  //changes the scale
  if (key == "=") {
    scl += 0.05;
  }
  if (key == "t" && inc <= 50) {
    inc++;
  }
  if (key == "g" && inc > 1) {
    inc--;
  }

  if (key == "-" && scl > 0.25) {
    scl -= 0.05;
  }

  if (key == "p" && !toggle) {
    isPaused = true;
  }
  if (key == "p" && toggle) {
    isPaused = false;
    toggle = false;
  }
}

function keyReleased() {
  if (isPaused) {
    toggle = true;
  }
}

//the sim function
function simulator() {
  // ambientLight(128, 128, 128);
  // directionalLight(228, 228, 228, 0, 0, -1).
  // directionalLight(228, 228, 228, 0, 0, 1).

  //translate to the middle of the screen
  push();
  translate(width / 2 + w * scl, height / 2 + h * scl);
  scale(scl, scl, scl);

  //console.log(celestialContainer[1].fg);

  // rotateY(a);
  // a+= 0.01;

  //drawing, updating, and removing bodies in this for loop
  for (let i = 0; i < celestialContainer.length; i++) {
    if (!isPaused) {
      celestialContainer[i].update();
    }

    celestialContainer[i].display();
    if (celestialContainer[i].kill == true) {
      celestialContainer.splice(i, 1);
    }
  }
  //console.log(celestialContainer[2].fg, celestialContainer[2].ok);
  noStroke();
  pop();
  //end of the transformation
}

//rahul did stuff
