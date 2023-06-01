//this just makes stars in the background for UwU aesthetics

function Stars(count) {
  this.c = count;
  this.pos = [];
  for (let i = 0; i < this.c; i++) {
    this.pos.push({
      x: random(0, width),
      y: random(0, height),
      clr: random(0, 255),
    });
  }

  this.update = function () {
    for (let i = 0; i < this.c; i++) {
      fill(this.pos[i].clr);
      circle(this.pos[i].x, this.pos[i].y, 1);
    }
  };
}
