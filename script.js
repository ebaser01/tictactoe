const gameBoard = (()=>{
    let cell = document.createElement('div');
    cell.classList.add("cell");
    let status = [[0,0,0],[0,0,0],[0,0,0]];
    let board = document.getElementById('boardArea');
    

    const createBoard = ()=> {
        
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                cell.id = `${i},${j}`;
                board.appendChild(cell.cloneNode(true));
            }
    
        }

       
    }

    function resetBoard(){
        board.childNodes.forEach(a=>{a.innerHTML=''});
        board.childNodes.forEach(a=>{a.style.cursor='pointer'});
    }
    
    return{createBoard,resetBoard,status};
})();

//document.querySelectorAll('.cell').forEach(box=> box.addEventListener('click',function(){console.log('hello')}));
gameBoard.createBoard();

const gameHandler = (()=>{
    
    
    const cellEvent = (cell)=>{
        console.log(gameBoard.status);
        if(cell.innerHTML == ""){
        cell.innerHTML = `<span>X</span>`;
        cell.style.cursor = 'default';
        gameBoard.status[cell.id.split(",")[0]][cell.id.split(",")[1]] = 1;
        let x = minimax(gameBoard.status,'ai').bestMove;
        console.log(x);
        if(!gameFinished()){
        document.getElementById(`${x[0]},${x[1]}`).innerHTML = `<span>O</span>` ;
        document.getElementById(`${x[0]},${x[1]}`).style.cursor = 'default';
        gameBoard.status[x[0]][x[1]] = -1;
        }
        }
 
    }
    function gameFinished(){
        if(check(gameBoard.status,'human') || check(gameBoard.status,'ai') || (!gameBoard.status[0].includes(0) && !gameBoard.status[1].includes(0) && !gameBoard.status[2].includes(0))){
        return true;
        }
    }

    function check(board,player){
        let hsum=0;
        let winningSum = 3;
        if(player=='ai'){
            winningSum = -3;
        }
        let vsum=0;
        let diagonalSum=0;
        for(let i=0;i<3;i++){
            hsum = board[i].reduce(function(a, b){
            return a + b;
            }, 0);
            if(hsum==winningSum){
                return true;
                
            }
        }
        for(let i=0;i<3;i++){
            vsum = board[0][i] + board[1][i] + board[2][i];
            if(vsum==winningSum){
                return true;
            }
        }

        diagonalSum = board[0][0] + board[1][1] + board[2][2];
        if(diagonalSum!=winningSum){
            diagonalSum = board[0][2] + board[1][1] + board[2][0];
        }
        
        if(diagonalSum== winningSum){
            return true;
        }
        else{
            return false;
            
        }
        
    }
    function minimax(board, player){
    let bestMove = [];
    let score = 0;
        if(check(board,'human')){
            return {bestScore:-1};
        }
        else if(check(board,'ai')){
            return {bestScore:1};
        }
        else if(!board[0].includes(0) && !board[1].includes(0) && !board[2].includes(0) ){
            
            return {bestScore:0};
        }

        if(player=='ai'){
            let bestScore= -1000;
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(board[i][j]==0){
                    board[i][j] = -1;
                    score = minimax(board,'human').bestScore;
                    board[i][j] = 0;
                    if(score>=bestScore){
                        bestScore = score;
                        bestMove = [i,j];
                    }
                    
                    }
                }
            }
            return {bestScore,bestMove};
        }
        else{
            let bestScore= 1000;
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                 if(board[i][j]==0){
                    board[i][j] = 1;
                    score = minimax(board,'ai').bestScore;
                    board[i][j] = 0;
                    if(score<=bestScore){
                        bestScore = score;
                    }
                 }
                }
            }
            return {bestScore,bestMove};

        }
        
    }
    

    document.querySelectorAll('.cell').forEach(box=> box.addEventListener('click',function(){
        if(!gameFinished()){
            cellEvent(this);
            if(check(gameBoard.status,'human')){
                setTimeout(function(){ alert("YOU WON"); }, 500);
            }
            if(check(gameBoard.status,'ai')){
                setTimeout(function(){ alert("YOU LOST"); }, 500);
            }
            else if(gameFinished()){
                setTimeout(function(){ alert("TIE"); }, 500);
            }
        }
        
    }));

    document.getElementById('reset').addEventListener('click',function(){
        gameBoard.resetBoard();
        gameBoard.status = [[0,0,0],[0,0,0],[0,0,0]];
    });
    
})();




