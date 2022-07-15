let container = document.getElementById("container");
let score = document.getElementById("score");
let total = 0;
let midxs = []

function reverseGrid(grid) {
	return grid.map((row) => row.reverse())
}

function transposeGrid(grid) {
	return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
}

function randomNums(grid) {
	let options = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if(grid[i][j] == 0) options.push([i, j])
		}
	}

	if(options.length > 0) {
		let r = Math.random() > 0.5 ? 2 : 4; 
		let [x, y] = options[Math.floor(Math.random()*options.length)] 
		grid[x][y] = r;
	}

	return grid;
}

function updateScore(grid, midxs) {
	let s = 0;
	for(let m = 0; m < midxs.length; m++) {
		let [i, j] = midxs[m];
		s += grid[i][j];
	}
	console.log(s)
	return s;
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
						let[a, b] = pairs;
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

	total += updateScore(grid, midxs)

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

function updateGame(grid, e) { 
	if(e.keyCode == codes[0]) {
		grid = moveElems(grid);	
	} else if(e.keyCode == codes[1]) {
		grid = reverseGrid(grid);
		grid = moveElems(grid);
		grid = reverseGrid(grid);
	} else if (e.keyCode == codes[2]) {
		grid = transposeGrid(grid);
		grid = moveElems(grid);
		grid = transposeGrid(grid);
	} else if (e.keyCode == codes[3]) {
		grid = reverseGrid(transposeGrid(grid));
		grid = moveElems(grid);
		grid = transposeGrid(reverseGrid(grid));
	}

	return grid;
}

let grid = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];


randomNums(grid);
randomNums(grid);
drawGrid(grid);



codes = [39, 37, 40, 38]
document.addEventListener('keydown', function(e) {	
	if(codes.includes(e.keyCode)) {	
		grid = updateGame(grid, e);
		grid = randomNums(grid);
		drawGrid(grid);
		console.log(midxs)
		score.innerHTML = `Play 2048: ${total}`;
	}
})





