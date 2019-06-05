var Render = {
	
	alive: "rgba(255,0,0,0.1)",
	dead: "rgba(0,0,0,0.1)",
	
	drawWireframe: function(cell, camera, ctx) {
		
		// 0->1, 1->2, 2->3, 3->0,
		// 4->5, 5->6, 6->7, 7->4,
		// 4->0, 5->1, 6->2, 7->3
		
		if(!cell.status) { return; }
		var pts = Render.getPerspectives(cell.cube.vertices, camera), color = cell.status ? Render.alive : Render.dead;
		Render.drawFace(pts, 0, 1, 2, 3, color, ctx);
		Render.drawFace(pts, 0, 4, 5, 1, color, ctx);
		Render.drawFace(pts, 0, 4, 7, 3, color, ctx);
		Render.drawFace(pts, 4, 5, 6, 7, color, ctx);
		Render.drawFace(pts, 1, 5, 6, 2, color, ctx);
		Render.drawFace(pts, 2, 6, 7, 3, color, ctx);
		
	},
	
	drawFace: function(pts, a, b, c, d, color, ctx) {
		
		ctx.beginPath();
		ctx.moveTo(pts[a][0], pts[a][1]);
		ctx.lineTo(pts[b][0], pts[b][1]);
		ctx.lineTo(pts[c][0], pts[c][1]);
		ctx.lineTo(pts[d][0], pts[d][1]);
		ctx.lineTo(pts[a][0], pts[a][1]);
		ctx.closePath();
		ctx.strokeStyle = color;
		ctx.fillStyle = color;// === Render.alive ? color : "rgba(0,0,0,0)";
		ctx.stroke();
		ctx.fill();
		
	},
	
	getPerspectives: function(vertices, camera) {
		
		var persp = [];
		for(var i = 0; i < vertices.length; i++) {
			persp[i] = camera.perspective(vertices[i]);
		}
		
		return persp;
		
	},
	
	renderScene: function(cells, view, ctx) {
		
		var l = cells.length;
		for(var i = 0; i < l; i++) {
			
			for(var j = 0; j < l; j++) {
				
				for(var k = 0; k < l; k++) {
					Render.drawWireframe(cells[i][j][k], view, ctx);
				}
				
			}
			
		}
		
	}
	
};