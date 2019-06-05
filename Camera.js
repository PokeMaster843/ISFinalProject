function Camera(pos, alpha, beta, gamma) { // beta should always be zero; optimize rotMatrix (eventually)
	
	this.pos = pos;
	
	this.alpha = alpha;
	this.beta = beta;
	this.gamma = gamma;
	
	this.rot = new Matrix().rotMatrix(alpha, beta, gamma);
	
	/*this.a = new Vector(-Math.SQRT2 / 2, -Math.SQRT2 / 2, 0);
	this.b = new Vector(0, 1, 0);
	this.c = new Vector(Math.SQRT2 / 2, -Math.SQRT2 / 2, 0);
	this.a.applyMatrix(this.rot).add(this.pos);
	this.b.applyMatrix(this.rot).add(this.pos);
	this.c.applyMatrix(this.rot).add(this.pos);*/
	
	this.normal = new Vector(0, 0, -1).applyMatrix(this.rot);
	
}

Object.assign(Camera.prototype, {
	
	isCamera: true,
	constructor: Camera,
	
	moveTo: function(npos) {
		
		/*var dp = this.npos.clone().sub(this.pos);
		this.a.add(dp);
		this.b.add(dp);
		this.c.add(dp);*/
		
		this.pos = npos.clone();
		return this;
		
	},
	
	translate: function(dp) {
		
		/*this.a.add(dp);
		this.b.add(dp);
		this.c.add(dp);*/
		this.pos.add(dp);
		return this;
		
	},
	
	setRotation: function(alpha, beta, gamma) {
		
		this.alpha = alpha; this.beta = beta; this.gamma = gamma;
		this.rot = new Matrix().rotMatrix(this.alpha, this.beta, this.gamma);
		
		/*this.a = new Vector(-Math.SQRT2 / 2, -Math.SQRT2 / 2, 0);
		this.b = new Vector(0, 1, 0);
		this.c = new Vector(Math.SQRT2 / 2, -Math.SQRT2 / 2, 0);
		this.a.applyMatrix(this.rot).add(this.pos);
		this.b.applyMatrix(this.rot).add(this.pos);
		this.c.applyMatrix(this.rot).add(this.pos);
		this.normal = this.b.clone().sub(this.a).cross(this.c.clone().sub(this.a));*/
		this.normal = new Vector(0, 0, -1).applyMatrix(this.rot);
		
		return this;
		
	},
	
	addRotation: function(alpha, beta, gamma) {
		
		this.alpha += alpha; this.beta += beta; this.gamma += gamma;
		this.rot = new Matrix().rotMatrix(this.alpha, this.beta, this.gamma);
		
		/*this.a = new Vector(-Math.SQRT2 / 2, -Math.SQRT2 / 2, 0);
		this.b = new Vector(0, 1, 0);
		this.c = new Vector(Math.SQRT2 / 2, -Math.SQRT2 / 2, 0);
		this.a.applyMatrix(this.rot).add(this.pos);
		this.b.applyMatrix(this.rot).add(this.pos);
		this.c.applyMatrix(this.rot).add(this.pos);
		this.normal = this.b.clone().sub(this.a).cross(this.c.clone().sub(this.a));*/
		this.normal = new Vector(0, 0, -1).applyMatrix(this.rot);
		
		return this;
		
	},
	
	perspective: function(p) {
		
		var d = p.clone().sub(this.pos).applyMatrix(this.rot);
		return [d.x / d.z * 8000 + 200, d.y / d.z * 8000 + 200];
		
	},
	
	check: function(p) {
		return this.normal.dot(p.clone().sub(this.pos)) > 0;
	}
	
});