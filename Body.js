const G = 6.77*(10**-11);



//body object
function Body(x, y, vx, vy, mass, rad, at, clr, show){
    this.v = createVector();
    this.p = createVector();
    this.fg;
    this.avx;
    this.avy;
    this.mass;
    this.r;
    this.d;
    this.arr = [];
    this.color = clr;
    this.ap = createVector();
    this.pe = createVector();
    this.showEx = show;

    
    this.v.set(vx, vy);
    this.p.set(x, y);
    this.mass = mass;
    this.r = rad;
    this.d = 0;
    this.atmos = at;
    this.kill = false;

    this.update = function (){


        if(!this.kill){

        // if(keyIsPressed && key == 'w'){
        //     this.ap = this.p;
        //     this.pe = this.p;
        // }

        this.v.add(this.avx, this.avy);
        this.p.add(this.v);

     

        if(celestialContainer.length > 0){
            //if not equal itself
            for(let i = 0; i < celestialContainer.length; i++){

                let c = celestialContainer[i].p;
                let cv = celestialContainer[i].v;
                let cm = celestialContainer[i].mass;
                let cr = celestialContainer[i].r;


                if(this.p.x != c.x || this.p.y != c.y){
                
                    let rd = dist(this.p.x, this.p.y, c.x, c.y);
                    //console.log(rd);
                    //the Epic equations
                    this.fg = G*(cm/(rd**2));
                    

                    //console.log(this.fg, i);

                    let a = atan2(c.y - this.p.y, c.x - this.p.x);
                    this.avx = this.fg * cos(a);
                    this.avy = this.fg * sin(a);
                    

                    if(dist(c.x, c.y, this.p.x, this.p.y) > dist(c.x, c.y, this.ap.x, this.ap.y)){
                        this.ap.set(this.p.x, this.p.y);
                    }
                    if(dist(c.x, c.y, this.p.x, this.p.y) < dist(c.x, c.y, this.pe.x, this.pe.y)){
                        this.pe.set(this.p.x, this.p.y);
                    }

                    if(dist(c.x, c.y, this.p.x, this.p.y) < (this.r + this.atmos/2)){
                        cv.mult(0.999);
                    }

                    if(dist(c.x, c.y, this.p.x, this.p.y) < (cr) && this.r < cr){
                        cv.set(this.v.x/cm, this.v.y/cm);
                        console.log(this.r);
                        this.kill = true;
                    }

                }

             }
            } 
        } 
    }

    this.display = function (){

        if(!this.kill){
        fill(255, 100);
        circle(this.p.x, this.p.y, (this.r * 2) + this.atmos);
        fill(this.color);
        circle(this.p.x, this.p.y, this.r * 2);
        
        //console.log(this.p.x, this.p.y, this.r);

        arr.push({x:this.p.x, y:this.p.y});
            for(let i = 1; i < 100; i++){
                if(arr.length > 100){
                    fill("green");
                circle(arr[arr.length - (100-i)].x, arr[arr.length - (100-i)].y, 1);
            }
        }

        if(show){

            //Apsidies work in progress
            fill("cyan");
            text("apoapsis", this.ap.x + 5, this.ap.y - 5);
            circle(this.ap.x, this.ap.y, 5);
            text("periapsis", this.pe.x + 5, this.pe.y - 5);
            circle(this.pe.x, this.pe.y, 5);
        }
    }
        
    }
}