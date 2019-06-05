/*
 * Ruleset:
 * 1) any cell with 10 or more live neighbors dies
 * 2) any cell with 4 or fewer live neighbors dies
 * 3) a dead cell with 5, 8, or 9 live neighbors will become a living cell
 * 4) a cell will live on if it has between 4 and 10 (exclusive) living neighbors
 * 
 */

function Cell(x, y, z, state, dim) {
	
	this.cube = new Cube(x, y, z, 1 / dim);
	this.status = state; // true = alive, false = dead
	this.next = null;
	
}

Object.assign(Cell.prototype, {
	
	isCell: true,
	constructor: Cell,
	
	getNextState: function(neighbors) {
		
		if(!this.status) {
			
			this.next = false;
			if((neighbors === 6) || (neighbors === 8) || (neighbors === 9)) { this.next = true; }
			return this;
			
		}
		
		this.next = true;
		if(neighbors >= 10 || neighbors <= 5) { this.next = false; }
		return this;
		
	},
	
	nextGeneration: function() {
		
		this.status = this.next;
		this.next = null;
		return this;
		
	}
	
});