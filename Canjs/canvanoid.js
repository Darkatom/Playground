
			class Ball {  
				constructor(x, y, radius) {
					this.x = x;
					this.y = y;
					this.radius = radius;
					this.speed = 10;
					this.angle = 45;
					this.vector = {x: 1, y: 1};
				}

				start() {
					return "Project " + this.name + " starting";
				}

				update( dt ) {
					this.x += this.vector.x*this.speed*dt;
					this.y += this.vector.y*this.speed*dt;
				}
				
				collided( v, p ) { 
					// V is the vector of the collided segment, P is the point where it collided		
					// Get angle post-collision
					var length = Math.sqrt( Math.pow(v.B.x - v.A.x, 2) + Math.pow(v.B.y - v.A.y, 2));
					var d = Math.sqrt( Math.pow(v.B.x - v.p.x, 2) + Math.pow(v.B.y - v.p.y, 2));
					var a = (d * length)/150 - 75;	// angle goes from -75 to 75

					// Change movement vector
					this.vector.x = Math.sin(this.angle - 180 + a);
					this.vector.y = Math.cos(this.angle - 180 + a);
				}
			} 

			class Cage {
				constructor() {
					this.north = { A: {x: 10, y: 10}, B: {x: 600, y: 10}};
					this.east =  { A: {x: 600, y: 10}, B: {x: 600, y: 600}};
					this.south = { A: {x: 10, y: 600}, B: {x: 600, y: 600}};
					this.west =  { A: {x: 10, y: 10}, B: {x: 10, y: 600}};
				}

				update(dt) {
					for (var b of balls) { // look for collisions

                        var nNormal = normalLine(this.north);

						// if there was a collision
						b.collided();
					}
				}
			}

			function reset() {
				ctx = document.getElementById('canvas').getContext('2d');
				cage = new Cage();
				balls = [ new Ball(30, 30, 10) ];
				balls[0].start();
			};

			function update(dt) {		
				for (var b of balls)
					b.update(dt);

				cage.update(dt);
			};

			function draw() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.strokeRect(0, 0, canvas.width, canvas.height);
				for (var b of balls) {
					ctx.beginPath();
					ctx.arc(b.x, b.y, b.radius, 0, Math.PI*2, true);
					ctx.stroke();
				}
				ctx.strokeRect(cage.north.A.x, cage.north.A.y, cage.east.B.x, cage.east.B.y);	
			};


			function main() {				
				var now = Date.now();
				var delta = now - then;

				update(delta / 1000);
				draw();

				then = now;

				requestAnimationFrame(main);
			};