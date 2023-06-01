//constants
const G = 6.77 * 10 ** -11;

//body object
function Body(x, y, vx, vy, mass, rad, at, clr, show) {
  this.id = celestialContainer.length;
  //possition and velocity vectors
  this.v = createVector();
  this.p = createVector();
  //force and acceleration
  this.fg;
  this.avx;
  this.avy;
  //mass, radius, and distances
  this.mass;
  this.r;
  this.d;
  //array of vectors for the trail
  this.arr = [];
  //color of the body
  this.color = clr;
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
      if (celestialContainer.length > 0) {
        //if not equal itself
        for (let i = 0; i < celestialContainer.length; i++) {
          let c = celestialContainer[i].p;
          let cv = celestialContainer[i].v;
          let cm = celestialContainer[i].mass;
          let cr = celestialContainer[i].r;

          //if it is not equal to itself...
          if (this.p.x != c.x || this.p.y != c.y) {
            if (this.static == true) {
              //adds forces to the velocity
              this.v.add(this.avx, this.avy);
              this.p.add(this.v);
            }

            //distance between bodies
            let rd = dist(this.p.x, this.p.y, c.x, c.y);
            //the Epic equations
            this.fg = G * (cm / rd ** 2);

            //angle between bodies
            let a = atan2(c.y - this.p.y, c.x - this.p.x);
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
            if (dist(c.x, c.y, this.p.x, this.p.y) < this.r + this.atmos / 2) {
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
  };

  //displays the bodies
  this.display = function () {
    //target body and track its position
    if (
      dist(
        mouseX - (width / 2 + w),
        mouseY - (height / 2 + h),
        this.p.x * scl,
        this.p.y * scl
      ) <=
        max(50, this.r * 2) * scl &&
      !this.isTarget &&
      clearTarget
    ) {
      overlap.push(this.id);
      if (overlap[0] == this.id) {
        fill(0, 0);
        stroke(this.color);
        circle(this.p.x, this.p.y, max(50, this.r * 2) * 2);

        noStroke();
        if (mouseIsPressed) {
          this.isTarget = true;
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
      fill(255, 100);
      circle(this.p.x, this.p.y, this.r * 2 + this.atmos);
      //the actual body
      fill(this.color);
      circle(this.p.x, this.p.y, this.r * 2);

      //console.log(this.p.x, this.p.y, this.r);

      //number of vertices for the trail
      this.vert = 200;

      if (this.r > 2) {
        this.arr.push({ x: this.p.x, y: this.p.y });
        for (let i = 0; i <= this.vert; i++) {
          if (this.arr.length > this.vert) {
            if (i % 10 == 0 && i != 0) {
              this.x1 = this.arr[this.arr.length - (this.vert - (i - 1))].x;
              this.y1 = this.arr[this.arr.length - (this.vert - (i - 1))].y;
            }

            if (i % 10 == 5) {
              this.x2 = this.arr[this.arr.length - (this.vert - i)].x;
              this.y2 = this.arr[this.arr.length - (this.vert - i)].y;
            }
            colorMode(HSB, 255, 255, 255);
            stroke(255 * (i / this.vert) + 9, 0, 255 * (i / this.vert) + 9);
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
