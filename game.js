let container = document.getElementById("container");

function intersection(a, b) {
  b = new Set(b); 
  return [...new Set(a)].filter(e => b.has(e));
};

function getCopyOfMatrix(mat) {
  return mat.map(row => row.map(col => col))
}

function initGrid(grid) {
	function getRandom(){
		return Math.floor(Math.random() * grid.length);
	}

	let [i, j] = [getRandom(), getRandom()];
	grid[i][j] = 2;

	let x = getRandom();
	let y = getRandom(); 

	if(grid[x][y] !== 0) {
		grid[i][j] = 0;
		initGrid(grid);
	} else{
		grid[x][y] = 2;
	}

	return grid;
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

function reverseGrid(grid) {
	return grid.map((row) => row.reverse())
}

function moveElems(grid, dir) {	
	let [dr, dc] = dir;
	let copyGrid = getCopyOfMatrix(grid);

	//merge
	for (let i = 0; i < grid.length; i++) {
		let merges = []
		for (let j = grid[i].length-1; j >= 0; j--){
			if(grid[i][j] !== 0) {
				let c = j+1;
				while(grid[i][c] === 0) {
					c++;
					if (c >= grid[i].length) { 
						c--; 
						break;
					}
				}

				let a = grid[i][j];
				let b = grid[i][c];
				if (a === b) {
					merges.push([c, j])
				}
			}
		}

		console.log(merges);
		
		let [pa, pb] = [undefined, undefined]
		for(let m = 0; m < merges.length; m++) {
			let [a, b] = merges[m];

			if(pa == b || pb == a || pa == a || pb == b) {
				break
			}
			grid[i][a] = grid[i][a] + grid[i][b];
			grid[i][b] = 0;

			[pa, pb] = merges[m];
		}


		//push
		/*let [k, l] = [0, 0];
		for(let j = grid[i].length-1; j >= 0; j--) {
			if(copyGrid[i][j] !== 0) {
				for (let c = j+1; c < grid[i].length;  c++) {
					if(copyGrid[i][c] !== 0) {
						k = j;
						l = c;
						break;
					}
				}
			}
		}*/
		//console.log(k, l);
		//copyGrid[i][l] = copyGrid[i][k];
		//copyGrid[i][k] = 0;
	}

	return grid //copyGrid
}

//grid = initGrid(grid);

let grid = [
	[2,0,2,2],
	[0,2,2,4],
	[2,2,4,4],
	[4,2,2,0]
];

drawGrid(grid);

document.addEventListener('keydown', function(e) {
	if(e.keyCode == 39) {
		grid = moveElems(grid, [0, 1]);
		drawGrid(grid);
	} else if(e.keyCode == 37) {
		grid = reverseGrid(grid);
		grid = moveElems(grid, [0, 1]);
		grid = reverseGrid(grid);
		drawGrid(grid);
	} else if (e.keyCode == 40) {
	} else if (e.keyCode == 38) {
	}
})





