var cells = null, dim = 10, f = 0;
var camera = new Camera(new Vector(0.1, 0.1, -20), 0, 0, 0);
var ctx = document.getElementById("canvas").getContext("2d");
var rm = new Matrix().rotMatrix(0.1, -0.2, 0.1);
var w = false, s = false, a = false, d = false, up = false, dw = false;
var clicked = false, x = 0, y = 0, px, py;
var wvec = new Vector(0, 0, 0.3), avec = new Vector(-0.1, 0, 0), uvec = new Vector(0, -0.1, 0);
function genCells() {
	
	for(var i = 0; i < dim; i++) {
		
		cells[i] = [];
		for(var j = 0; j < dim; j++) {
			
			cells[i][j] = [];
			for(var k = 0; k < dim; k++) {
				
				cells[i][j][k] = new Cell(i / dim, j / dim, k / dim, Math.floor(Math.random() * 100) <= 30 ? true : false, dim);
				cells[i][j][k].cube.rotate(rm);
				
			}
			
		}
		
	}
	
}

function getNeighbors(i, j, k) { // optimize
	
	var live = 0;
	var a1 = (i + 1) % dim, b1 = (j + 1) % dim, c1 = (k + 1) % dim,
		a2 = (i - 1) >= 0 ? (i - 1) : dim - 1, b2 = (j - 1) >= 0 ? (j - 1) : dim - 1, c2 = (k - 1) >= 0 ? (k - 1) : dim - 1,
		a3 = i, b3 = j, c3 = k;
	
	var il = i < dim - 1, jl = j < dim - 1, kl = k < dim - 1, ig = i > 0, jg = j > 0, kg = k > 0;
	
	if(il) {
		
		if(jl) {
			
			if(cells[a1][b1][c1].status && kl) { live++; }
			if(cells[a1][b1][c2].status && kg) { live++; }
			if(cells[a1][b1][c3].status) { live++; }
			
		}
		
		else if(jg) {
			if(cells[a1][b2][c1].status && kl) { live++; }
			if(cells[a1][b2][c2].status && kg) { live++; }
			if(cells[a1][b2][c3].status) { live++; }
		}
		
		if(cells[a1][b3][c1].status && kl) { live++; }
		if(cells[a1][b3][c2].status && kg) { live++; }
		if(cells[a1][b3][c3].status) { live++; }
	
	}
	
	if(ig) {
		
		if(jl) {
			
			if(cells[a2][b1][c1].status && kl) { live++; }
			if(cells[a2][b1][c2].status && kg) { live++; }
			if(cells[a2][b1][c3].status) { live++; }
			
		}
		
		if(jg) {
			
			if(cells[a2][b2][c1].status && kl) { live++; }
			if(cells[a2][b2][c2].status && kg) { live++; }
			if(cells[a2][b2][c3].status) { live++; }
			
		}
			
		if(cells[a2][b3][c1].status && kl) { live++; }
		if(cells[a2][b3][c2].status && kg) { live++; }
		if(cells[a2][b3][c3].status) { live++; }
		
	}
	
	if(jl) {
		
		if(cells[a3][b1][c1].status && kl) { live++; }
		if(cells[a3][b1][c2].status && kg) { live++; }
		if(cells[a3][b1][c3].status) { live++; }
		
	}
	
	if(jg) {
		
		if(cells[a3][b2][c1].status && kl) { live++; }
		if(cells[a3][b2][c2].status && kg) { live++; }
		if(cells[a3][b2][c3].status) { live++; }
		
	}
	
	if(cells[a3][b3][c1].status && kl) { live++; }
	if(cells[a3][b3][c2].status && kg) { live++; }
	
	return live;
	
}

function run() {
	
	var i = 0, j = 0, k = 0, ff = f % 30 === 1;
	if(ff) {
		
		for(i = 0; i < dim; i++) {
			
			for(j = 0; j < dim; j++) {
				
				for(k = 0; k < dim; k++) {
					cells[i][j][k].getNextState(getNeighbors(i, j, k));
				}
				
			}
			
		}
		
	}
	
	for(i = 0; i < dim; i++) {
		
		for(j = 0; j < dim; j++) {
			
			for(k = 0; k < dim; k++) {
				
				if(ff) { cells[i][j][k].nextGeneration(); }
				Render.drawWireframe(cells[i][j][k], camera, ctx);
				
			}
			
		}
		
	}
	
}

document.addEventListener("keydown", function(e) {
	if(e.keyCode === 87) { w = true; } // W
	if(e.keyCode === 83) { s = true; } // S
	if(e.keyCode === 65) { a = true; } // A
	if(e.keyCode === 68) { d = true; } // D
	if(e.keyCode === 38) { up = true; } // up
	if(e.keyCode === 40) { dw = true; } // down
});

document.addEventListener("keyup", function(e) {
	if(e.keyCode === 87) { w = false; } // W
	if(e.keyCode === 83) { s = false; } // S
	if(e.keyCode === 65) { a = false; } // A
	if(e.keyCode === 68) { d = false; } // D
	if(e.keyCode === 38) { up = false; } // up
	if(e.keyCode === 40) { dw = false; } // down
});

document.addEventListener("mousedown", function(e) {
	clicked = !clicked;
}, false);

document.addEventListener("mousemove", function(e) {
	
	px = x;
	py = y;
	
	x = e.pageX;
	y = e.pageY;
	
}, false);


var update = setInterval(function() {
	
	if(cells === null) { cells = [[[]]]; genCells(); }
	ctx.clearRect(-10, -10, 1100, 900);
	
	if(w) { camera.translate(wvec); }
	if(s) { camera.translate(wvec.neg()); }
	if(a) { camera.translate(avec); }
	if(d) { camera.translate(avec.neg()); }
	if(up) { camera.translate(uvec); }
	if(dw) { camera.translate(uvec.neg()); }
	
	f++;
	if(clicked) {
		
		//camera.addRotation((y - py) / 1000, (x - px) / 1000, 0);
		var rotMatrix = new Matrix().rotMatrix((y - py) / 1000, (x - px) / 1000, 0);
		for(var i = 0; i < dim; i++) {
		
			for(var j = 0; j < dim; j++) {
				
				for(var k = 0; k < dim; k++) {
					cells[i][j][k].cube.rotateAbout(rotMatrix, new Vector(0.5, 0.5, 0.5));
				}
				
			}
			
		}
		
	}
	
	run();
	
}, 1000/60);