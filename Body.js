const G = 6.77*(10**-11);



//body object
function Body(x, y, vx, vy, mass, rad){
    this.v = createVector();
    this.p = createVector();
    this.fg;
    this.avx;
    this.avy;
    this.mass;
    this.r;
    this.d;

    
    this.v.set(vx, vy);
    this.p.set(x, y);
    this.mass = mass;
    this.r = rad;
    this.d = 0;

    this.update = function (){

        this.v.add(this.avx, this.avy);
        this.p.add(this.v);

     

        if(celestialContainer.length > 0){
            //if not equal itself
            for(let i = 0; i < celestialContainer.length; i++){

                let c = celestialContainer[i].p;
                let cm = celestialContainer[i].mass;
                let cr = celestialContainer[i].r;


                if(this.p.x != c.x && this.p.y != c.y){
                
                    let rd = dist(this.p.x, this.p.y, c.x, c.y);
                    //console.log(rd);
                    //the Epic equations
                    this.fg = G*(cm/(rd**2));

                    //console.log(this.fg, i);

                    let a = atan2(c.y - this.p.y, c.x - this.p.x);
                    this.avx = this.fg * cos(a);
                    this.avy = this.fg * sin(a);

                }

        }
      }  
    }

    this.display = function (){
        circle(this.p.x, this.p.y, this.r * 2);
        //console.log(this.p.x, this.p.y, this.r);
    }
}