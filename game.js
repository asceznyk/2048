let container = document.getElementById("container");
let score = document.getElementById("score");
let total = 0;
let midxs = []

function reverseGrid(grid) {
	return grid.map((row) => row.reverse())
}

function rotateGrid(grid, right=1) {
	return grid[0].map((_, i) => {
		if (right) return grid.map(row => row[i]).reverse();
		else return grid.map(row => row[row.length-1-i]);
	});
}

function randomNums(grid) {
	let options = [];
	grid.forEach((row,i) => { row.forEach((_,j) => { if(row[j] == 0) options.push([i,j]) })});
	if(options.length <= 0) return grid; 
	let [i,j] = options[Math.floor(Math.random()*options.length)]; 
	grid[i][j] = Math.random() > 0.5 ? 2 : 4;
	return grid;
}

function moveElems(grid) {
	midxs = [];
	for (let i = 0; i < grid.length; i++) {
		let pairs = []
		for (let j = grid[i].length-1; j >= 0; j--){
			if(grid[i][j] != 0){
				pairs.push(j);
				if (pairs.length > 1) {
					if(grid[i][pairs[0]] == grid[i][pairs[1]]) {
						let [a, b] = pairs;
						grid[i][a] = grid[i][a] + grid[i][b];
						grid[i][b] = 0;
						midxs.push([i, a]);
						pairs = [];
					} else {
						pairs.shift();
					}
				}
			}
		}

		let zeroidx = null;
		for (let j = grid[i].length-1; j >= 0; j--) {
			if(grid[i][j] == 0 && zeroidx == null) {
				zeroidx = j;
			} else if(grid[i][j] != 0 && zeroidx != null) {
				grid[i][zeroidx] = grid[i][j];
				grid[i][j] = 0;
				j = grid[i].length-1;
				zeroidx = null;
			}
		}
	}

	midxs.forEach((m) => { 
		let [i,j] = m;
		total += grid[i][j];
	})
	return grid; 
}

function drawGrid(grid) {
	container.innerHTML = '';
	for (let i = 0; i < grid.length; i++) {
		container.innerHTML += `<div class='row'></div>`;
		for (let j = 0; j < grid[i].length; j++) {
			let formatString = grid[i][j] == 0 ? `<div class='cell'>-</div>` : `<div class='cell'>${grid[i][j]}</div>`;
			container.innerHTML += formatString;
		}
	}
}

function updateGrid(grid, e) { 
	if(e.keyCode == codes[0]) {
		grid = moveElems(grid);	
	} else if(e.keyCode == codes[1]) {
		grid = reverseGrid(grid);
		grid = moveElems(grid);
		grid = reverseGrid(grid);
	} else if (e.keyCode == codes[2]) {
		grid = rotateGrid(grid, 0);
		grid = moveElems(grid);
		grid = rotateGrid(grid);
	} else if (e.keyCode == codes[3]) {
		grid = rotateGrid(grid);
		grid = moveElems(grid);
		grid = rotateGrid(grid, 0);
	}
	return grid;
}

let grid = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];

grid = randomNums(grid);
grid = randomNums(grid);
drawGrid(grid);

codes = [39, 37, 40, 38]
document.addEventListener('keydown', function(e) {
	if(codes.includes(e.keyCode)) {	
		grid = updateGrid(grid, e);
		grid = randomNums(grid);
		drawGrid(grid);
		score.innerHTML = `Play 2048: ${total}`;
	}
})


