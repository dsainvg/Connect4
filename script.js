let cellInfo = [];
let currentPlayer = 1;
let wins = [0,0];

for(let i = 0;i<7;i++){
    document.getElementById("board").innerHTML += "<div class='col' id='col"+i+"'></div>";
    cellInfo.push([]);
    for(j = 0;j<6;j++){
        cellInfo[i].push(0);
        document.getElementById("col"+i).innerHTML += "<button class='cell' id='cell"+i+j+"' onclick='nextMove(event)'></button>";
    }
}

function restart(){
    cellInfo.forEach((col,i) => {
        col.forEach((row,j) => {
            cellInfo[i][j] = 0;
            document.getElementById("cell"+i+j).classList.remove("player1Cell");
            document.getElementById("cell"+i+j).classList.remove("player2Cell");
            document.getElementById("cell"+i+j).classList.remove("blink");
            document.getElementById("cell"+i+j).textContent = "";
            document.getElementById("cell"+i+j).disabled = false;
        });
    });
    currentPlayer = 1;
    document.getElementById("playerTurn").textContent = `Player ${currentPlayer}'s turn`;
}

function stopGame(){
    for(let i = 0;i<7;i++){
        for(j = 0;j<6;j++){
            document.getElementById("cell"+i+j).disabled = true;
        }
    }
    wins[currentPlayer-1]++;
    document.getElementById("player1Score").textContent = `Player 1: ${wins[0]}`;
    document.getElementById("player2Score").textContent = `Player 2: ${wins[1]}`;
}

function checkResult(i,j){
    console.log("Checking");
    console.log(i,j);
    for(let vx = -1;vx<=1;vx++){
        for(let vy = -1;vy<=1;vy++){
            if(vx == 0 && vy == 0) continue;
            if(cellInfo[i][j] == cellInfo[i+vx][j+vy] && cellInfo[i][j] == cellInfo[i+2*vx][j+2*vy] && cellInfo[i][j] == cellInfo[i+3*vx][j+3*vy]){
                document.getElementById("playerTurn").textContent = `Player ${cellInfo[i][j]} wins!`;
                for(let k = 0;k<4;k++){
                    document.getElementById("cell"+(i+k*vx)+(j+k*vy)).classList.add("blink");
                    document.getElementById("cell"+(i+k*vx)+(j+k*vy)).textContent = "X";
                }
                stopGame();
                return;
            }
        }
    }
}

function nextMove(e){
    let colId = parseInt(e.target.id.split("")[4]);
    let rowId = -1;
    for(let i = 6;i>=0;i--){
        if(cellInfo[colId][i] == 0){
            rowId = i;
            break;
        }
    }
    if(colId != -1){
        cellInfo[colId][rowId] = currentPlayer;
        document.getElementById("cell"+colId+rowId).classList.add(`player${currentPlayer}Cell`);
        checkResult(colId,rowId);
        currentPlayer = currentPlayer == 1 ? 2 : 1;
        document.getElementById("playerTurn").textContent = `Player ${currentPlayer}'s turn`;
    } 
}