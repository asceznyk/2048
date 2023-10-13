const container = document.getElementById("container");
const score = document.getElementById("score");
const codes = [39, 37, 40, 38];

let total = 0;

let grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

function reverseGrid(grid) { return grid.map((row) => row.reverse()) };

function rotateGrid(grid, right=1) {
  return grid[0].map((_, i) => {
    return right ? grid.map(row => row[i]).reverse() : grid.map(row => row[row.length-1-i]);
  });
}

function randomFill(grid) {
  let options = [];
  grid.forEach((row,i) => { row.forEach((_,j) => { if(!row[j]) options.push([i,j]) })});
  if(!options.length) return grid; 
  let [i,j] = options[Math.floor(Math.random()*options.length)]; 
  grid[i][j] = Math.random() > 0.5 ? 2 : 4;
  return grid;
}

function mergeMove(grid) {
  let midxs = [];
  for (let i = 0; i < grid.length; i++) {
    let pair = []
    for (let j = grid[i].length-1; j >= 0; j--) {
      if (!grid[i][j]) continue;
      pair.push(j);
      if (pair.length <= 1) continue;
      let [a, b] = pair;
      if (grid[i][a] != grid[i][b]) { pair.shift(); continue; }
      grid[i][a] = grid[i][a] + grid[i][b];
      grid[i][b] = 0;
      midxs.push([i, a]);
      pair = [];
    }

    let k = null;
    for (let j = grid[i].length-1; j >= 0; j--) {
      if (!grid[i][j] && k == null) k = j;
      else if (grid[i][j] && k != null) {
        grid[i][k] = grid[i][j];
        grid[i][j] = 0;
        j = grid[i].length-1;
        k = null;
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
    grid = mergeMove(grid);	
  } else if(e.keyCode == codes[1]) {
    grid = reverseGrid(grid);
    grid = mergeMove(grid);
    grid = reverseGrid(grid);
  } else if (e.keyCode == codes[2]) {
    grid = rotateGrid(grid, 0);
    grid = mergeMove(grid);
    grid = rotateGrid(grid);
  } else if (e.keyCode == codes[3]) {
    grid = rotateGrid(grid);
    grid = mergeMove(grid);
    grid = rotateGrid(grid, 0);
  }
  return grid;
}

grid = randomFill(randomFill(grid));
drawGrid(grid);

document.addEventListener('keydown', function(e) {
  if(codes.includes(e.keyCode)) {	
    grid = updateGrid(grid, e);
    grid = randomFill(grid);
    drawGrid(grid);
    score.innerHTML = `Play 2048: ${total}`;
  }
})


