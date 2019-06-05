function Matrix(a, b, c, d, e, f, g, h, i) {
	
	this.m = [[a, b, c],
			  [d, e, f],
			  [g, h, i]];
	
	if(a === null || a === undefined) { this.m = [[1, 0, 0],
												  [0, 1, 0],
												  [0, 0, 1]]; }
	
}

Object.assign(Matrix.prototype, {
	
	isMatrix: true,
	constructor: Matrix,
	
	I: function() {
		
		return new this.constructor(1, 0, 0,
									0, 1, 0,
									0, 0, 1);
		
	},
	
	multMatrix: function(m) {
		
		var m1 = this.m, m2 = m.m;
		var a = m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0],
			b = m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1],
			c = m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2],
			d = m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0],
			e = m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1],
			f = m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2],
			g = m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][0],
			h = m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1],
			i = m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2];
		
		return new this.constructor(a, b, c,
									d, e, f,
									g, h, i);
		
	},
	
	rotMatrix: function(alpha, beta, gamma) {
		
		var ca = Math.cos(alpha), sa = Math.sin(alpha), cb = Math.cos(beta), sb = Math.sin(beta), cg = Math.cos(gamma), sg = Math.sin(gamma);
		
		return new this.constructor(cb*cg,			cb*sg,			-sb,
									sa*sb*cg-ca*sg, sa*sb*sg+ca*cg, sa*cb,
									ca*sb*cg+sa*sg, ca*sb*sg-sa*cg, ca*cb);
		
	}
	
});