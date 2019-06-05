function Cube(x, y, z, size) {
	
	var s = size / 2;
	this.vertices = [new Vector(x - s, y - s, z - s),
					 new Vector(x + s, y - s, z - s),
					 new Vector(x + s, y - s, z + s),
					 new Vector(x - s, y - s, z + s),
					 new Vector(x - s, y + s, z - s),	// above 0
					 new Vector(x + s, y + s, z - s),	// above 1
					 new Vector(x + s, y + s, z + s),	// above 2
					 new Vector(x - s, y + s, z + s)];	// above 3
	this.center = new Vector(x, y, z);
	
}

Object.assign(Cube.prototype, {
	
	isCube: true,
	constructor: Cube,
	
	rotate: function(matrix) {
		
		for(var i = 0; i < this.vertices.length; i++) {
			this.vertices[i].applyMatrix(matrix);
		}
		
		this.center.applyMatrix(matrix);
		
		return this;
		
	},
	
	rotateAbout: function(matrix, p) {
		
		this.translate(-p.x, -p.y, -p.z);
		this.rotate(matrix);
		return this.translate(p.x, p.y, p.z);
		
	},
	
	translate: function(x, y, z) {
		
		for(var i = 0; i < this.vertices.length; i++) {
			this.vertices[i].translate(x, y, z);
		}
		
		this.center.translate(x, y, z);
		
		return this;
		
	}
	
});