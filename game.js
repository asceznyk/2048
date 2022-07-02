const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const scl = 100;

ctx.scale(scl, scl);

let grid = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0].
	[0,0,0,0],
];

function drawGrid(grid) {
	ctx.fillStyle("#fff")
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			ctx.fillText(grid[i][j], i, j)
		}
	}
}

drawGrid(grid):







