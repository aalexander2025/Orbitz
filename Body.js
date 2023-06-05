//constants
const G = 6.77 * 10 ** -11;

//body object
function Body(x, y, vx, vy, mass, rad, at, clr, show, name) {
  this.id = celestialContainer.length;
  //possition and velocity vectors
  this.v = createVector();
  this.p = createVector();
  //force and acceleration
  this.fg;
  this.avx;
  this.avy;
  this.avz;
  this.os;
  this.ok;
  //mass, radius, and distances
  this.mass;
  this.r;
  this.d;
  //array of vectors for the trail
  this.arr = [];
  //color of the body
  this.color = clr;
  this.name = name;
  //apsidies
  this.ap = createVector();
  this.pe = createVector();
  //x and y variables for the trail
  this.x1;
  this.x2;
  this.y1;
  this.y2;
  //setting the variables to thier defaults
  this.v.set(vx, vy);
  this.p.set(x, y);
  this.mass = mass;
  this.r = rad;
  this.d = 0;
  this.atmos = at;
  this.kill = false;
  this.static = true;
  this.isTarget = false;

  //update the body
  this.update = function () {
    //run the update function only if it has not been destroyed
    if (!this.kill) {
      for (let j = 0; j < inc; j++) {
        if (celestialContainer.length > 0) {
          this.p.add(this.v.x, this.v.y);
          //if not equal itself
          for (let i = 0; i < celestialContainer.length; i++) {
            let c = celestialContainer[i].p;
            let cv = celestialContainer[i].v;
            let cm = celestialContainer[i].mass;
            let cr = celestialContainer[i].r;

            //if it is not equal to itself...
            if (this.p.x != c.x || this.p.y != c.y) {
              //if (this.static == true) {
              //adds forces to the velocity
              this.v.add(this.avx, this.avy);

              //}

              //distance between bodies
              let rd = dist(this.p.x, this.p.y, c.x, c.y);
              //the Epic equations
              this.fg = G * (cm / rd ** 2);
              //this.os = (2*PI*rd)/(4*(PI**2)/(G * cm)) * rd;
              //this.ok = sqrt((G * cm) / rd);

              //angle between bodies
              let a = atan2(c.y - this.p.y, c.x - this.p.x);

              let bc = rd * (this.mass / (this.mass + cm));

              push();

              translate((this.p.x - c.x) / 2, this.p.y / 2);
              rotate(a);
              fill(0, 0);
              stroke(255);
              // ellipse(0, 0, rd, rd);
              pop();

              this.avx = this.fg * cos(a);
              this.avy = this.fg * sin(a);

              //setting apoapsis and periapsis
              if (
                dist(c.x, c.y, this.p.x, this.p.y) >
                dist(c.x, c.y, this.ap.x, this.ap.y)
              ) {
                this.ap.set(this.p.x, this.p.y);
              }
              if (
                dist(c.x, c.y, this.p.x, this.p.y) <
                dist(c.x, c.y, this.pe.x, this.pe.y)
              ) {
                this.pe.set(this.p.x, this.p.y);
              }

              //added atmosphere (WIP) RAHUL MAKE ATMOSPHERE GREAT AGAIN
              if (
                dist(c.x, c.y, this.p.x, this.p.y) <
                this.r + this.atmos / 2
              ) {
                cv.mult(0.9);
              }

              //if a collision occurs then die
              if (dist(c.x, c.y, this.p.x, this.p.y) < cr && this.r <= cr) {
                this.kill = true;
              }
            }
          }
        }
      }
    }
  };

  this.info = function () {
    noFill();
    stroke(this.color);

    circle(
      this.p.x,
      this.p.y,
      max(max(50, this.r * 2) * 2, (max(50, this.r * 2) * 2) / (scl * 2))
    );
    fill("white");
    noStroke();

    textSize(max(12, 12 / scl));

    let t = "orbit 1";
    if (this.os > 0.1) {
      t = "orbit 0";
    }
    text(
      '"' +
        this.name +
        '"' +
        "\n" +
        "(" +
        round(this.v.x, 2) +
        "," +
        round(this.v.y, 2) +
        ")" +
        "\n" +
        round(this.fg, 5) +
        "\n" +
        t,
      this.p.x + max(50, this.r * 2) / 2,
      this.p.y + max(50, this.r * 2) / 2
    );
  };

  //displays the bodies
  this.display = function () {
    //target body and track its position

    if (
      dist(
        mouseX - (width / 2 + w * scl),
        mouseY - (height / 2 + h * scl),
        this.p.x * scl,
        this.p.y * scl
      ) <=
        max(50, this.r * 2) * scl &&
      !this.isTarget &&
      clearTarget
    ) {
      overlap.push(this.id);
      if (overlap[0] == this.id || this.isTarget == true) {
        this.info();

        if (mouseIsPressed) {
          this.isTarget = true;
          this.info();
          clearTarget = false;
        }
      }
    } else {
      overlap.splice(0, Infinity);
    }

    if (this.isTarget && !clearTarget) {
      w = -this.p.x;
      h = -this.p.y;
    }
    if (clearTarget) {
      this.isTarget = false;
    }
    if (!this.kill) {
      //the atmosphere
      push();

      fill(255, 100);
      if (this.name == "Sun") {
        drawGradient(this.p.x, this.p.y, this.r * 10);
      }

      circle(this.p.x, this.p.y, this.r * 2 + this.atmos);
      //the actual body
      fill(this.color);
      circle(this.p.x, this.p.y, this.r * 2);

      if (this.isTarget) {
        this.info();
      }

      pop();

      //console.log(this.p.x, this.p.y, this.r);

      //number of vertices for the trail
      // if((360/inc)%2==0){
      //   this.vert = 360/(inc)+1;
      // }
      // else{
      //   this.vert = 360/inc;
      // }

      this.vert = 360;

      console.log(inc);

      // if(this.vert < 1){
      //   this.vert = 1;
      // }
      this.am = 4;

      if (this.r > 2) {
        this.arr.push({ x: this.p.x, y: this.p.y });
        for (let i = 0; i <= this.vert; i++) {
          if (this.arr.length > this.vert) {
            if (i % this.am == 0) {
              this.x1 = this.arr[this.arr.length - (this.vert - (i - 1))].x;
              this.y1 = this.arr[this.arr.length - (this.vert - (i - 1))].y;
            }

            if (i % this.am == this.am / 2) {
              this.x2 = this.arr[this.arr.length - (this.vert - i)].x;
              this.y2 = this.arr[this.arr.length - (this.vert - i)].y;
            }
            colorMode(HSB, 255, 255, 255, 255);
            stroke(
              255 * (i / this.vert) + 7,
              0,
              255,
              255 * (i / this.vert) + 7
            );
            colorMode(RGB, 255, 255, 255, 255);
            if (i > 9) {
              //the trail
              line(this.x1, this.y1, this.x2, this.y2);
            }
          }
        }

        noStroke();
      }

      //if show is true, show the apsidies
      if (show) {
        //Apsidies work in progress
        fill("cyan");
        text("apoapsis", this.ap.x + 5, this.ap.y - 5);
        circle(this.ap.x, this.ap.y, 5);
        text("periapsis", this.pe.x + 5, this.pe.y - 5);
        circle(this.pe.x, this.pe.y, 5);
      }
    }
  };
}

function drawGradient(x, y, r1) {
  let radius = r1;
  let h = 0;
  for (let r = radius; r > 0; r -= 10) {
    fill(255, 255, 0, h);
    ellipse(x, y, r, r);
    h += 0.1;
  }
}

function apsidies() {
  //Rahul put stuff here
}
