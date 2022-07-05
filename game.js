let container = document.getElementById("container");

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

function moveElems(grid) {	
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

	return grid 
}

function drawGrid(grid) {
	container.innerHTML = '';
	for (let i = 0; i < grid.length; i++) {
		container.innerHTML += `<div class='row'></div>`;
		for (let j = 0; j < grid[i].length; j++) {
			container.innerHTML += `<div class='cell'>${grid[i][j]}</div>`;
		}
	}
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

	if(codes.includes(e.keyCode)) {
		grid = randomNums(grid);
		drawGrid(grid);
	}
})





