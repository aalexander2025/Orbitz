let st;
let scl = 1;
let w = (h = 0);
let spd = 5;
let clearTarget = true;
let overlap = [];

let celestialContainer = [];

function setup() {
  createCanvas(800, 800);

  st = new Stars(1000);

  //new Body(x pos, y pos, init vel x, init vel y, mass, radius, atmosphere rad, color, show apsidies(opt));

  //these are the default bodies in the sketch, feel free to change them

  celestialContainer.push(
    new Body(0, 0, 0, 0, 55000000000000, 50, 0, "#ffff00", false)
  );

  celestialContainer.push(
    new Body(300, 0, 0, -2.2, 300000000000, 10, 15, "#0000ff", false)
  );

  celestialContainer.push(
    new Body(270, 0, 0, -2.9, 1, 2.1, 0, "#00ff00", false)
  );

  celestialContainer.push(new Body(0, 0, 0, 0, 0, 0, 0, "#888888", false));

  frameRate(60);

  //             atmosphere radius set to 0 by default               //
}

function draw() {
  //running the simulation
  simulator();

  //context menu
  fill("#00FF00");
  text("FPS: " + round(frameRate()), 50, 50);
  fill("#FFFF00");
  text("Zoom:in/out: - / + ", 50, 75);
  text("Reset Zoom: Backspace ", 50, 90);
  text("Move Cursor: wasd (" + round(w, 2) + "," + round(h, 2) + ")", 50, 105);
  text("Reset Cursor: R ", 50, 120);
  text("Reset All: Shift + R ", 50, 135);

  //cursor
  stroke("white");
  line(width / 2, height / 2 - 10, width / 2, height / 2 + 10);
  line(width / 2 - 10, height / 2, width / 2 + 10, height / 2);
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

function keyPressed() {
  //changes the scale
  if (key == "=") {
    scl += 0.05;
  }
  if (key == "-") {
    scl -= 0.05;
  }
}

//the sim function
function simulator() {
  background(10);

  //drawing stars
  st.update();

  //translate to the middle of the screen
  push();
  translate(width / 2 + w, height / 2 + h);
  scale(scl, scl);

  //drawing, updating, and removing bodies in this for loop
  for (let i = 0; i < celestialContainer.length; i++) {
    celestialContainer[i].update();
    celestialContainer[i].display();
    if (celestialContainer[i].kill == true) {
      celestialContainer.splice(i, 1);
    }
  }
  noStroke();
  pop();
  //end of the transformation
}
