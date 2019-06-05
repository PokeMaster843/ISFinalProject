function Vector(x, y, z) {
	
	this.x = x;
	this.y = y;
	this.z = z;
	
}

Object.assign(Vector.prototype, {
	
	isVector: true,
	constructor: Vector,
	
	set: function(x, y, z) {
		
		this.x = x;
		this.y = y;
		this.z = z;
		
		return this;
		
	},
	
	add: function(v) {
		
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		
		return this;
		
	},
	
	sub: function(v) {
		return this.add(v.neg());
	},
	
	neg: function() {
		return new this.constructor(-this.x, -this.y, -this.z);
	},
	
	scale: function(s) {
		
		this.x *= s;
		this.y *= s;
		this.z *= s;
		
		return this;
		
	},
	
	dot: function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	
	cross: function(v) {
		return new this.constructor(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	},
	
	translate: function(x, y, z) {
		
		this.x += x;
		this.y += y;
		this.z += z;
		
		return this;
		
	},
	
	applyMatrix: function(m) {
		
		var x = m.m[0][0] * this.x + m.m[0][1] * this.y + m.m[0][2] * this.z,
			y = m.m[1][0] * this.x + m.m[1][1] * this.y + m.m[1][2] * this.z,
			z = m.m[2][0] * this.x + m.m[2][1] * this.y + m.m[2][2] * this.z;
		
		return this.set(x, y, z);
		
	},
	
	clone: function() {
		return new this.constructor(this.x, this.y, this.z);
	}
	
});